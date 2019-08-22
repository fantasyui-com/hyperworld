import { inspect } from 'util';

import fs from 'fs';
import path from 'path';

import repeat from 'lodash/repeat.js';
import startCase from 'lodash/startCase.js';

import radio from 'hyperworld-radio';

import User from './Biology/User.mjs';
import Avatar from './Biology/Avatar.mjs';
import Assistant from './Biology/Robot.mjs';

import Location from './Architecture/Location.mjs';
import Printer from './Interface/Printer.mjs';


/**
 * HyperWorld is the heart of the system
 * @public
 * @class
 */
export default class HyperWorld {

  debug = {
    constructorAsignment: false,
    initialMap: true,
    printEventNames: true
  };

  context = {};

  userName = 'anonymous';
  godMode = false;

  mapFile = null;
  screenPrinter = 'enquirer';

  /**
   * Accept configuration
   */
  constructor({ mapFile, godMode, screenPrinter, userName, context }) {

    Object.entries({ mapFile, godMode, screenPrinter, userName, context })
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value]) => {
      if(this.debug.constructorAsignment) console.log(`this['${key}'] = ${JSON.stringify(value)};`)
      this[key] = value;
    });

    radio.on('world', (response) => {
      response(this);
    });

  }

  /**
   * Use configuration to perform initialization
   */
  async initialize(){
    await this.initilizeScreenPrinter();
    await this.initializeUniverse();
    await this.loadMap(this.mapFile);
    await this.initializeAvatar();
    if(this.debug.printEventNames) console.log(radio.eventNames());
    return radio;
  }

  async initializeUser(){
    this.user = new User();
  }

  async initilizeScreenPrinter(){

    this.printer = new Printer(this.screenPrinter);
    await this.printer.initialize()
    radio.on('printer', (response) => { response(this.printer) });

  }

  async initializeUniverse(){
    // In the beginning the Universe was created...
    // This had made many people very angry and has been widely regarded as a bad move.
    this.universe = new Location();
    this.universe.root = this.universe;
    this.universe.parent = this.universe;
    this.universe.setMeta({
      id:"universe",
      name:"universe",
      label:"Universe"
    });
    this.universe.setData({});

    radio.on('universe', (response) => { response(this.universe) });
  }

  async loadMap(mapFile){
    // if there is a map to be loaded, load it here
    if(mapFile) await this.universe.loadMap(mapFile);
    if(this.debug.initialMap) this.showMap(this.universe);
  }

  showMap(root){
    const show = function(node, indent = -1){
      indent++;
      const className = node.constructor.name;
      const spaceIndent = repeat('  ', indent);
      const objectName = node.meta.label||node.meta.name||node.meta.id;
      console.log(`${spaceIndent}${objectName} (${className})`);

      if(node.getElements) node.getElements().forEach(function(child){
        show(child, indent)
      })
      indent--
    }
    show(root);
  }



  async initializeAvatar(){

    this.avatar = new Avatar();
    this.avatar.userName = this.userName;
    await this.avatar.initialize();
    this.avatar.location = this.universe;
    radio.on('avatar', (response) => { response(this.avatar) });

    const assistant = new Assistant({id:'personal-assistant'})
    await assistant.loadProcedure('procedures/login.xml');
    this.avatar.assistant = assistant;
    radio.on('assistant', (response) => { response(assistant) });

  }












  // API: ALL SYSTEM COMMANDS ARE CALLED THROUGH HERE
  // NOTE: you are not to interact with helpers directly.
  // if you want the system to do something, do it through here
  // what follows is the system API

  // BOOT HELPERS, things to gonfigure other things.




  showPrompt(){
    this.printer.showPrompt();
  }

  /**
   * @description Returns a list of all registered commands for CLI completions.
   * @returns {array} List of names of all registered commands
   */






  getPossibleAssistantConversationNames() {
    return Object.keys(this.avatar.assistant.conversations);
  }





  // User
  registerUser(username, password) {}
  signIn(username, password) {}
  getUser(username) {}
  getCurrentUser() {}

  // Location, Gateway, Thing
  getCurrentLocation() {}
  getLocationUsers(){}
  getLocationGateway(){}
  getLocationThings(){}

  // Gateway
  openGateway() {}
  closeGateway() {}

  // Location
  gotoLocation() {}
  exitLocation() {}




}
