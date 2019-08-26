

  class BootstrapElement extends HTMLElement {

    constructor() {
      // Always call super first in constructor
      super();
    }

    attachShadow(){
      return this;
    }

    interpolation(){
      // template refers to <template></template>
      // context refers to stuff inside <your-custom-element>  <span slot="bork">🍭</span> </your-custom-element>
      // overall flow of operation translates to YOUR-HTML = TEMPLATE(CONTEXT)
      // a map of all <slot name="bork"> elements, where key is the name attribute, and value the <slot name="bork"> node;
      const template = new Map( Array.from(this.querySelectorAll('slot').values()).map(i=>[i.name, i]) );
      // an array of [[name, element]] where name is the slot attribute of html element <span slot="bork">🍭</span>
      const context = Array.from(this.querySelectorAll(':scope > *[slot]').values()).map(i=>[i.slot, i]) ;
      console.log(context)
      // traverse context, the list of elements with slot="*" property
      // name is taken from context (see above)
      // element is the thing we want to replace <slot> with
      for (const [slotName, element] of context) {
        // slot is the <slot name="bork"> referenced by <span slot="bork">🍭</span> inside your custom element
        const slot = template.get(slotName);
        // if template had the slot bork, replace the entire  <slot name="bork">*</slot> with <span slot="bork">🍭</span>
        if(slot) slot.parentElement.replaceChild( element, slot ); // Syntax: replacedNode = parentNode.replaceChild(newChild, oldChild);
        // remove the remove slot="bork" from  <span slot="bork">🍭</span>
        // NOTE: THIS IS NON SPEC, YOU SHOULD COMMENT THIS OUT FOR FUTURE COMPAT
        // element.removeAttribute('slot');
      }
    }

    set template(query){
      let templateNode = document.querySelector(query);
      let templateContent = templateNode.content;
      this.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
      this.interpolation();
      return this;
    }

  }

export default function ({emitter}){






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
