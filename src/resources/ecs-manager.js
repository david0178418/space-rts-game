import ECSManager from 'ecs-manager';
import instanceManager from 'instance-manager';

instanceManager.registerResource('ecs-manager', {
	init() {
		// TODO Remove debug variable
		return window.entityManager = new ECSManager();
	},
});
