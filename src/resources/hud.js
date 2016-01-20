import Hud from 'interface/hud';
import instanceManager from 'instance-manager';
import React from 'react';
import ReactDOM from 'react-dom';

instanceManager.registerResource('hud', {
	init: function() {
		return ReactDOM.render(
			React.createElement(Hud, {}),
			document.getElementById('hud')
		);
	},
});
