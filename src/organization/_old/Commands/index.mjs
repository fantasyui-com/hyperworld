import fs from 'fs';
import path from 'path';
import flatten from 'lodash/flatten.js';
import hyperworldReadline from 'hyperworld-readline';
import radio from 'hyperworld-radio';

export default class Actions {

  actions = [];

  async loadActions(){
    const filePath = path.resolve('src/Biology/Avatar/Actions');
    const fileListing = (await fs.promises.readdir(filePath, {withFileTypes:true}));
    const classPaths = fileListing
    .filter(dirEnt=>dirEnt.isFile())
    .map(dirEnt=>dirEnt.name)
    .filter(name=>name.match(/^[A-Z]/))
    .filter(name=>name.match(/mjs$/))
    .map(name=>({name:path.basename(name, '.mjs'), location:path.join(filePath, name)}))

    for( const {name, location} of classPaths ){
       this.actions.push(new (await import(location)).default)
    }




    console.dir(this.actions);

   }

  async getActionCompletions(){
    const response = flatten(this.actions.map(({names})=>names));

    // this helps with navigation
    const {origin, locations} = this.getPossibleLocationNames();
    for (const location of locations){
      response.push(`enter ${location}`);
    }
    if((origin)&&(origin!=this.location.meta.label)) response.push(`enter ${origin}`);

    // TODO: restore asistant assistance
    // help with assistant conversations
    // const assistant = await radio.request('assistant');
    // for (const conversation of assistant.getPossibleAssistantConversationNames()){
    //     response.push(`assistant ${conversation}`);
    // }

    //console.log(response)
    return response.sort()

  }

  async processInput(line){
    const printer = await radio.request('printer');

    const input = hyperworldReadline(line);

    let matched = false;
    for(const action of this.actions){
      if(action.match(input)){
        matched = true;
        await action.execute(input);
      }
    }
    if(!matched){
      await printer.warning(`Input "${line}" not understood...`)
    }
  }





}
