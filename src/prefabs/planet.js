import _ from 'lodash';
import instanceManager from 'instance-manager';

import 'components/sprite';
import 'components/team';

export default
function(position) {
	return instanceManager.get('ecs-manager')
		.createEntity()
		.addComponent('sprite', _.extend({graphic: 'planet'}, position))
		.addComponent('selectable')
		.addComponent('environment', {
			type: '',
			habitability: 0,
		})
		.addComponent('population', {
			fertility: 0,
			longevity: 0,
			count: 0,
		});
}
