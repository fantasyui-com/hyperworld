
export default class Node {
  state = null;
  parent = false;
  elements = [];
  debug = [];

  set parent(parent){
    this.parent = parent;
  }
 
  addElement(node){
    this.debug.push(node);
    this.elements.push(node);
  }

  getElements(node){
    return this.elements;
  }

  async pause(ms=100){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve()
      },ms)
    })
  }

  async action(){
    // stub
  }

  async start(){
    await this.action();
    //console.log(this.store)
    for(const element of this.elements){
      await element.start();
    }
  }

}
