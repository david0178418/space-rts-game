import Hud from 'interface/hud';
import instanceManager from 'instance-manager';
import React from 'react';
import ReactDOM from 'react-dom';

instanceManager.registerResource('hud', {
	init: function() {
		window.x = ReactDOM.render(
			React.createElement(Hud, {}),
			document.getElementById('hud')
		);

		return window.x;
	},
});
