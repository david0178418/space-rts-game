import UI from 'interface/ui';
import instanceManager from 'instance-manager';
import React from 'react';
import ReactDOM from 'react-dom';

instanceManager.registerResource('ui', {
	init() {
		let reactComponent = ReactDOM.render(
			React.createElement(UI, {}),
			document.getElementById('ui')
		);

		let productionOptions = null;
		let buildQueue = null;

		return {
			setProductionOptions(newState) {
				// if(productionOptions !== newState) {
					productionOptions = newState;
					reactComponent.setState({
						productionOptions: newState,
					});
				// }
			},

			setBuildQueue(newState) {
				// if(buildQueue !== newState) {
					buildQueue = newState;
					reactComponent.setState({
						buildQueue: newState,
					});
				// }
			},
		};
	},
});
