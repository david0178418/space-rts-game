import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('immovable', {
		factory: function() {
			this.components.physics.immovable = true;

			return true;
		},
		onRemove() {
			if (this.components.physics) {
				this.components.physics.immovable = false;
			}
		},
	});
