/* eslint no-unused-vars: 0 */
import map from 'lodash/map';
import React, { Component } from 'react';

const baseStyles = {
	left: '50px',
	position: 'fixed',
	top: '50px',
	zIndex: 10,
};

const buttonStyles = {
	backgroundColor: 'transparent',
	border: '2px solid #1ed81e',
	color: '#1ed81e',
	cursor: 'pointer'
};

export default
class Hud extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let classes = `${this.props.showMenu ? 'active' : ''} production-options`;

		return (
			<div className={classes} style={baseStyles}>
				{this.props.showMenu || true && (
					<div className="options" >
						{map(this.props.options || [{label: 'aaa', handler: () => {}}], (option) => {
							return (
								<button
									key={option.label}
									className="icon-button"
									style={buttonStyles}
									onClick={this.props.handler}
								>
									{option.label}
								</button>
							);
						})}
					</div>
				)}
			</div>
		);
	}
}
