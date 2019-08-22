import Node from './Primitive/Node.mjs';
import handlebars from 'handlebars';


export default class Action extends Node {

  text = "";

  async action(){
    const avatar = await radio.request('avatar');
    const printer = await radio.request('printer');

    var template = handlebars.compile(this.text);
    var context = this.store;
    var action    = template(context);
    await avatar.processInput(action);

  }
}
