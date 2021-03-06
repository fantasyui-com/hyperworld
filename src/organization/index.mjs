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

  async initialize(){

    await this.universe.initialize();
    await this.commands.initialize();

    registry.universe.show();

  }

  async login(username, password){
    // TODO: Authentication
    if(password.length == 1){
      return false
    }else{
      return true
    }
  }

  async session(username, password){
    const session = new Session({username, password});
    await session.initialize();
    session.user.avatar.location = 'website';
    return session;
  }

}
