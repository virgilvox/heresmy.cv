/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Stub file — replaced by `npx convex dev` at runtime.
 * Provides type signatures so the rest of the project compiles.
 */

import {
  GenericQueryCtx,
  GenericMutationCtx,
  GenericActionCtx,
  GenericDataModel,
  FunctionReference,
} from "convex/server";

type Ctx = GenericQueryCtx<GenericDataModel>;
type MCtx = GenericMutationCtx<GenericDataModel>;
type ACtx = GenericActionCtx<GenericDataModel>;

export declare function query<Args extends Record<string, any>, Output>(def: {
  args: any;
  handler: (ctx: Ctx, args: Args) => Promise<Output> | Output;
}): FunctionReference<"query", "public", Args, Output>;

export declare function mutation<Args extends Record<string, any>, Output>(def: {
  args: any;
  handler: (ctx: MCtx, args: Args) => Promise<Output> | Output;
}): FunctionReference<"mutation", "public", Args, Output>;

export declare function action<Args extends Record<string, any>, Output>(def: {
  args: any;
  handler: (ctx: ACtx, args: Args) => Promise<Output> | Output;
}): FunctionReference<"action", "public", Args, Output>;
