import loginComponentInstallation from '/modules/login/index.js';
import commandComponentInstallation from '/modules/command/index.js';

const program = new EventEmitter();

async function main(){

  // Initialize Components
  await loginComponentInstallation({emitter:program});
  await commandComponentInstallation({emitter:program});

  // Initialize Emitter Events


  program.on('screen',(data)=>{
    // got screen data...
    const {format} = data;
    /* ... */
    // packet handling is to be decided
    console.info('Got a screen packet!')
    console.info(data)
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
