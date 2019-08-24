export default async function install ({emitter}) {

  const htmlString = await fetch(`modules/command/index.html`).then(function(response){return response.text();})
  document.body.insertAdjacentHTML('beforeend', htmlString);

    document.getElementById('command-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(document.getElementById('command-form'));
      const packet = {};
      for (const [key,value] of formData){
        packet[key] = value;
      }
      console.log('command', packet);
      emitter.emit('command', packet, function (response) { // args are sent in order to acknowledgement function
        console.log('response: Server response', response);
      });
    });

}
