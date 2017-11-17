import React from "react";
import { render } from "react-dom";

import App from "./src/App";

// needed for material-ui examples
// require("react-tap-event-plugin")();

require("./styles/styles.scss");

render(<App />, document.getElementById("react-mount"));

/*
// This is required for hot reloading
if (module.hot) {
	module.hot.accept('./src/App.js', () => {
		console.log("Re-rendering");

		// const NewApp = require('./src/App').default;

		render(
			<App/>,
			document.getElementById('react-mount')
		);
	});
}*/
