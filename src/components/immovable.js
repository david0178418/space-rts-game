import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('immovable', {
		factory() {
			this.physics.immovable = true;

			return true;
		},
		onRemove() {
			if (this.physics) {
				this.physics.immovable = false;
			}
		},
	});
