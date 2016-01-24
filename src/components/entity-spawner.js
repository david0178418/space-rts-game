import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('entity-spawner', {
		factory: function(params = {}) {
			return {
				availableBlueprints: params.availableBlueprints || {},
			};
		},
	});
