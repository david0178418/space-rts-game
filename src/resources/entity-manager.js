import ECSManager from 'ecs-manager';
import InstanceManager from 'instance-manager';

InstanceManager.registerResource('ecs-manager', {
	init() {
		// TODO Remove debug variable
		return window.entityManager = new ECSManager();
	},
});
