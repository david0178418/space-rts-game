import instanceManager from 'instance-manager';
instanceManager
	.get('ecs-manager')
	.registerComponent('team', {
		state: {
			name: 'neutral',
		},
	});
