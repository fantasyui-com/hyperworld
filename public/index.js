import loginComponent from '/modules/login-component/index.js';
import navigationContainer from '/modules/navigation-container/index.js';
import linksComponent from './modules/links-component/index.js';
import commandComponent from './modules/command-component/index.js';
import alertComponent from '/modules/alert-component/index.js';
import screenComponent from './modules/screen-component/index.js';

import inputComponent from './modules/input-component/index.js';

const emitter = new EventEmitter();

async function main(){

  // Initialize Components


  await navigationContainer({emitter});
  await loginComponent({emitter});

  await linksComponent({emitter});
  await commandComponent({emitter});

  await alertComponent({emitter});
  await screenComponent({emitter});

  await inputComponent({emitter});


  // Initialize Emitter Events

  emitter.on('screen',(input, response)=>{
    console.log('response',response);
    const {format, type, ...packet} = input;
    console.info('Got a screen packet!', {format, type, packet})

    if(format === 'data'){
      emitter.emit(type, packet)

    }else if(format === 'input'){
      emitter.emit(format, packet, response);
    }else if(format === 'choice'){
      emitter.emit(format, packet, response);
    }else if(format === 'print'){
      emitter.emit(format, packet);
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
    socket.on('screen', (packet, response) => emitter.emit('screen', packet, response));
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
