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
      const alertArticle = this.shadowRoot.querySelector('div article');

      const kind = this.getAttribute('kind');
      if(kind){
        console.log(alertBox)
        alertArticle.style.border = `1px solid var(--${kind})`;
      }

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
