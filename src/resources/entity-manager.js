import EntityManager from 'entity-manager';
import InstanceManager from 'instance-manager';

InstanceManager.registerResource('entity-manager', {
	init() {
		// TODO Remove debug variable
		return window.entityManager = new EntityManager();
	},
});
