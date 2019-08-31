import uuid from '/modules/uuid/index.js';

export default async function ({emitter}){
  class InputComponent extends HTMLElement {
    constructor(...args) {
      const self = super(...args);
      const templateSelector = '#input-component';
      const template = document.querySelector(templateSelector);
      const templateContent = template.content;
      const shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(templateContent.cloneNode(true));

      const frmMain = this.shadowRoot.querySelector('form');
      const label = frmMain.querySelector('form label');
      const input = frmMain.querySelector('form input');

      input.value = this.getAttribute('initial');
      label.textContent = this.getAttribute('message');

      frmMain.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(frmMain);
        const detail = {};
        for (const [key, value] of formData){
          detail[key] = value;
        }
        const dataEvent = new CustomEvent('data', { bubbles: true, cancelable: true, detail });
        this.dispatchEvent(dataEvent);
      });


      return self;
    }
  }
  customElements.define('input-component', InputComponent);
  return InputComponent;
}
