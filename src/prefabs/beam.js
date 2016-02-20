import _ from 'lodash';
import instanceManager from 'instance-manager';

import 'components/sprite';

export default
function(params) {
	let {position, target, damage} = params;
	let targetPosition = target.getComponent('sprite').position;

	let beam = instanceManager.get('ecs-manager')
		.createEntity()
		.addComponent('sprite', _.extend({graphic: 'beam'}, position))
		.addComponent('detonation-fuse', {
			damage,
			target,
		})
		.addComponent('waypoint', {
			x: targetPosition.x,
			y: targetPosition.y,
		})
		.addComponent('movable', {
			acceleration: 0,
			currentSpeed: 1500,
			topSpeed: 1500,
		});

	beam.getComponent('sprite').scale.x = .1;
	beam.getComponent('sprite').scale.y = .1;

	return beam;
}
