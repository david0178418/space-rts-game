import instanceManager from 'instance-manager';

instanceManager.registerResource('group', {
	cache: false,
	init: function() {
		return instanceManager.get('game').add.group();
	},
});
