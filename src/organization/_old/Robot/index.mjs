import Restoration from '../Serialization/Restoration.mjs';
import path from 'path';
import {inspect} from 'util';


export default class Robot {

  conversations = {};


  async loadProcedure(xmlFile){

    const classPath = path.resolve('src/Biology/Robot/');
    const restoration = new Restoration(xmlFile, classPath);
    const conversation = await restoration.procedure({});
    this.conversations[conversation.name] = conversation;
  }

  async talkAbout(conversation){
    const root = this.conversations[conversation];

    if(root){
      // console.log(inspect(root, false, Infinity))
      console.log('Calling Root')
      await root.start();
    }
  }

}
