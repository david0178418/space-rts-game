import instanceManager from 'instance-manager';
import './quadtree';

instanceManager.registerResource('planets-quadtree', {
	init() {
		// TODO: Remove global debug
		return window.planetsQuadtree = instanceManager.get('quadtree');
	},
});
