export default async function ({emitter}){

  class SelectComponent extends HTMLElement {

    constructor(...args) {

      const self = super(...args);

      try{
        const templateSelector = '#select-component';
        const template = document.querySelector(templateSelector);
        const templateContent = template.content;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateContent.cloneNode(true));
      }catch(e){
        console.error(`Error in ${this.constructor.name}`);
        console.error(e);
      }

      const choicesArray = JSON.parse(decodeURI(this.getAttribute('choices')));
      const valueName = this.getAttribute('value-name');
      const choicesNode = this.shadowRoot.querySelector('div.choices');

      for (const {name, value} of choicesArray ){
        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");

        input.type = 'hidden';
        input.name = valueName;
        input.value = value;

        button.textContent = name;
        button.classList.add('choice');

        form.appendChild(input);
        form.appendChild(button);
        choicesNode.appendChild(form);

        form.addEventListener('submit', (event) => {
          event.preventDefault();
          const formData = new FormData(form);
          const detail = {};
          for (const [key, value] of formData){
            detail[key] = value;
          }
          const dataEvent = new CustomEvent('data', { bubbles: true, cancelable: true, detail });
          this.dispatchEvent(dataEvent);
        });

      }

      // <input type="hidden" name="value" value="${name}"> <button type="submit">${name}</button>
      // lblMain.textContent = this.getAttribute('message');
      // txtMain.value = this.getAttribute('initial');



      return self;
    }

  }

  customElements.define('select-component', SelectComponent);
  return SelectComponent;
}
