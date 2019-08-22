import {inspect} from 'util';

import registry from 'registry';

import Universe from 'Universe';
import Commands from 'Commands';
import Session from 'Session';

export default class Root {

  universe = new Universe();
  commands = new Commands();

  constructor({ mapFile, godMode, screenPrinter, userName, context }) {

    Object.entries({ mapFile, godMode, screenPrinter, userName, context })
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value]) => {
      registry[key] = value;
    });

  }
`
  async initialize(){

    await this.universe.initialize();
    await this.commands.initialize();
    // console.log(registry)
    registry.universe.show();
  }

  async login(username, password){

    const session = new Session({username, password});

    await session.initialize();
    session.user.avatar.location = 'website';
    return session;
  }

}
