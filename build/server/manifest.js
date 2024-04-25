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
		client: {"start":"_app/immutable/entry/start.9tv6gF_W.js","app":"_app/immutable/entry/app.DEDH1v2p.js","imports":["_app/immutable/entry/start.9tv6gF_W.js","_app/immutable/chunks/entry.3DRfMHXq.js","_app/immutable/chunks/runtime.P-5wgiUK.js","_app/immutable/entry/app.DEDH1v2p.js","_app/immutable/chunks/runtime.P-5wgiUK.js","_app/immutable/chunks/render.CDAsCEyX.js","_app/immutable/chunks/disclose-version.CsPCGkEz.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-B8sqNH7P.js')),
			__memo(() => import('./chunks/1-BHrYe3Wf.js')),
			__memo(() => import('./chunks/2-DYuuYNA5.js'))
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
