import head from 'lodash/head.js';

import Node from './Primitive/Node.mjs';

export default class Select extends Node {

  delay = 100;
  type = null;
  choices = [];

  // Only choices are found under select prompt
  addElement(node){
    this.debug.push(node);
    this.choices.push(node);
  }

  // custom starter
  async start(){
    await this.action();
    // for(const element of this.#elements){
    //   await element.start();
    // }
  }

  async action(){
    const avatar = await radio.request('avatar');
    const printer = await radio.request('printer');

    await this.pause(this.delay);

    const choices = [];
    for(const element of this.choices){
      const {text, description, value} = element;
      choices.push({message:text, description, value});
    }

    const response = await printer.select({name:this.name, message:this.text, choices});

    // await reportManager.info(`The response is ${response}`);
    const selection = head( this.choices.filter(i=>i.value==response.value) );

    //console.log(selection.text)

    // Resume at proper branch
    await selection.start();


  }

}
