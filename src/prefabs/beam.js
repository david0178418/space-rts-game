import {extend} from 'lodash';
import instanceManager from 'instance-manager';

export default
function({angle, damage, position, target}) {
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
			angle,
			damage,
			target,
		},
		waypoint: {
			x: targetPosition.x - Math.cos(angle) * (target.sprite.width / 2),
			y: targetPosition.y - Math.sin(angle) * (target.sprite.width / 2),
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
