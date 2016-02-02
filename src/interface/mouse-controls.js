import each from 'lodash/each';
import Phaser from 'phaser';
import instanceManager from 'instance-manager';

const game = instanceManager.get('game');
const ecsManager = instanceManager.get('ecs-manager');

export default {
	checkForDoubleClick: false,
	controls: null,
	endPoint: new Phaser.Point(),
	game: instanceManager.get('game'),
	graphic: null,
	mousePointer: null,
	registerRightClick: false,
	startSelection: false,
	worldEntities: null,

	init() {
		this.keyboard = instanceManager.get('keyboard-controls');
		this.mousePointer = game.input.mousePointer;
		this.worldEntities = instanceManager.get('world-entities');
		this.game = instanceManager.get('game');
		this.ecsManager = instanceManager.get('ecs-manager');

		this.graphic = this.game.add.graphics(-500, -500);
		this.graphic.alpha = 0.25;
		this.graphic.visible = false;
		this.graphic.smoothed = false;

		this.game.input.onUp.add(this.markClick.bind(this));
		this.game.input.onTap.add(this.differentiateClick.bind(this));
		this.game.input.onUp.add(this.dragEnd.bind(this));
		this.game.input.mouse.mouseMoveCallback = this.drag.bind(this);
	},

	update() {
		if(!this.checkForDoubleClick) {
			return;
		}

		if(this.mousePointer.msSinceLastClick > game.input.doubleTapRate) {
			this.checkForDoubleClick = false;
			this.leftSingleClick(this.mousePointer.positionUp);
		}
	},

	differentiateClick(pointer, isDoubleClick) {
		if(pointer.button === Phaser.Mouse.RIGHT_BUTTON) {
			this.rightClick(game.input.getLocalPosition(this.worldEntities, pointer));
			return;
		}

		if(false /* this.uiViewModel.awaitTarget() */) {
			// this.uiViewModel.awaitTarget(false);
			// this.uiViewModel.targetHandler(pointer);
			//
			// //HACK to mark click for general actions
			// this.markClick({
			// 	button: Phaser.Mouse.RIGHT_BUTTON,
			// });
			// this.uiViewModel.targetHandler = null;
		} else if(isDoubleClick) {
			this.checkForDoubleClick = false;
			this.leftDoubleClick(this.mousePointer.positionUp);
		} else {
			this.checkForDoubleClick = true;
		}
	},

	drag(ev) {
		let dragX;
		let dragY;
		let graphic;
		// let selectedEntites;

		if(game.input.mousePointer.isUp  || ev.button !== Phaser.Mouse.LEFT_BUTTON) {
			this.graphic.visible = false;
			return;
		}

		graphic = this.graphic;

		dragX = this.mousePointer.worldX;
		dragY = this.mousePointer.worldY;

		if(!this.startSelection) {
			this.startSelection = true;
			graphic.visible = true;
			graphic.position.set(dragX - 10, dragY - 10);

			// TODO: One pass at drawing upon selection start to
			// get correct bounds before the graphics have been rendered
			// DRY up at a later time.
			this.drawDragArea(dragX, dragY);
			return;
		}

		// TODO Remove debug
		let selectedEntites = window.selectedEntites = [];

		this.drawDragArea(dragX, dragY);

		each(ecsManager.getEntities(['selectable']), function(entity) {
			let isSelected = entity.getComponent('selected');
			let teamComponent = entity.getComponent('team');

			if(teamComponent && teamComponent.name === 'player') {
				let intersects = graphic.getBounds().intersects(
					entity.getComponent('sprite').getBounds()
				);

				if(!isSelected && intersects) {
					entity.addComponent('selected');
					selectedEntites.push(entity);
				} else if(isSelected && !intersects) {
					entity.removeComponent('selected');
				}
			}
		});

		graphic.visible = true;
	},

	dragEnd() {
		this.graphic.visible = false;
		this.startSelection = false;
	},

	drawDragArea(dragX, dragY) {
		let graphic = this.graphic;

		graphic.clear();
		graphic.lineStyle(3, 0xFFFF0B);
		graphic.beginFill(0xFFFF0B);
		graphic.drawRect(0, 0, dragX - graphic.position.x, dragY - graphic.position.y);
		graphic.endFill();
	},

	leftDoubleClick(position) {
		let entities = [];// this.ecs.getEntities('selectable');
		let selectedEntity = this.getTopEntityAt(entities, position);
		let selectedEntityTeam;
		let selectedEntityTeamComponent;

		if(!selectedEntity) {
			return;
		}

		selectedEntityTeamComponent = selectedEntity.getComponent('team');
		selectedEntityTeam = selectedEntityTeamComponent && selectedEntityTeamComponent.name;

		each(entities, function(entity) {
			let entityTeamComponent = entity.getComponent('team');
			let team = entityTeamComponent && entityTeamComponent.name;

			if(
				entity.entityType === selectedEntity.entityType &&
				selectedEntityTeam === team &&
				entity.inCamera
			) {
				entity.addComponent('selected');
			} else {
				entity.removeComponent('selected');
			}
		});
	},

	leftSingleClick(position) {
		let entities = this.ecsManager.getEntities(['selectable', 'team']);
		let selectedEntity = this.getTopEntityAt(entities, position);

		each(entities, function(entity) {
			entity.toggleComponent('selected', entity === selectedEntity);
		});
	},

	markClick(ev) {
		if(ev.button !== Phaser.Mouse.RIGHT_BUTTON) {
			return;
		}

		let marker = this.game.add.sprite(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY, 'waypoint-marker');
		let markerAnimationTime = 250;
		let markerTween;

		marker.anchor.setTo(0.5, 0.5);

		markerTween = this.game.add.tween(marker.scale).to({
			x: 4,
			y: 4,
		}, markerAnimationTime);

		markerTween.onComplete.add(function() {
			marker.destroy();
		});

		this.game.add.tween(marker).to({
			alpha: 0,
		}, markerAnimationTime).start();
		markerTween.start();
	},

	rightClick(position) {
		let entities = this.ecsManager.getEntities(['selected']);

		if(false /* this.uiViewModel.awaitTarget() */) {
			// this.uiViewModel.awaitTarget(false);

			each(entities, function(entity) {
				entity.removeComponent('selected');
			});
		} else {
			each(entities, function(entity) {
				entity.addComponent('order', {
					x: position.x,
					y: position.y,
				});
			});
		}
	},

	getTopEntityAt(entities, position) {
		let topEntity;

		each(entities, function(entity) {
			// TODO Make a "getComponents"?
			if(
				entity.getComponent('team').name === 'player' &&
				(!topEntity || topEntity.z < entity.z) &&
				entity.getComponent('sprite').getBounds().contains(position.x, position.y)
			) {
				topEntity = entity;
			}
		});

		return topEntity;
	},
};
