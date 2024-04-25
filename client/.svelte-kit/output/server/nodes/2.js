

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.C-2giGmy.js","_app/immutable/chunks/disclose-version.ZXWA7nan.js","_app/immutable/chunks/runtime.Do-LsryT.js","_app/immutable/chunks/lifecycle.CWDZGcqK.js"];
export const stylesheets = [];
export const fonts = [];
