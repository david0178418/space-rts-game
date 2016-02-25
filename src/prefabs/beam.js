import {extend} from 'lodash';
import instanceManager from 'instance-manager';

import 'components/sprite';

export default
function({position, target, damage}) {
	let beam;
	let ecsManager = instanceManager.get('ecs-manager');
	let targetPosition = target.sprite.position;

	beam = ecsManager.createEntity();

	ecsManager.addComponents(beam.id, {
		sprite: extend({graphic: 'beam'}, position),
		'detonation-fuse': {
			damage,
			target,
		},
		waypoint: {
			x: targetPosition.x,
			y: targetPosition.y,
		},
		movable: {
			acceleration: 0,
			currentSpeed: 1500,
			topSpeed: 1500,
		},
	});

	beam.sprite.scale.x = .1;
	beam.sprite.scale.y = .1;

	return beam;
}
