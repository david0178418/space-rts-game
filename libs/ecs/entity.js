import {bind, each, every, includes, isUndefined, keys, uniqueId} from 'lodash';

// TODO Figure out if I want to make private or not.
const components = 'components'; // Symbol('components');
const ecsManager = Symbol('entity-manager');
const id = Symbol('id');

class Entity {
	constructor(ecsManagerReference) {
		this[ecsManager] = ecsManagerReference;
		this[components] = {};

		this[id] = uniqueId('entity-');

		this.doesNotHaveComponent = bind(this.doesNotHaveComponent, this);
		this.hasComponent = bind(this.hasComponent, this);
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
		return keys(this[components]);
	}

	destroy() {
		this.removeComponents();
	}

	doesNotHaveComponent(component) {
		return !includes(this.currentComponents(), component);
	}

	doesNotHaveComponents(components) {
		return every(components, this.doesNotHaveComponent);
	}

	getComponent(component) {
		return this[components][component];
	}

	hasComponent(component) {
		return includes(this.currentComponents(), component);
	}

	hasComponents(components) {
		return every(components, this.hasComponent);
	}

	removeComponents() {
		each(this.currentComponents(), (component) => {
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
		addComponent = isUndefined(addComponent) ? !this[components][component] : addComponent;

		addComponent ? this.addComponent(component, props): this.removeComponent(component);
	}

	get id() {
		return this[id];
	}
}

module.exports = Entity;
