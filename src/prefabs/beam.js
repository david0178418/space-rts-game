import {extend} from 'lodash';
import instanceManager from 'instance-manager';

export default
function({position, target, damage}) {
	let beam;
	let ecsManager = instanceManager.get('ecs-manager');
	let targetPosition = target.sprite.position;

	beam = ecsManager.createEntity();

	ecsManager.addComponents(beam.id, {
		sprite: extend({graphic: 'beam'}, position),
		'animation': {
			name: 'fire',
			frames: [1],
		},
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

	beam.sprite.animations.play('fire', [1], true);

	return beam;
}
