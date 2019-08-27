import BootstrapElement from '/modules/bootstrap-element/index.js';

import dropdownComponent from './modules/dropdown-component/index.js';
import listComponent from './modules/list-component/index.js';

export default async function ({emitter}){

  // Create a class for the element
  class NavigationContainer extends BootstrapElement {

    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
      return ['event-name', 'flarp'];
    }

    constructor() {
      // Always call super first in constructor
      super();
      //this.style.display = "none";
      this.template = '#navigation-container';
      this.dataEventHandler = (i)=>this.updateUI(i);
      this.updateAttr()
    }

    updateAttr() {
      if(this.dataEventName) emitter.removeListener(this.dataEventName, this.dataEventHandler)
      this.dataEventName = this.getAttribute('event-name') || 'navigation';
      if(this.dataEventName) emitter.on(this.dataEventName, this.dataEventHandler );
    }

    updateUI(context) {
      const dropdownNode = this.querySelector(":scope *[slot=dropdown] .dropdown-menu")
      dropdownNode.innerHTML = `
        ${context.locations.filter(location=>!location.parent).filter(location=>!location.active).map(location => `
          <a class="dropdown-item" href="#" data-command="enter ${location.label}">${location.label}</a>
        `).join('')}
        <div class="dropdown-divider"></div>
        ${context.locations.filter(location=>location.parent).map(location => `
          <a class="dropdown-item" href="#" data-command="enter ${location.label}"><b class="text-muted">&#x21b2;</b> ${location.label}</a>
        `).join('')}
        ${context.locations.filter(location=>location.active).map(location => `
          <a class="dropdown-item" href="#" data-command="enter ${location.label}"><b class="text-muted">&#x21ba;</b> ${location.label}</a>
        `).join('')}
      `;
      this.style.display = "block";
    }

    connectedCallback() {
      // console.log('Custom square element added to page.');
      // update
    }

    disconnectedCallback() {
      // console.log('Custom square element removed from page.');
      this.innerHTML = '';
    }

    adoptedCallback() {
      // console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.updateAttr();
    }
  }


  customElements.define('navigation-container', NavigationContainer);

  await dropdownComponent({emitter});
  await listComponent({emitter});

}
