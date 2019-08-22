export default class Login {

  names = ['login'];
 
  match({command, argument}){
    const [directive] = command;
    if( directive == 'login' ){
      return true;
    }
  }

  async execute({command, argument}){
    const [directive, username, password] = command;
    await this.state.reportManager.info(`Attempting to log you in ${username} with password ${password}...`);
  }

}
