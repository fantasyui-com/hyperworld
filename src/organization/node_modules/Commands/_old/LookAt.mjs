export default class LookAt {

  names = ['look at [object]'];

  match({command, argument}){
    if( command.join(' ').startsWith('look at') ){
      return true;
    }
  }

  async execute({command, argument}){
    const thing = command.slice(2).join(' ');
    await this.state.reportManager.info(`Hhnngg, staring at ${thing}!`)
  }

}
