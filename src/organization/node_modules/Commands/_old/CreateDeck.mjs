export default class CreateDeck {

  names = ['create deck [name]'];


  match({command, argument}){
    if( command.join(' ').startsWith('create deck') ){
      return true;
    }
  }

  async execute({command, argument}){
    const printer = await radio.request('printer');
    const avatar = await radio.request('avatar');

    const cardDeckName = command.slice(2).join(' ');
    await printer.info(`Creating a card deck named ${cardDeckName}!`)

    const deck = await this.state.deckManager.createDeck(cardDeckName);
    const indexCard = await this.state.deckManager.createCard('index');
    const location = await this.state.locationManager.getLocation();

    // freely manipulate the object
    location.data.contents.push(deck.meta.id);

    await this.state.locationManager.updateLocation(location);

    deck.data.contents.push(indexCard)
    await this.state.deckManager.updateDeck(deck);


  }

}
