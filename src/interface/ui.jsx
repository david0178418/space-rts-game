/* eslint no-unused-vars: 0 */
import instanceManager from 'instance-manager';
import React, { Component } from 'react';

import BuildQueue from './build-queue';
import ProdctionOptions from './production-options';

const styles = {
	height: 0,
	left: 0,
	margin: '20px',
	position: 'absolute',
	top: 0,
	width: '100%',
	zIndex: 10,
};

export default
class UI extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productionOptions: null,
			buildQueue: null,
		};
	}

	render() {
		return (
			<div style={styles}>
				{this.state.productionOptions && (
					<ProdctionOptions
						productionOptions={this.state.productionOptions}
					/>
				)}
				{this.state.buildQueue && (
					<BuildQueue
						buildQueue={this.state.buildQueue}
					/>
				)}
			</div>
		);
	}
}
