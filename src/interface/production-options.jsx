/* eslint no-unused-vars: 0 */
import _ from 'lodash';
import forOwn from 'lodash/forOwn';
import instanceManager from 'instance-manager';
import React, { Component } from 'react';

const ecsManager = instanceManager.get('ecs-manager');

const styles = {
	left: 0,
	position: 'absolute',
	top: '20px',
};
const buttonStyles = {
	backgroundColor: 'transparent',
	border: '2px solid #1ed81e',
	color: '#1ed81e',
	cursor: 'pointer',
	marginRight: '10px',
};
const labelStyles = {
	color: 'white',
	fontWeight: 'bold',
};

function handleSelectBlueprint(key, label) {
	// TODO Create a system or something to process an order like this
	// rather than directly updating selected entities
	let entities = ecsManager.getEntities(['selected', 'entity-spawn-queue']);

	_.each(entities, function(entity) {
		entity['entity-spawn-queue'].queue.push({
			label: label,
			blueprint: key,
			elapsedBuildTime: 0,
		});
	});
}

export default
function(props) {
	let result = [];

	forOwn(props.productionOptions, (blueprint, key) => {
		result.push(
			<button
				key={key}
				className="icon-button"
				style={buttonStyles}
				onClick={_.bind(handleSelectBlueprint, null, key, blueprint.label)}
			>
				{blueprint.label}
			</button>
		);
	});

	return (
		<div style={styles}>
			<label style={labelStyles}>Blueprints:</label> {result}
		</div>
	);
}
