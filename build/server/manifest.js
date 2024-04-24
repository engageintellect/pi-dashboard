const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CExH7RBu.js","app":"_app/immutable/entry/app.BXNa9_aQ.js","imports":["_app/immutable/entry/start.CExH7RBu.js","_app/immutable/chunks/entry.69o0Rul2.js","_app/immutable/chunks/runtime.Do-LsryT.js","_app/immutable/entry/app.BXNa9_aQ.js","_app/immutable/chunks/runtime.Do-LsryT.js","_app/immutable/chunks/render.DcPKtgOS.js","_app/immutable/chunks/disclose-version.ZXWA7nan.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-K53WmIBs.js')),
			__memo(() => import('./chunks/1-CjfCRwuM.js')),
			__memo(() => import('./chunks/2-Dnt7HlH6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
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
