import _ from 'lodash';

const components = Symbol('components');
const entityManager = Symbol('entity-manager');
const id = Symbol('id');

class Entity {
	constructor(entityManagerReference) {
		this[entityManager] = entityManagerReference;
		this[components] = {};

		this[id] = _.uniqueId('entity-');
	}

	addComponent(component, props) {
		if(this[components][component] && !props) {
			return this;
		}

		this[components][component] = this[entityManager].createComponent(component, props);

		return this;
	}

	currentComponents() {
		// TODO Cache this
		return _.keys(this[components]);
	}

	getComponent(component) {
		return this[components][component];
	}

	hasComponent(component) {
		return _.contains(this.currentComponents(), component);
	}

	hasComponents(components) {
		if(!_.isArray(components)) {
			return this.hasComponent(components);
		}

		return _.all(components, this.hasComponent, this);
	}

	removeComponent(name) {
		let component = this[components][name];

		this[entityManager].getComponentCleanup(name)(component);
		delete this[components][name];
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
