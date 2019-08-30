export default async function ({emitter}){

  class CommandComponent extends HTMLElement {

    constructor(...args) {
      const self = super(...args);

      const templateSelector = '#command-component';
      const template = document.querySelector(templateSelector);
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(templateContent.cloneNode(true));

      const commandForm = this.shadowRoot.querySelector('form[name=command-form]');

      commandForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(commandForm);
        const packet = {};
        for (const [key, value] of formData){
          packet[key] = value;
        }
        emitter.emit('command', packet);
      }); // submit

      return self;
    }

  }

  customElements.define('command-component', CommandComponent);
  return CommandComponent;
  
}
