import instanceManager from 'instance-manager';
import {Physics} from 'phaser';

let ecsManager = instanceManager.get('ecs-manager');

ecsManager
	.registerComponent('colonizable')
	.registerComponent('colonizer')
	.registerComponent('selectable')
	.registerComponent('selected')
	.registerComponent('shield', require('./shield').default)
	.registerComponent('sprite', require('./sprite').default)
	.registerComponent('animation', {
		factory: function(state = {}) {
			this.sprite.animations.add(state.name, state.frames || null);

			return state;
		},
	})
	.registerComponent('breaks', {
		state: {
			remainingCooldown: 0,
			cooldown: 0,
			power: 0,
			sound: null,
		},
	})
	.registerComponent('colonize', {
		state: {
			sprite: null,
			target: null,
		},
	})
	.registerComponent('detonation-fuse', {
		state: {
			damage: 0,
			target: null,
		},
	})
	.registerComponent('dockable', {
		state: {
			size: 0,
		},
	})
	.registerComponent('entity-spawn-queue', {
		factory(params = {}) {
			return {
				queue: params.queue || [],
			};
		},
	})
	.registerComponent('entity-spawner', {
		factory(params = {}) {
			return {
				availableBlueprints: params.availableBlueprints || {},
			};
		},
	})
	.registerComponent('environment', {
		state: {
			habitability: 0,
			type: '',
		},
	})
	.registerComponent('group-movement', {
		state: {
			centralPoint: {
				x: 0,
				y: 0,
			},
			queue: false,
		},
	})
	.registerComponent('gun', {
		state: {
			remainingCooldown: 0,
			cooldown: 0,
			power: 0,
			sound: null,
		},
	})
	.registerComponent('health', {
		state: {
			current: 0,
			max: 0,
		},
	})
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
	})
	.registerComponent('movable', {
		state: {
			acceleration: 150,
			currentSpeed: 0,
			topSpeed: 100,
		},
	})
	.registerComponent('order', {
		state: {
			x: 0,
			y: 0,
		},
	})
	.registerComponent('physics', {
		factory(params = {}) {
			let sprite = this.sprite;

			instanceManager.get('game').physics.enable(sprite, Physics.ARCADE);

			// NOTE Is the body reference safe or does it get reassigned later?
			return sprite.body;
		},
	})
	.registerComponent('population', {
		state: {
			count: 0,
			fertility: 0,
			longevity: 0,
		},
	})
	.registerComponent('radar', {
		range: 0,
	})
	.registerComponent('team', {
		state: {
			name: 'neutral',
		},
	})
	.registerComponent('waypoint-queue', {
		factory(params = {queue: []}) {
			params.queue = params.queue  || [];

			return params;
		},
	})
	.registerComponent('waypoint', {
		state: {
			x: 0,
			y: 0,
		},
	});
