import _ from 'lodash';

// TODO Figure out if I want to make private or not.
const components = 'components'; // Symbol('components');
const ecsManager = Symbol('entity-manager');
const id = Symbol('id');

class Entity {
	constructor(ecsManagerReference) {
		this[ecsManager] = ecsManagerReference;
		this[components] = {};

		this[id] = _.uniqueId('entity-');

		this.hasComponent = _.bind(this.hasComponent, this);
	}

	addComponent(component, props) {
		if(this[components][component] && !props) {
			return this;
		}

		this[components][component] = this[ecsManager].createComponent(component, props, this);

		return this;
	}

	currentComponents() {
		// TODO Cache this
		return _.keys(this[components]);
	}

	destroy() {
		this.removeComponents();
	}

	getComponent(component) {
		return this[components][component];
	}

	hasComponent(component) {
		return _.includes(this.currentComponents(), component);
	}

	hasComponents(components) {
		return _.every(components, this.hasComponent);
	}

	removeComponents() {
		_.each(this.currentComponents(), (component) => {
			this.removeComponent(component);
		});

		return this;
	}

	removeComponent(name) {
		let component = this[components][name];

		if(!component) {
			return;
		}

		this[ecsManager].getComponentCleanup(name).call(this, component);
		delete this[components][name];

		return this;
	}

	toggleComponent(component, addComponent, props) {
		addComponent = _.isUndefined(addComponent) ? !this[components][component] : addComponent;

		addComponent ? this.addComponent(component, props): this.removeComponent(component);
	}

	get id() {
		return this[id];
	}
}

module.exports = Entity;
