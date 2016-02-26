/* eslint no-unused-vars: 0 */
import _ from 'lodash';
import forOwn from 'lodash/forOwn';
import instanceManager from 'instance-manager';
import React, { Component } from 'react';

const ecsManager = instanceManager.get('ecs-manager');

const styles = {
	left: 0,
	position: 'absolute',
	top: '50px',
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

function dequeueBuildItem(index) {
	// TODO Create a system or something to process an order like this
	// rather than directly updating selected entities. Things like resources
	// will have to be reclaimed
	let entities = ecsManager.getEntities(['selected', 'entity-spawn-queue']);

	// NOTE For now, assuming there will only be 1 entity with a queue selected.
	// Likely will need to figure out how to handle multiple being selected.
	entities[0]['entity-spawn-queue'].queue.splice(index, 1);
}

export default
function(props) {
	let buildQueueButtons = [];

	_.each(props.buildQueue, (queuedItem, index) => {
		buildQueueButtons.push(
			<button
				key={queuedItem.label + index}
				className="icon-button"
				style={buttonStyles}
				onClick={_.bind(dequeueBuildItem, null, index)}
			>
				{queuedItem.label}
			</button>
		);
	});

	return (
		<div style={styles}>
			<label style={labelStyles}>Build Queue:</label> {buildQueueButtons}
		</div>
	);
}
