import instanceManager from 'instance-manager';
instanceManager
	.get('ecs-manager')
	.registerComponent('ship-generator', {
		activeGenerator: null,
		options: null,
		shipTypes: null,
	});
