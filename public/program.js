import loginComponentInstallation from '/modules/login/index.js';
import commandComponentInstallation from '/modules/command/index.js';

const program = mitt();


async function main(){

  // Initialize Components
  await loginComponentInstallation({emitter:program});
  await commandComponentInstallation({emitter:program});

  // Initialize Emitter Events
  program.on('show-login',()=>{
    $('#loginModal').modal({})
  });

  program.on('screen',(data)=>{
    // got screen data...
    const {format} = data;
    /* ... */
    // packet handling is to be decided
  });


  program.on('loaded',()=>{
   program.emit('show-login')
  });

  program.on('*', e => console.log('Event', e) )
  program.emit('loaded');



  // Initialize Server Communication
  const socket = io('http://localhost:3000');

  // Packet Forwarding
  // Please, packet forwarding only, this must be easy to read.
  socket.on('connect', () => {
    socket.on('screen', data => program.emit('screen', data));
  });


} // main
main();
