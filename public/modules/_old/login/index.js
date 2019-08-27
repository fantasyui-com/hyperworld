export default async function install ({emitter}) {
  emitter.on('login-show',()=>{
    $('#loginModal').modal({})
  });
  emitter.on('login-hide',()=>{
    $('#loginModal').modal('hide')
  });
  emitter.on('login-message',(text)=>{
    $('#loginModal .alert .message').text(text)
  });

  const htmlString = await fetch(`modules/login/index.html`).then(function(response){return response.text();})

  document.body.insertAdjacentHTML('beforeend', htmlString);
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

}
