/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under both the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree and the Apache
 * License, Version 2.0 found in the LICENSE-APACHE file in the root directory
 * of this source tree.
 */

use allocative::Allocative;
use dupe::Dupe;
use relative_path::RelativePath;

use crate::cells::name::CellName;
use crate::cells::paths::CellRelativePath;
use crate::cells::paths::CellRelativePathBuf;
use crate::fs::paths::forward_rel_path::ForwardRelativePath;

#[derive(thiserror::Error, Debug)]
#[error("attempted to strip prefix of two CellPath with different cell names `{0}` and `{1}`")]
struct StripPrefixError(CellName, CellName);

/// Represents a resolvable path corresponding to some path that is relative to the cell
/// corresponding to the 'CellName'.
#[derive(
    Clone,
    Debug,
    derive_more::Display,
    Hash,
    Eq,
    PartialEq,
    Ord,
    PartialOrd,
    Allocative
)]
#[display(fmt = "{}", "self.as_ref()")]
pub struct CellPath {
    cell: CellName,
    path: CellRelativePathBuf,
}

impl CellPath {
    #[inline]
    pub fn new(cell: CellName, path: CellRelativePathBuf) -> Self {
        CellPath { cell, path }
    }

    #[inline]
    pub fn cell(&self) -> CellName {
        self.cell
    }

    #[inline]
    pub fn path(&self) -> &CellRelativePath {
        &self.path
    }

    /// Creates an owned 'CellRelativePathBuf' with path adjoined to self.
    ///
    /// ```
    /// use buck2_core::cells::cell_path::CellPath;
    /// use buck2_core::cells::paths::{CellRelativePathBuf};
    /// use buck2_core::cells::name::CellName;
    /// use buck2_core::fs::paths::forward_rel_path::ForwardRelativePath;
    ///
    /// let path = CellPath::new(
    ///     CellName::unchecked_new("cell"),
    ///     CellRelativePathBuf::unchecked_new("foo/bar".into())
    /// );
    /// let other = ForwardRelativePath::new("baz")?;
    /// assert_eq!(
    ///     CellPath::new(CellName::unchecked_new("cell"),
    ///     CellRelativePathBuf::unchecked_new("foo/bar/baz".into())), path.join(other)
    /// );
    ///
    /// # anyhow::Ok(())
    /// ```
    #[inline]
    pub fn join<P: AsRef<ForwardRelativePath>>(&self, path: P) -> CellPath {
        self.as_ref().join(path.as_ref())
    }

    /// Returns a relative path of the parent directory
    ///
    /// ```
    /// use buck2_core::cells::cell_path::CellPath;
    /// use buck2_core::cells::paths::{CellRelativePathBuf};
    /// use buck2_core::cells::name::CellName;
    ///
    /// assert_eq!(
    ///     Some(
    ///         CellPath::new(CellName::unchecked_new("cell"),
    ///         CellRelativePathBuf::unchecked_new("foo".into()))
    ///     ),
    ///     CellPath::new(
    ///         CellName::unchecked_new("cell"),
    ///         CellRelativePathBuf::unchecked_new("foo/bar".into())
    ///     ).parent().map(|p| p.to_owned()),
    /// );
    ///
    /// # anyhow::Ok(())
    /// ```
    #[inline]
    pub fn parent(&self) -> Option<CellPathRef> {
        self.as_ref().parent()
    }

    /// Produces an iterator over CellPath and its ancestors.
    ///
    /// The iterator will yield all the CellPaths that is returned if
    /// the parent method is used zero or more times in order.
    ///
    /// ```
    /// use buck2_core::cells::cell_path::CellPath;
    /// use buck2_core::cells::paths::{CellRelativePathBuf};
    /// use buck2_core::cells::name::CellName;
    ///
    /// let path = CellPath::testing_new("cell", "foo/bar");
    /// let mut ancestors = path.ancestors();
    ///
    /// assert_eq!(ancestors.next(), Some(CellPath::testing_new("cell", "foo/bar").as_ref()));
    /// assert_eq!(ancestors.next(), Some(CellPath::testing_new("cell", "foo").as_ref()));
    /// assert_eq!(ancestors.next(), Some(CellPath::testing_new("cell", "").as_ref()));
    /// assert_eq!(ancestors.next(), None);
    ///
    /// # anyhow::Ok(())
    /// ```
    #[inline]
    pub fn ancestors(&self) -> impl Iterator<Item = CellPathRef> {
        self.as_ref().ancestors()
    }

