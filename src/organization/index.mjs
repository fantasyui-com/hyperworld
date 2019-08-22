import {inspect} from 'util';

import registry from 'registry';

import Universe from 'Universe';
import Session from 'Session';

export default class Root {

  universe = new Universe();

  constructor({ mapFile, godMode, screenPrinter, userName, context }) {

    // registry.root = this;

    Object.entries({ mapFile, godMode, screenPrinter, userName, context })
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value]) => {
      registry[key] = value;
    });

  }

  async initialize(){

    await this.universe.initialize();

    console.log(registry)
    registry.universe.show();
  }

  async login(username, password){

    const session = new Session();

    await session.initialize();
    session.user.avatar.location = registry.universe.location('home');

    return session;

  }

}
