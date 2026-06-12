#!/usr/bin/env node

/**
 * Copyright (c) 2026-present, Soracompagnie and/or its affiliates. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Rafi Abiyyu Airlangga <rafiabiyyu.dev@gmail.com>
 *
 * @packageDocumentation
 * @module @airaga/cli
 * @description This package provides CLI capabilities for managing media processing workflows.
 */

export * from "@airaga/cli/core/build.js";
export * from "@airaga/cli/core/clean.js";
export * from "@airaga/cli/core/cli.js";
export * from "@airaga/cli/core/dev.js";
export * from "@airaga/cli/core/new.js";
export type * from "@airaga/cli/types/prompts.js";

import { Cli } from "@airaga/cli/core/cli.js";

new Cli().init();
