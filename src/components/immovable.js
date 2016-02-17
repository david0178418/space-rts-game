import instanceManager from 'instance-manager';

instanceManager
	.get('ecs-manager')
	.registerComponent('immovable', {
		factory: function() {
			this.getComponent('physics').immovable = true;

			return true;
		},
		onRemove() {
			if (this.hasComponent('physics')) {
				this.getComponent('physics').immovable = false;
			}
		},
	});
