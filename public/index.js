
// Menu Related
import navigationContainer from '/modules/navigation-container/index.js';
  import linksComponent from './modules/links-component/index.js';
  import commandComponent from './modules/command-component/index.js';

// Screen Related
import screenContainer from './modules/screen-container/index.js';
  import alertComponent from '/modules/alert-component/index.js';
  import loginComponent from '/modules/login-component/index.js';
  import inputComponent from './modules/input-component/index.js';
  import selectComponent from './modules/select-component/index.js';

const emitter = new EventEmitter();

async function main(){

  // Initialize Components

  // Menu Related
  await navigationContainer({emitter});
    await linksComponent({emitter});
    await commandComponent({emitter});

  // Screen Related
  await screenContainer({emitter});
    await alertComponent({emitter});
    await loginComponent({emitter});
    await inputComponent({emitter});
    await selectComponent({emitter});


  // Initialize Emitter Events

  emitter.on('screen',(input, response)=>{

    const {format, type, ...packet} = input;

    console.info('screen packet!', {format, type, packet})

    if(format === 'data'){
      emitter.emit(type, packet)

    }else if(format === 'input'){
      emitter.emit(format, packet, response);
    }else if(format === 'select'){
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
