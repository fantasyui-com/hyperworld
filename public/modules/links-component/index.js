export default async function ({emitter}){
  class LinksComponent extends HTMLElement {
    constructor(...args) {
      const self = super(...args);
      const templateSelector = '#links-component';
      const template = document.querySelector(templateSelector);
      const templateContent = template.content;
      const shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(templateContent.cloneNode(true));
      const content = this.shadowRoot.querySelector('ul');
      const update = function(context){
        content.innerHTML = `
          ${context.locations.filter(location=>location.parent).map(location => `
            <li>
              <a href="#" data-command="enter ${location.label}">&laquo;${location.label}</a>
            </li>
          `).join('')}
          ${context.locations.filter(location=>location.active).map(location => `
            <li class="active">
              <a href="#" data-command="enter ${location.label}">${location.label} <span class="sr-only">(current)</span></a>
            </li>
          `).join('')}
          ${context.locations.filter(location=>!location.parent).filter(location=>!location.active).map(location => `
            <li>
              <a href="#" data-command="enter ${location.label}">${location.label}</a>
            </li>
          `).join('')}
        `;
      }
      emitter.on('navigation',(context)=>update(context));
      return self;
    }
  }
  customElements.define('links-component', LinksComponent);
  return LinksComponent;
}
