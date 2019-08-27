import BootstrapElement from '/modules/bootstrap-element/index.js';

export default async function ({emitter}){

  // Create a class for the element
  class LoginComponent extends BootstrapElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
      return ['event-name', 'flarp'];
    }

    constructor() {
      // Always call super first in constructor
      super();
      this.template = '#login-component';

      this.message = this.querySelector(":scope .message");

      emitter.on('login-show',()=>{
        console.log('Got login-show')
        $('#loginModal').modal({})
      });
      emitter.on('login-hide',()=>{
        $('#loginModal').modal('hide')
      });
      emitter.on('login-message',(text)=>{
        $('#loginModal .alert .message').text(text)
      });
      
      document.getElementById('login-form')
      .addEventListener('submit', function(event) {

        event.preventDefault();
        const formData = new FormData(document.getElementById('login-form'));
        const packet = {};
        for (const [key,value] of formData){
          packet[key] = value;
        }

        emitter.emit('server-login', packet, function (response) {
          if(response.success){
            // the job of login box is now done.
            emitter.emit('login-hide');
            // other events will send in UI.
          }else{
            emitter.emit('login-message', response.text);
          }
        });

      }); // submit


      this.dataEventHandler = (i)=>this.updateUI(i);
      this.updateAttr()
    }

    updateAttr() {
      if(this.dataEventName) emitter.removeListener(this.dataEventName, this.dataEventHandler)
      this.dataEventName = this.getAttribute('event-name') || 'navigation';
      if(this.dataEventName) emitter.on(this.dataEventName, this.dataEventHandler );
    }

    updateUI(context) {
      this.message.innerHTML = ``;
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

  customElements.define('login-component', LoginComponent);
}
