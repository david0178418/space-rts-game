/* eslint no-unused-vars: 0 */
import instanceManager from 'instance-manager';
import React, { Component } from 'react';
import ProdctionOptions from './production-options';

const styles = {
	left: '50px',
	position: 'absolute',
	top: '50px',
	zIndex: 10,
};

export default
class UI extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productionOptions: null,
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
			</div>
		);
	}
}
