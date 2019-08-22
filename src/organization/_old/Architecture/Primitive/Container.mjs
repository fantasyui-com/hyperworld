import Thing from './Thing.mjs';

import loadMap from 'hyperworld-load-map';

export default class Container extends Thing {

  list = [];

  addElement(node) {
    node.parent = this;
    this.list.push(node);
  }

  getElements() {
    return this.list;
  }

  async loadMap(xmlFile) {
    await loadMap({ attachTo: this, xmlFile, });
  } // load

}
