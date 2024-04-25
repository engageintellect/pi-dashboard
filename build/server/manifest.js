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
		client: {"start":"_app/immutable/entry/start.DTeh50Qy.js","app":"_app/immutable/entry/app.DQe7M-aT.js","imports":["_app/immutable/entry/start.DTeh50Qy.js","_app/immutable/chunks/entry.ZTbG9Lxr.js","_app/immutable/chunks/runtime.Do-LsryT.js","_app/immutable/entry/app.DQe7M-aT.js","_app/immutable/chunks/runtime.Do-LsryT.js","_app/immutable/chunks/render.DcPKtgOS.js","_app/immutable/chunks/disclose-version.ZXWA7nan.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-C5uMe5Bl.js')),
			__memo(() => import('./chunks/1-Cj4pNIOU.js')),
			__memo(() => import('./chunks/2-vi5nqLMd.js'))
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
