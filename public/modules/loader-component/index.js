import BootstrapElement from '/modules/bootstrap-element/index.js';

export default async function ({emitter}){

  // Create a class for the element
  class LoaderComponent extends BootstrapElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
      return ['event-name', 'flarp'];
    }

    constructor() {
      // Always call super first in constructor
      super();
      this.template = '#loader-component';
      this.progressBar = this.querySelector(":scope .progress .progress-bar");
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
      this.progressBar.innerHTML = ``;
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

  customElements.define('loader-component', LoaderComponent);
}
