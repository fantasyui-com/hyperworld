import Node from './Primitive/Node.mjs';

export default class Print extends Node {

  delay = 100;
  text = "";

  constructor({state}) {
    super({state});
  }

  async action(){
    const avatar = await radio.request('avatar');
    const printer = await radio.request('printer');

    await this.pause(this.delay);
    await printer.info(this.text);
  }

}
