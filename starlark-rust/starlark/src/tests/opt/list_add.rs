/*
 * Copyright 2018 The Starlark in Rust Authors.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

use crate::tests::bc::golden::bc_golden_test;

#[test]
fn test_list_of_const_add_opt() {
    bc_golden_test(
        "opt_list_of_const_add",
        r#"
def test():
    return [1, 2] + [3, 4, 5]
"#,
    )
}

#[test]
fn test_list_of_expr_add() {
    bc_golden_test(
        "opt_list_of_expr_add",
        r#"
# TODO(nga): This is not optimized yet.
def test():
    return [noop(), noop()] + [noop(), noop(), noop()]
"#,
    );
}
