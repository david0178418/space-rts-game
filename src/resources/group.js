import instanceManager from 'instance-manager';

instanceManager.registerResource('group', {
	cache: false,
	init() {
		return instanceManager.get('game').add.group();
	},
});
