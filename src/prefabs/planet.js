import _ from 'lodash';
import instanceManager from 'instance-manager';

import 'components/sprite';
import 'components/physics';
import 'components/immovable';
import 'components/team';

export default
function(position) {
	let planet = instanceManager.get('ecs-manager')
		.createEntity()
		.addComponent('sprite', _.extend({graphic: 'planet'}, position))
		.addComponent('physics')
		.addComponent('immovable')
		.addComponent('selectable')
		.addComponent('colonizable')
		.addComponent('environment', {
			type: '',
			habitability: 0,
		})
		.addComponent('population', {
			fertility: 0,
			longevity: 0,
			count: 0,
		});
	let sprite = planet.components.sprite;

	instanceManager.get('planets-quadtree').insert(sprite);

	return planet;
}
