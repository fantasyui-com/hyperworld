import Actions from './Avatar/Actions.mjs';

export default class Avatar extends Actions {

  attributes = {
    location: null,
    assistant: null,
  };

  async initialize (){
    await this.loadActions();
  }

  get location(){
    return this.attributes.location;
  }

  set location(location){
    // TODO: verify validity of location
    //console.log(`Avatar is entering "${location.meta.label}"`)
    this.attributes.location = location;
  }
  get assistant(){
    return this.attributes.assistant;
  }

  set assistant(assistant){
    this.attributes.assistant = assistant;
  }


  getPossibleLocationNames() {
    const {root, parent, meta, data, list} = this.attributes.location;
    const response = {
      origin:null,
      locations: list.map(location=>location.meta.label),
    };
    if(parent){
      response.origin = parent.meta.label;
    }else{
      response.origin = root.label;
    }
    return response;
  }


}
