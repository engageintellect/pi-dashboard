const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico"]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.tAbAMwv2.js","app":"_app/immutable/entry/app.BiLrs__9.js","imports":["_app/immutable/entry/start.tAbAMwv2.js","_app/immutable/chunks/entry.BsdivZpL.js","_app/immutable/chunks/runtime.BJQaHgZq.js","_app/immutable/entry/app.BiLrs__9.js","_app/immutable/chunks/runtime.BJQaHgZq.js","_app/immutable/chunks/disclose-version.UyTGFKWw.js","_app/immutable/chunks/index-client.Dtl_VwOE.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-DgO6Pg6Y.js')),
			__memo(() => import('./chunks/1-D3hxZ5CR.js')),
			__memo(() => import('./chunks/2-D9ZnY_3Y.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api",
				pattern: /^\/api\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CdeUHvWY.js'))
			},
			{
				id: "/api/engage/hello",
				pattern: /^\/api\/engage\/hello\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DolUX5Ck.js'))
			},
			{
				id: "/api/pb",
				pattern: /^\/api\/pb\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DBR4VNCx.js'))
			},
			{
				id: "/api/pi/cpu/usage",
				pattern: /^\/api\/pi\/cpu\/usage\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BbIXbj2U.js'))
			},
			{
				id: "/api/pi/disk/usage",
				pattern: /^\/api\/pi\/disk\/usage\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-w_vdG7hv.js'))
			},
			{
				id: "/api/pi/hostname",
				pattern: /^\/api\/pi\/hostname\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DYkfkesJ.js'))
			},
			{
				id: "/api/pi/load",
				pattern: /^\/api\/pi\/load\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-C21mF2gu.js'))
			},
			{
				id: "/api/pi/memory/available",
				pattern: /^\/api\/pi\/memory\/available\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-C-NskRWX.js'))
			},
			{
				id: "/api/pi/memory/used",
				pattern: /^\/api\/pi\/memory\/used\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DbEtMLrZ.js'))
			},
			{
				id: "/api/pi/network/latency",
				pattern: /^\/api\/pi\/network\/latency\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-3A7jqEBE.js'))
			},
			{
				id: "/api/pi/network/ports",
				pattern: /^\/api\/pi\/network\/ports\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BfGb55IS.js'))
			},
			{
				id: "/api/pi/network/usage",
				pattern: /^\/api\/pi\/network\/usage\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-stm0Qhtt.js'))
			},
			{
				id: "/api/pi/os",
				pattern: /^\/api\/pi\/os\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CcGA0nhL.js'))
			},
			{
				id: "/api/pi/package-count",
				pattern: /^\/api\/pi\/package-count\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BWKtZNCR.js'))
			},
			{
				id: "/api/pi/processes",
				pattern: /^\/api\/pi\/processes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BseOZqp8.js'))
			},
			{
				id: "/api/pi/services/running",
				pattern: /^\/api\/pi\/services\/running\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-B7KhmBNu.js'))
			},
			{
				id: "/api/pi/uptime",
				pattern: /^\/api\/pi\/uptime\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CUOscFRE.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
