import head from 'lodash/head.js'
import radio from 'hyperworld-radio';

export default class Enter {

  names = ['enter'];

  match({command, argument}){

    if( command.join(' ').startsWith('enter') ){
      return true;
    }
  }

  async execute({command, argument}){

    const printer = await radio.request('printer');
    const avatar = await radio.request('avatar');

    const {parent, meta, data, list} = avatar.location;

    const name = command.slice(1).join(' ');
    const targetLocation = head(list.concat(parent).filter(location=>location.meta.label == name))

    if(targetLocation){
      avatar.location = targetLocation;
      await avatar.processInput('look');
    }else{
      await printer.info(`That is not a location.`);
    }

  } // execute

}
