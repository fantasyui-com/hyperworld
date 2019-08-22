import Node from './Primitive/Node.mjs';

export default class Input extends Node {

  delay = 100;
  type = null;


  async action(){
    const avatar = await radio.request('avatar');
    const printer = await radio.request('printer');

    await this.pause(this.delay);
    const response = await printer({message:this.text});
    if(this.name) this.store[this.name] = response.value;

  }

}
