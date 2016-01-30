import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('entity-spawn-queue', {
		factory: function(params = {}) {
			return {
				queue: params.queue || [],
			};
		},
	});
