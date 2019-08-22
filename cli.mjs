#!/usr/bin/env -S node --experimental-modules
import program from 'commander';
import HyperWorld from './index.mjs';

async function main(){

  program
    .option('-u, --user-name [name]', 'Your username', (process.env.USER||'anonymous'))
    .option('-m, --map-file [file]', 'Load world from an xml file.')
    .option('-g, --god-mode', 'Enable god mode.')
    .option('-s, --screen-printer [name]', 'name of screen printer', 'enquirer')
    .parse(process.argv)

    const options = Object.entries(program).filter(([name])=>!name.startsWith('_')).filter(([name])=>!['Command', 'Option', 'rawArgs', 'commands', 'options', 'parent'].includes(name)).reduce((a,[k,v])=>({...a,[k]:v}),{})
    options.userName = options.userName.toLowerCase().replace(/[^a-z0-9-]/g,'-');

    const world = new HyperWorld(options);
    await world.initialize();

    const session = await world.login('alice', 'qwerty');
    session.user.avatar.command('look');
    //await world.showPrompt();

}

main();
