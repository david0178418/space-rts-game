import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('waypoint-queue', {
		factory: function(params) {
			return {
				queue: [],
			};
		},
	});
