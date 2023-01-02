import path from "path"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias : {
			"src" : path.resolve ("./src")
		}
	}
};

export default config;
