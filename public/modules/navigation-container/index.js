function updateStyle(elem) {
  // const shadow = elem.shadowRoot;
  // shadow.querySelector('style').textContent = `
  //   div {
  //     width: ${elem.getAttribute('l')}px;
  //     height: ${elem.getAttribute('l')}px;
  //     background-color: ${elem.getAttribute('c')};
  //   }
  // `;
}

// Create a class for the element
class NavigationContainer extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    // Always call super first in constructor
    super();

    // const shadow = this.attachShadow({mode: 'open'});
    //
    // const div = document.createElement('div');
    // const style = document.createElement('style');
    // shadow.appendChild(style);
    // shadow.appendChild(div);

    // let template = document.getElementById('navigation-container');
    // let templateContent = template.content;
    //
    // const shadowRoot = this.attachShadow({mode: 'open'})
    // .appendChild(templateContent.cloneNode(true));

    // select all


    // var elements = document.querySelectorAll(selector);
    // Array.prototype.forEach.call(elements, function(el, i){
    //
    // });




  }

  connectedCallback() {
    console.log('Custom square element added to page.');
    updateStyle(this);
    let template = document.getElementById('navigation-container');
    let templateContent = template.content;
    this.appendChild(templateContent.cloneNode(true));
    //  this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";



        var slotContentMap = new Map(Array.prototype.slice.call(this.querySelectorAll('[slot]')).map(i=>[i.slot, i]));
        var slotTargetMap = new Map(Array.prototype.slice.call(this.querySelectorAll('slot')).map(i=>[i.name, i]));
        for (var [key, value] of slotTargetMap.entries()) {
          if(slotContentMap.has(key)) value.append(slotContentMap.get(key))
        }



  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
    this.innerHTML = '';
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    updateStyle(this);
  }
}

customElements.define('navigation-container', NavigationContainer);

export default function util(){}
