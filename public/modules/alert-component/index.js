export default async function ({emitter}){

  class AlertComponent extends HTMLElement {

    constructor(...args) {
      const self = super(...args);

      const templateSelector = '#alert-component';
      const template = document.querySelector(templateSelector);
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(templateContent.cloneNode(true));

      const alertBox = this.shadowRoot.querySelector('div');

      // For dismiss button:
      // alertBox.addEventListener('submit', (event) => {
      //   event.preventDefault();
      //   const formData = new FormData(commandForm);
      //   const packet = {};
      //   for (const [key, value] of formData){
      //     packet[key] = value;
      //   }
      //   emitter.emit('command', packet);
      // }); // submit

      return self;
    }

  }

  customElements.define('alert-component', AlertComponent);
  return AlertComponent;

}
