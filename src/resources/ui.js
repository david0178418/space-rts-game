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

		return {
			setProductionOptions(productionOptions) {
				reactComponent.setState({
					productionOptions,
				});
			},
		};
	},
});
