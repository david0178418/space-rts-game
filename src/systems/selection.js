import each from 'lodash/each';
import instanceManager from 'instance-manager';
import Phaser from 'phaser';

instanceManager.get('ecs-manager').registerSystem('selection', {
	SELECTION_PADDING: 30,

	components: [
		'selectable',
	],

	init: function() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');
		// this.uiViewModel = instanceManager.get('uiViewModel');
		this.selectionChanged = false;
	},

	run: function(entities) {
		each(entities, this.checkSelection, this);

		if(this.selectionChanged) {
			// this.uiViewModel.update();
			this.selectionChanged = false;
		}
	},

	checkSelection: function(entity) {
		let selectableComponent = entity.getComponent('selectable');
		let graphic;

		if(entity.hasComponent('selected')) {
			if(!selectableComponent.graphic) {
				graphic = new Phaser.Sprite(this.game, 0, 0, 'selection');
				graphic.anchor.setTo(0.5, 0.5);
				// Set the height and width to the greater of the two plus padding
				graphic.width = graphic.height =
					(entity.width > entity.height ? entity.width : entity.height)
					+ this.SELECTION_PADDING;
				this.worldEntities.addChild(graphic);
				selectableComponent.graphic = graphic;
				this.selectionChanged = true;

				entity.events.onDestroy.addOnce(graphic.kill, graphic);
				// entity.events.onDestroy.addOnce(this.uiViewModel.update, this.uiViewModel);
			} else if(!selectableComponent.graphic.visible) {
				selectableComponent.graphic.visible = true;
				this.selectionChanged = true;
			}

			selectableComponent.graphic.position.x = entity.position.x;
			selectableComponent.graphic.position.y = entity.position.y;
		} else if(selectableComponent.graphic && selectableComponent.graphic.visible) {
			this.selectionChanged = true;
			selectableComponent.graphic.visible = false;
		}
	},
});
