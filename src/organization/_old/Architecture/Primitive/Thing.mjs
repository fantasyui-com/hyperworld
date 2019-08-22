import Serializable from './Serializable.mjs';

export default class Thing extends Serializable {

  parent = null;
  data = {};

  setData(obj) {
    Object.assign(this.data, obj)
  }
  
}
