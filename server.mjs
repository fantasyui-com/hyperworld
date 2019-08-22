#!/usr/bin/env -S node --experimental-modules

import http from 'http';
import program from 'commander';
import express from 'express';
import socketIo from 'socket.io';
import HyperWorld from './index.mjs';


async function main(){

  program
    .option('-u, --username [name]', 'Your username', (process.env.USER||'anonymous'))
    .option('-p, --password [password]', 'Your password')
    .option('-m, --map-file [file]', 'Load world from an xml file.')
    .option('-g, --god-mode', 'Enable god mode.')
    .option('-s, --screen-printer [name]', 'name of screen printer', 'json')
    .parse(process.argv)

    const options = Object.entries(program).filter(([name])=>!name.startsWith('_')).filter(([name])=>!['Command', 'Option', 'rawArgs', 'commands', 'options', 'parent'].includes(name)).reduce((a,[k,v])=>({...a,[k]:v}),{})
    options.username = options.username.toLowerCase().replace(/[^a-z0-9-]/g,'-');

    const world = new HyperWorld(options);
    await world.initialize();


    const app = express();
    app.use(express.static('public'))
    var server = http.createServer(app);
    var io = socketIo(server);

    io.on('connection', function(socket){
      let session = null;
      console.log('a user connected');

      socket.on('server-login', async function({username, password}){

        session = await world.login(username, password);

        socket.emit('screen', await session.user.screen.info('session established'))

        //await world.showPrompt();
        socket.on('command', function(command){
          const response = session.user.avatar.command('look');
          socket.emit(response);
        });

      });


      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });

    process.on( 'SIGINT', function() {
       process.exit(0);
    })

    server.listen(3000, function(){
      console.log('listening on *:3000');
    });


}

main();
