import instanceManager from 'instance-manager';
import './quadtree';

instanceManager.registerResource('dynamic-quadtree', {
	init() {
		// TODO: Remove global debug
		return window.dynamicQuadtree = instanceManager.get('quadtree');
	},
});
