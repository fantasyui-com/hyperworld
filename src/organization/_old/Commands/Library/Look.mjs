import radio from 'hyperworld-radio';

export default class Look {

  names = ['look'];

  match({command, argument}){
    if( command.join(' ') == 'look' ){
      return true;
    }
  }

  async execute({command, argument}){

    const printer = await radio.request('printer');
    const avatar = await radio.request('avatar');

    const {parent, meta, data, list} = avatar.location;

    await printer.info(`Your avatar has entered a location called "${meta.label}"`);

    const {origin, locations} = avatar.getPossibleLocationNames();

    if(list.length) {
      let locationInformation = `Looking around it found ${locations.join(', ')}`;
      if((origin)&&(origin!=meta.label)){
        locationInformation += ` and a gateway back to ${origin}`;
      }
      locationInformation += `.`;

      await printer.info(locationInformation);
    }else{
      await printer.info(`This location is empty.`);
    }
  }

}
