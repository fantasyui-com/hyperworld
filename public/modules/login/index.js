export default async function install ({emitter}) {

  const htmlString = await fetch(`modules/login/index.html`).then(function(response){return response.text();})
  document.body.insertAdjacentHTML('beforeend', htmlString);

  document
    .getElementById('login-form')
    .addEventListener('submit', function(event) {
    console.log('XXXX')
    event.preventDefault();

    const formData = new FormData(document.getElementById('login-form'));
    packet = {};
    for (const [key,value] of formData){
      packet[key] = value;
    }
    emitter.emit('server-login', packet, function (response) { // args are sent in order to acknowledgement function
      console.log('Server response', response);
      if(response.success){
        card.fadeOut('#login-card')
        card.fadeIn('#command-card');
      }else{
        // try again
        const myCard = card.create({
          "type": "alert",
          "kind": "info",
          "text": response.text
        });
        setTimeout(()=>{
          card.fadeOut(myCard, true);
        }, 2000);
      }
    });
  });

}
