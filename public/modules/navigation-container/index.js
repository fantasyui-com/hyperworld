export default async function ({emitter}){

  // Create a class for the element
  class NavigationContainer extends HTMLElement {

    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
      return ['event-name', 'flarp'];
    }

    constructor(...args) {
      const self = super(...args);

      // Hide by deafult
      // this.style.display = "none";

      // Load Template
      // Templating related information
      const templateSelector = '#navigation-container';
      const template = document.querySelector(templateSelector);
      const templateContent = template.content;

      // Attach Shadow
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(templateContent.cloneNode(true));

      // when attributtes change...
      // This is for when observedAttributes triggers updateAttr,
      // the listener that previously listened to incommingDataName will be destroyed
      // and a new listener binding to incommingDataFunction will be assigned under the new name
      this.incommingDataName = 'navigation';
      this.incommingDataFunction = (i)=>this.updateUI(i);
      this.updateAttr()

      return self;
    }

    updateAttr() {
      if(this.incommingDataName) emitter.removeListener(this.incommingDataName, this.incommingDataFunction)
      this.incommingDataName = this.getAttribute('event-name') || 'navigation';
      if(this.incommingDataName) emitter.on(this.incommingDataName, this.incommingDataFunction );
    }

    updateUI(context) {
      const dropdownNode = this.shadowRoot.querySelector(":scope *[slot=dropdown] .dropdown-menu")

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


}
