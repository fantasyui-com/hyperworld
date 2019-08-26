import loginComponentInstallation from '/modules/login/index.js';
import commandComponentInstallation from '/modules/command/index.js';
//import navigationComponentInstallation from '/modules/navigation/index.js';

import navigationContainer from '/modules/navigation-container/index.js';

const program = new EventEmitter();

async function main(){

  // Initialize Components
  //await navigationComponentInstallation({emitter:program});
  await loginComponentInstallation({emitter:program});
  await commandComponentInstallation({emitter:program});
  await navigationContainer({emitter:program});

  // Initialize Emitter Events


  program.on('screen',(input)=>{

    const {format, type, ...packet} = input;

    console.info('Got a screen packet!', {format, type, packet})

    if(format === 'data'){
      program.emit(type, packet)
    }else{
      program.emit(format, packet)
    }

  });


  program.on('loaded',()=>{
   program.emit('login-show')
  });

  program.on('*', e => console.log('Event', e) )
  program.emit('loaded');



  // Initialize Server Communication
  const socket = io('http://localhost:3000');

  // Packet Forwarding
  // Please, packet forwarding only, this must be easy to read.
  socket.on('connect', () => {
    socket.on('screen', packet => program.emit('screen', packet));
  });

  program.on('server-login', (packet,response) => socket.emit('server-login', packet, response));
  program.on('command', (packet,response) => socket.emit('command', packet, response));

} // main
main();
