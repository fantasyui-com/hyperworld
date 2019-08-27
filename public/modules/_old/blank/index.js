export default async function install ({emitter}) {

  const htmlString = await fetch(`modules/blank/index.html`).then(function(response){return response.text();})
  document.body.insertAdjacentHTML('beforeend', htmlString);

  document
    .getElementById('')
    .addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(document.getElementById('login-form'));
      const packet = {};
      for (const [key,value] of formData){
        packet[key] = value;
      }
      emitter.emit('', {})
    });

}
