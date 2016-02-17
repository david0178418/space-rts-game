import instanceManager from 'instance-manager';

instanceManager.registerResource('team-colors', {
	init() {
		// TODO: Make this dynamic
		return {
			player: 'green',
			ai1: 'red',
		};
	},
});
