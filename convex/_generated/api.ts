/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Stub file — replaced by `npx convex dev` at runtime.
 * Provides a loose `api` type so the rest of the project compiles.
 */

type AnyFunction = any;

interface Api {
  profiles: {
    getMyProfile: AnyFunction;
    getBySlug: AnyFunction;
    createProfile: AnyFunction;
    updateBlocks: AnyFunction;
    updateTheme: AnyFunction;
    updateCustomizations: AnyFunction;
    updateSlug: AnyFunction;
    updateSeo: AnyFunction;
    publish: AnyFunction;
    incrementViewCount: AnyFunction;
    uploadAvatar: AnyFunction;
    getAvatarUrl: AnyFunction;
  };
  slugs: {
    checkAvailability: AnyFunction;
  };
  files: {
    generateUploadUrl: AnyFunction;
  };
}

export const api: Api = {} as Api;
