import radio from 'hyperworld-radio';

export default class Serializable {

  state = {};

  meta = {
    id: null,
    name: null,
    label: null,
  };

  setMeta(obj) {
    Object.assign(this.meta, obj)
  }



}
