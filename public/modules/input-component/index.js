export default async function ({emitter}){

  class InputComponent extends HTMLElement {

    constructor(...args) {

      const self = super(...args);
      const templateSelector = '#input-component';
      const template = document.querySelector(templateSelector);
      const templateContent = template.content;

      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(templateContent.cloneNode(true));

      const valueName = this.getAttribute('value-name');

      const frmMain = this.shadowRoot.querySelector('form');
      const lblMain = frmMain.querySelector('form label');
      const txtMain = frmMain.querySelector('form input');
      txtMain.name = valueName;

      lblMain.textContent = this.getAttribute('message');
      txtMain.value = this.getAttribute('initial');

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
