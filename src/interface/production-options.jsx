/* eslint no-unused-vars: 0 */
import _ from 'lodash';
import forOwn from 'lodash/forOwn';
import instanceManager from 'instance-manager';
import React, { Component } from 'react';

const ecsManager = instanceManager.get('ecs-manager');

const styles = {
	backgroundColor: 'transparent',
	border: '2px solid #1ed81e',
	color: '#1ed81e',
	cursor: 'pointer',
	marginRight: '10px',
};

function handleSelectBlueprint(key) {
	// TODO Create a system or something to process an order like this
	// rather than directly updating selected entities
	let entities = ecsManager.getEntities(['selected', 'entity-spawn-queue']);

	_.each(entities, function(entity) {
		entity.getComponent('entity-spawn-queue').queue.push({
			blueprint: key,
			elapsedBuildTime: 0,
		});
	});
}

export default
function(props) {
	console.log('DEBUG: rerendering ui!');
	let result = [];

	forOwn(props.productionOptions, (blueprint, key) => {
		result.push(
			<button
				key={key}
				className="icon-button"
				style={styles}
				onClick={_.bind(handleSelectBlueprint, null, key)}
			>
				{blueprint.label}
			</button>
		);
	});

	return (
		<span>{result}</span>
	);
}
