import registry from 'registry';

import Universe from 'Universe';
import Session from 'Session';

export default class Root {

  universe = new Universe();
  session = new Session();

  constructor({ mapFile, godMode, screenPrinter, userName, context }) {

    registry.root = this;

    Object.entries({ mapFile, godMode, screenPrinter, userName, context })
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value]) => {
      registry[key] = value;
    });

  }

  async initialize(){

    await this.universe.initialize();
    await this.session.initialize();

    console.log(this)
    console.log(registry)
  }

}
