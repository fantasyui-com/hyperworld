export default async function install ({emitter}) {

  const template = function(context){

    console.log('navigation template got', context);
    return `

        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto">

          ${context.locations.filter(location=>location.parent).map(location => `
            <li class="nav-item">
              <a class="nav-link" href="#" data-command="enter ${location.label}">&laquo;${location.label}</a>
            </li>
          `).join('')}

          ${context.locations.filter(location=>location.active).map(location => `
            <li class="nav-item active">
              <a class="nav-link" href="#" data-command="enter ${location.label}">${location.label} <span class="sr-only">(current)</span></a>
            </li>
          `).join('')}

          ${context.locations.filter(location=>!location.parent).filter(location=>!location.active).map(location => `
            <li class="nav-item">
              <a class="nav-link" href="#" data-command="enter ${location.label}">${location.label}</a>
            </li>
          `).join('')}

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</a>
              <div class="dropdown-menu" aria-labelledby="dropdown01">
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


              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>

    `;
  }

  const navigation = document.createElement("nav");
  navigation.id = 'navigation';
  navigation.className = 'navbar navbar-expand-md navbar-dark bg-dark fixed-top';
  document.body.append(navigation);


  //
  // document.body.insertAdjacentHTML('beforeend', htmlString);
  // document.getElementById('navigation')
  // .addEventListener('submit', function(event) {
  //
  //   event.preventDefault();
  //   const formData = new FormData(document.getElementById('login-form'));
  //   const packet = {};
  //   for (const [key,value] of formData){
  //     packet[key] = value;
  //   }
  //
  //   emitter.emit('server-login', packet, function (response) {
  //     if(response.success){
  //       // the job of login box is now done.
  //       emitter.emit('login-hide');
  //       // other events will send in UI.
  //     }else{
  //       emitter.emit('login-message', response.text);
  //     }
  //   });
  //
  // }); // submit

  emitter.on('navigation',(context)=>{
    const html = template(context);
    navigation.innerHTML = html;

  });



}
