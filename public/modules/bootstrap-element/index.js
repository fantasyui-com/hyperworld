export default class BootstrapElement extends HTMLElement {

  constructor() {
    // Always call super first in constructor
    super();
  }

  // Overload attachShadow and return the current HTMLElement
  attachShadow(){
    return this;
  }

  // helper function
  interpolation(){
    // template refers to <template></template>
    // context refers to stuff inside <your-custom-element>  <span slot="bork">🍭</span> </your-custom-element>
    // overall flow of operation translates to YOUR-HTML = TEMPLATE(CONTEXT)
    // a map of all <slot name="bork"> elements, where key is the name attribute, and value the <slot name="bork"> node;
    const template = new Map( Array.from(this.querySelectorAll('slot').values()).map(i=>[i.name, i]) );
    // an array of [[name, element]] where name is the slot attribute of html element <span slot="bork">🍭</span>
    const context = Array.from(this.querySelectorAll(':scope > *[slot]').values()).map(i=>[i.slot, i]) ;
    console.log(context)
    // traverse context, the list of elements with slot="*" property
    // name is taken from context (see above)
    // element is the thing we want to replace <slot> with
    for (const [slotName, element] of context) {
      // slot is the <slot name="bork"> referenced by <span slot="bork">🍭</span> inside your custom element
      const slot = template.get(slotName);
      // if template had the slot bork, replace the entire  <slot name="bork">*</slot> with <span slot="bork">🍭</span>
      if(slot) slot.parentElement.replaceChild( element, slot ); // Syntax: replacedNode = parentNode.replaceChild(newChild, oldChild);
      // remove the remove slot="bork" from  <span slot="bork">🍭</span>
      // NOTE: THIS IS NON SPEC, YOU SHOULD COMMENT THIS OUT FOR FUTURE COMPAT
      // element.removeAttribute('slot');
    }
    // this removes unused slots, it should hide it maybe
    Array.from(this.querySelectorAll(':scope > *[slot]').values()).map(i=>i.remove());
  }

  // helper function
  set template(query){
    let templateNode = document.querySelector(query);
    let templateContent = templateNode.content;
    this.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
    this.interpolation();
    return this;
  }

}
