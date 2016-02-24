import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('entity-spawner', {
		factory(params = {}) {
			return {
				availableBlueprints: params.availableBlueprints || {},
			};
		},
	});
