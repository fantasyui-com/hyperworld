export default async function ({emitter}){

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  class ScreenComponent extends HTMLElement {
    constructor(...args) {
      const self = super(...args);
      const templateSelector = '#screen-component';
      const template = document.querySelector(templateSelector);
      const templateContent = template.content;
      const shadowRoot = this.attachShadow({mode: 'open'});

      this.shadowRoot.appendChild(templateContent.cloneNode(true));
      const content = this; // content is the custom element, but make sure you add slot=main to the thing you are injecting

      const injectInput = (context, response) => {
        const html = `<input-component message="${context.message}" initial="${context.initial}"></input-component>`;

        const item = document.createElement("div");
        item.setAttribute('slot', 'main');
        item.innerHTML = html;
        content.appendChild(item);

        item.addEventListener('data', (event) => {
          event.preventDefault();
          response(event.detail);
          content.removeChild(item);
        });

      }

      const injectChoice = (context, response) => {
        const html = `
        <alert-component slot="main" kind="${context.kind}">
          <span slot="title">Alert!</span>
          <span slot="text">${context.text}</span>
          <span slot="note">@${context.username}</span>
        </alert-component>
        `;
        content.insertAdjacentHTML('beforeend', html);
      }

      const injectPrint = (context) => {
        const html = `
        <alert-component slot="main" kind="${context.kind}">
          <span slot="title">Alert!</span>
          <span slot="text">${context.text}</span>
          <span slot="note">@${context.username}</span>
        </alert-component>
        `;
        content.insertAdjacentHTML('beforeend', html);
      }



      emitter.on('input',(context, response)=>injectInput(context, response));
      emitter.on('choice',(context, response)=>injectChoice(context, response));
      emitter.on('print',(context)=>injectPrint(context));


      return self;
    }
  }
  customElements.define('screen-component', ScreenComponent);
  return ScreenComponent;
}
