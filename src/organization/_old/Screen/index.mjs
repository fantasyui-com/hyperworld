import startCase from 'lodash/startCase.js';
import radio from 'hyperworld-radio';
export default class Printer {

  screenPrinter = 'Enquirer'

  constructor(screenPrinter) {
    this.screenPrinter = screenPrinter;
  }

  async initialize(){
    const printerPath = `./Printer/${startCase(this.screenPrinter)}.mjs`;
    const PrintModule = (await import(printerPath)).default;
    this.printer = new PrintModule();


  }
  // simple convenience functions
  async info(text){
    const data = {type:'alert', kind:'info', text};
    await this.printer.print(data);
  }

  async warning(text){
    const data = {type:'alert', kind:'warning', text};
    await this.printer.print(data);
  }

  async error(text){
    const data = {type:'alert', kind:'error', text};
    await this.printer.print(data);
  }

  async input(data){
    return await this.printer.input(data);
  }

  async select(data){
    return await this.printer.select(data);
  }

  async showPrompt(data){
    return await this.printer.prompt(data);
  }

}
