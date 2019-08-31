export default async function ({emitter}){
  class LoginComponent extends HTMLElement {
    constructor(...args) {
      const self = super(...args);
      const templateSelector = '#login-component';
      const template = document.querySelector(templateSelector);
      const templateContent = template.content;
      const shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(templateContent.cloneNode(true));

      const frmMain = this.shadowRoot.querySelector('form');
      const lblMsg = this.querySelector(".message");

      frmMain.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(frmMain);
        const packet = {};
        for (const [key, value] of formData){
          packet[key] = value;
        }
        emitter.emit('server-login', packet, (response) => {
          if(response.success){
            // the job of login box is now done.
            this.style.display = 'none';
            // other events will send in UI.
          }else{
            lblMsg.textContent = response.text;
          }
        });
      }); // submit
      return self;
    }
  }
  customElements.define('login-component', LoginComponent);
  return LoginComponent;
}
