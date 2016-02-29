import {extend} from 'lodash';
import instanceManager from 'instance-manager';

export default
function(position) {
	let ecsManager = instanceManager.get('ecs-manager');
	let planet = ecsManager.createEntity();

	ecsManager.addComponents(planet.id, {
		sprite: extend({graphic: 'planet'}, position),
		physics: {},
		immovable: {},
		selectable: {},
		colonizable: {},
		environment: {
			type: '',
			habitability: 0,
		},
		population: {
			fertility: 0,
			longevity: 0,
			count: 0,
		},
	});

	instanceManager.get('planets-quadtree').insert(planet.sprite);

	return planet;
}
