//import loginComponentInstallation from '/modules/login/index.js';
import commandComponentInstallation from '/modules/command/index.js';
//import navigationComponentInstallation from '/modules/navigation/index.js';

import loginComponent from '/modules/login-component/index.js';
import navigationContainer from '/modules/navigation-container/index.js';
import loaderComponent from '/modules/loader-component/index.js';

const emitter = new EventEmitter();

async function main(){

  // Initialize Components

  await loaderComponent({emitter});
  await navigationContainer({emitter});
  await loginComponent({emitter});

  // Initialize Emitter Events


  emitter.on('screen',(input)=>{
    const {format, type, ...packet} = input;
    console.info('Got a screen packet!', {format, type, packet})
    if(format === 'data'){
      emitter.emit(type, packet)
    }else{
      emitter.emit(format, packet)
    }
  });


  emitter.on('loaded',()=>{
   emitter.emit('login-show')
  });

  emitter.on('authenticated',()=>{
   emitter.emit('command', {command:'nav'})
  });

  emitter.on('*', e => console.log('Event', e) )
  emitter.emit('loaded');

  // Initialize Server Communication
  const socket = io('http://localhost:3000');

  // Packet Forwarding
  // Please, packet forwarding only, this must be easy to read.
  socket.on('connect', () => {
    socket.on('screen', packet => emitter.emit('screen', packet));
    socket.on('authenticated', packet => emitter.emit('authenticated', packet));
  });

  emitter.on('server-login', (packet,response) => socket.emit('server-login', packet, response));
  emitter.on('command', (packet, response) => socket.emit('command', packet, response));
  //
  // document.body.addEventListener("click", event => {
  //   try{
  //     const command = event.target.dataset.command;
  //     if(command) emitter.emit('command', {command})
  //   }catch(error){
  //     console.error(error)
  //   }
  // });

  document.body.addEventListener("click", ({target:{dataset:{command}}}) => command?emitter.emit('command', {command}):0 );


} // main


  main();
