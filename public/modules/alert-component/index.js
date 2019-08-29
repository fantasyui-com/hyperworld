import BootstrapElement from '/modules/bootstrap-element/index.js';

export default async function ({emitter}){

  // Create a class for the element
  class AlertComponent extends BootstrapElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
      return ['event-name', 'flarp'];
    }

    constructor() {
      // Always call super first in constructor
      super();
      this.template = '#alert-component';

      this.alertSelector = this.querySelector(":scope .alert");
      const type = this.getAttribute('type')||'info';
      const typeClass = `alert-${type}`;
      this.alertSelector.classList.add(typeClass);

      //console.log('Alert Type',type)


      this.titleSelector = this.querySelector(":scope slot[name=title]");
      this.textSelector = this.querySelector(":scope slot[name=text]");
      this.noteSelector = this.querySelector(":scope slot[name=note]");

      this.dataEventHandler = (i)=>this.updateUI(i);
      this.updateAttr()

      emitter.on('authenticated',()=>{
        this.style.display = "none";
      })
    }

    updateAttr() {
      if(this.dataEventName) emitter.removeListener(this.dataEventName, this.dataEventHandler)
      this.dataEventName = this.getAttribute('event-name') || 'navigation';
      if(this.dataEventName) emitter.on(this.dataEventName, this.dataEventHandler );
    }

    updateUI(context) {
      // this.progressBar.innerHTML = ``;
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

  customElements.define('alert-component', AlertComponent);
}
