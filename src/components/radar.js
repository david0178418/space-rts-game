import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('radar', {
		range: 0,
	});
