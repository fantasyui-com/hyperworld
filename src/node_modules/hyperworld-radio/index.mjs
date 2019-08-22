import EventEmitter from 'events';
class Radio extends EventEmitter {
  request(name){
    return new Promise((resolve, reject) => {
      if(this.eventNames().includes(name)){
        this.emit(name, (response) => resolve(response))
      }else{
        reject("Unknown event")
      }
    })
  }
}
const radio = new Radio();
export default radio;
