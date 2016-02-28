import bind from 'lodash/bind';
import each from 'lodash/each';
import instanceManager from 'instance-manager';
import Phaser from 'phaser';

let SelectionSystem = {
	SELECTION_PADDING: 30,

	components: {
		with: [
			'selectable',
		],
	},

	game: null,
	selectionChanged: false,
	worldEntities: null,

	init() {
		SelectionSystem.game = instanceManager.get('game');
		SelectionSystem.worldEntities = instanceManager.get('world-entities');
		SelectionSystem.selectionChanged = false;

		SelectionSystem.checkSelectionSystem = bind(SelectionSystem.checkSelectionSystem, this);
	},

	// TODO Refactor this since it's using the old paradigm
	run(entities) {
		each(entities, SelectionSystem.checkSelectionSystem, this);

		if(SelectionSystem.selectionChanged) {
			SelectionSystem.selectionChanged = false;
		}
	},

	checkSelectionSystem(entity) {
		let selectableComponent = entity.selectable;
		let sprite = entity.sprite;
		let graphic;

		if(entity.selected) {
			if(!selectableComponent.graphic) {
				graphic = new Phaser.Sprite(SelectionSystem.game, 0, 0, 'selection');
				graphic.anchor.setTo(0.5, 0.5);
				// Set the height and width to the greater of the two plus padding
				graphic.width = graphic.height =
					(sprite.width > sprite.height ? sprite.width : sprite.height)
					+ SelectionSystem.SELECTION_PADDING;
				SelectionSystem.worldEntities.addChild(graphic);
				selectableComponent.graphic = graphic;
				SelectionSystem.selectionChanged = true;

				sprite.events.onDestroy.addOnce(graphic.kill, graphic);
				// sprite.events.onDestroy.addOnce(SelectionSystem.uiViewModel.update, SelectionSystem.uiViewModel);
			} else if(!selectableComponent.graphic.visible) {
				selectableComponent.graphic.visible = true;
				SelectionSystem.selectionChanged = true;
			}

			selectableComponent.graphic.position.x = sprite.position.x;
			selectableComponent.graphic.position.y = sprite.position.y;
		} else if(selectableComponent.graphic && selectableComponent.graphic.visible) {
			SelectionSystem.selectionChanged = true;
			selectableComponent.graphic.visible = false;
		}
	},
};

export default SelectionSystem;
