import Config from 'config';
import instanceManager from 'instance-manager';
import {QuadTree} from 'phaser';

const MAX_LEVELS = 4;
const MAX_OBJECTS = 10;


instanceManager.registerResource('quadtree', {
	cache: false,
	init() {
		return new QuadTree(0, 0, Config.stage.width, Config.stage.height, MAX_OBJECTS, MAX_LEVELS);
	},
});
