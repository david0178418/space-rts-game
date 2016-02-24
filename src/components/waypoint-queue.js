import {defaults} from 'lodash';
import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('waypoint-queue', {
		factory(params) {
			return defaults(params, {
				queue: [],
			});
		},
	});
