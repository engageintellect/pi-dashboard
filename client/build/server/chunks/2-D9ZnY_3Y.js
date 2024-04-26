import { e as error } from './index-CvuFLVuQ.js';

const load = async () => {
  const res = await fetch("https://engage-dev.com/dashboard/api/os");
  const json = await res.json();
  if (!res.ok) {
    throw error(500, "Failed to fetch data from the API");
  }
  console.log("no error", json);
  return { json };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DrkeYsst.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/2.CNpEbyjJ.js","_app/immutable/chunks/disclose-version.UyTGFKWw.js","_app/immutable/chunks/runtime.BJQaHgZq.js","_app/immutable/chunks/index-client.Dtl_VwOE.js","_app/immutable/chunks/lifecycle.CeKY-eJL.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-D9ZnY_3Y.js.map
