import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('immovable', {
		factory: function() {
			this.components.physics.immovable = true;

			return true;
		},
		onRemove() {
			this.components.physics.immovable = false;
		},
	});
