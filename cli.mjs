#!/usr/bin/env -S node --experimental-modules

import program from 'commander';
import HyperWorld from './index.mjs';

async function main(){

  program
    .option('-u, --username [name]', 'Your username', (process.env.USER||'anonymous'))
    .option('-p, --password [password]', 'Your password')
    .option('-m, --map-file [file]', 'Load world from an xml file.')
    .option('-g, --god-mode', 'Enable god mode.')
    .option('-s, --screen-printer [name]', 'name of screen printer', 'enquirer')
    .parse(process.argv)

    const options = Object.entries(program).filter(([name])=>!name.startsWith('_')).filter(([name])=>!['Command', 'Option', 'rawArgs', 'commands', 'options', 'parent'].includes(name)).reduce((a,[k,v])=>({...a,[k]:v}),{})
    options.username = options.username.toLowerCase().replace(/[^a-z0-9-]/g,'-');

    const world = new HyperWorld(options);
    await world.initialize();

    const login = await world.login(options.username, options.password);

    const session = await world.session(options.username, options.password);
    session.user.avatar.command('look');
    session.user.screen.prompt();

}

main();
