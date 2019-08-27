import BootstrapElement from '/modules/bootstrap-element/index.js';

export default function ({emitter}){

  // Create a class for the element
  class NavigationListComponent extends BootstrapElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
      return ['event-name', 'flarp'];
    }

    constructor() {
      // Always call super first in constructor
      super();
      //this.style.display = "inline";
      this.template = '#navigation-list-component';

      //this.listMenu = this;
      this.listMenu = this.querySelector(":scope ul");


      this.dataEventHandler = (i)=>this.updateUI(i);
      this.updateAttr()
    }

    updateAttr() {
      if(this.dataEventName) emitter.removeListener(this.dataEventName, this.dataEventHandler)
      this.dataEventName = this.getAttribute('event-name') || 'navigation';
      if(this.dataEventName) emitter.on(this.dataEventName, this.dataEventHandler );
    }

    updateUI(context) {
      this.listMenu.innerHTML = `
        ${context.locations.filter(location=>location.parent).map(location => `
          <li class="nav-item">
            <a class="nav-link" href="#" data-command="enter ${location.label}">&laquo;${location.label}</a>
          </li>
        `).join('')}

        ${context.locations.filter(location=>location.active).map(location => `
          <li class="nav-item active">
            <a class="nav-link" href="#" data-command="enter ${location.label}">${location.label} <span class="sr-only">(current)</span></a>
          </li>
        `).join('')}

        ${context.locations.filter(location=>!location.parent).filter(location=>!location.active).map(location => `
          <li class="nav-item">
            <a class="nav-link" href="#" data-command="enter ${location.label}">${location.label}</a>
          </li>
        `).join('')}
      `;
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

  customElements.define('navigation-list-component', NavigationListComponent);
}