    /// Returns a 'ForwardRelativePath' that, when joined onto `base`, yields
    /// `self`.
    ///
    /// Error if `base` is not a prefix of `self` or the returned
    /// path is not a 'ForwardRelativePath'
    ///
    /// ```
    /// use buck2_core::cells::cell_path::CellPath;
    /// use buck2_core::cells::paths::{CellRelativePathBuf};
    /// use buck2_core::cells::name::CellName;
    /// use buck2_core::fs::paths::forward_rel_path::ForwardRelativePathBuf;
    ///
    /// let path = CellPath::new(
    ///     CellName::unchecked_new("cell"),
    ///     CellRelativePathBuf::unchecked_new("test/haha/foo.txt".into())
    /// );
    ///
    /// assert_eq!(
    ///     path.strip_prefix(
    ///         CellPath::new(
    ///             CellName::unchecked_new("cell"),
    ///             CellRelativePathBuf::unchecked_new("test".into()),
    ///         ).as_ref()
    ///     )?,
    ///     ForwardRelativePathBuf::unchecked_new("haha/foo.txt".into())
    /// );
    /// assert_eq!(
    ///     path.strip_prefix(
    ///         CellPath::new(
    ///             CellName::unchecked_new("cell"),
    ///             CellRelativePathBuf::unchecked_new("asdf".into()),
    ///         ).as_ref()
    ///     ).is_err(),
    ///     true
    /// );
    /// assert_eq!(
    ///     path.strip_prefix(
    ///         CellPath::new(
    ///             CellName::unchecked_new("another"),
    ///             CellRelativePathBuf::unchecked_new("test".into()),
    ///         ).as_ref()
    ///     ).is_err(),
    ///     true
    /// );
    ///
    /// # anyhow::Ok(())
    /// ```
    #[inline]
    pub fn strip_prefix<'a>(
        &'a self,
        base: CellPathRef,
    ) -> anyhow::Result<&'a ForwardRelativePath> {
        self.as_ref().strip_prefix(base)
    }

    /// Build an owned `CellPath`, joined with the given path and
    /// normalized.
    ///
    /// ```
    ///
    /// use buck2_core::cells::paths::CellRelativePathBuf;
    /// use buck2_core::cells::name::CellName;
    /// use std::convert::TryFrom;
    /// use buck2_core::cells::cell_path::CellPath;
    ///
    /// assert_eq!(
    ///     CellPath::new(
    ///         CellName::unchecked_new("cell"),
    ///         CellRelativePathBuf::unchecked_new("foo/bar".into())
    ///     ).join_normalized("../baz.txt")?,
    ///     CellPath::new(
    ///         CellName::unchecked_new("cell"),
    ///         CellRelativePathBuf::unchecked_new("foo/baz.txt".into())
    ///     ),
    /// );
    ///
    /// assert_eq!(
    ///     CellPath::new(
    ///         CellName::unchecked_new("cell"),
    ///         CellRelativePathBuf::unchecked_new("foo".into())
    ///     ).join_normalized("../../baz.txt").is_err(),
    ///     true
    /// );
    ///
    /// # anyhow::Ok(())
    /// ```
    pub fn join_normalized<P: AsRef<RelativePath>>(&self, path: P) -> anyhow::Result<CellPath> {
        Ok(CellPath::new(self.cell, self.path.join_normalized(path)?))
    }

    /// Checks that cell matches and `self` path starts with `base` path
    ///
    /// ```
    ///
    /// use buck2_core::cells::paths::CellRelativePathBuf;
    /// use buck2_core::cells::cell_path::CellPath;
    /// use buck2_core::cells::name::CellName;
    /// use std::convert::TryFrom;
    ///
    /// assert!(
    ///     CellPath::new(
    ///         CellName::unchecked_new("cell"),
    ///         CellRelativePathBuf::unchecked_new("foo/bar".into())
    ///     ).starts_with(CellPath::new(
    ///         CellName::unchecked_new("cell"),
    ///         CellRelativePathBuf::unchecked_new("foo".into())
    ///     ).as_ref()),
    /// );
    ///
    /// # anyhow::Ok(())
    /// ```
    #[inline]
    pub fn starts_with(&self, base: CellPathRef) -> bool {
        self.as_ref().starts_with(base)
    }

    #[inline]
    pub fn into_parts(self) -> (CellName, CellRelativePathBuf) {
        (self.cell, self.path)
    }

    pub fn testing_new(cell_name: &str, relative_path: &str) -> CellPath {
        CellPath::new(
            CellName::unchecked_new(cell_name),
            CellRelativePathBuf::unchecked_new(relative_path.into()),
        )
    }

    #[inline]
    pub fn as_ref(&self) -> CellPathRef {
        CellPathRef {
            cell: self.cell,
            path: &self.path,
        }
    }
}

#[derive(Debug, Clone, Dupe, Copy, Eq, PartialEq, Hash, derive_more::Display)]
#[display(fmt = "{}//{}", cell, path)]
pub struct CellPathRef<'a> {
    cell: CellName,
    path: &'a CellRelativePath,
}

impl<'a> CellPathRef<'a> {
    #[inline]
    pub fn parent(&self) -> Option<CellPathRef<'a>> {
        Some(CellPathRef {
            cell: self.cell,
            path: self.path.parent()?,
        })
    }

    #[inline]
    pub fn to_owned(&self) -> CellPath {
        CellPath {
            cell: self.cell,
            path: self.path.to_owned(),
        }
    }

    #[inline]
    pub fn cell(&self) -> CellName {
        self.cell
    }

    #[inline]
    pub fn path(&self) -> &'a CellRelativePath {
        self.path
    }

    pub fn ancestors(&self) -> impl Iterator<Item = CellPathRef<'a>> + 'a {
        struct Ancestors<'a>(Option<CellPathRef<'a>>);
        impl<'a> Iterator for Ancestors<'a> {
            type Item = CellPathRef<'a>;

            fn next(&mut self) -> Option<Self::Item> {
                match &self.0 {
                    None => None,
                    Some(v) => {
                        let mut next = v.parent();
                        std::mem::swap(&mut next, &mut self.0);
                        next
                    }
                }
            }
        }

        Ancestors(Some(self.dupe()))
    }

    #[inline]
    pub fn join(&self, path: &ForwardRelativePath) -> CellPath {
        CellPath {
            cell: self.cell,
            path: self.path.join(path),
        }
    }

    #[inline]
    pub fn starts_with(&self, base: CellPathRef) -> bool {
        self.cell() == base.cell() && self.path().starts_with(base.path())
    }

    #[inline]
    pub fn strip_prefix(&self, base: CellPathRef) -> anyhow::Result<&'a ForwardRelativePath> {
        if self.cell != base.cell {
            return Err(StripPrefixError(self.cell, base.cell).into());
        }
        self.path.strip_prefix(&base.path)
    }
}
