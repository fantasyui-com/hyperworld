# HyperWorld OOP Language
Virtual World of Objects.

## Development Screen Shots
![screenshot](screenshot.png)
![screenshot-borders](screenshot-borders.png)
![screenshot-robots](screenshot-robots.png)
![screenshot-command](screenshot-command.png)
![screenshot-login](screenshot-login.png)
![screenshot-browser](screenshot-browser.png)
![screenshot-conversation](screenshot-conversation.png)

## World Structure
- Universe is made up of Locations
- Location contain interactive Agents/Robots


## Processing Humans - a simple approach to AI

When a robot asks a question, the question is paired with pre-set anwsers:
For example: "How are you?: [Great!]/[Awful]", or "Do you want to schedule an appointment?: [Yes]/[No]"
![processing-humans.png](processing-humans.png)

## Interactive Components and the USE command

A world needs to engage the user, a robot may ask "How are you?: [Great!]/[Awful]", or "Do you want to schedule an appointment?: [Yes]/[No]"
(note that questions are coupled with pre-set answers to sidestep parsing)

A music player may print "Which song do you want to play? [Hey There]/[The Hork Song]" these are the fundamental OBJECTS in HyperWorld small
stateful finite XML node driven state machines. Beyond that it is just Locations and Locations within Locations ad Infinitum.

Primary mode of interacting with State Machines is the use command.
For example to log into the system the user will state:

    use login machine

To tweet from within the system the user can:

    use twitter send 'I hate this.'

## Press
- Project name is: HyperWorld (One word, both Hyper and World are capitalized)
- [NPM Package](https://www.npmjs.com/package/hyperworld)
- [GitHub Repository](https://github.com/fantasyui-com/hyperworld)


## Developer Notes

(developer note: use Atom's markdown preview plus plugin to navigate links below)

## Todo

- do not use shorthand ```<tag/>``` use the full <tag></tag> markup.
- research z-circle-ui
- robotiq state machine components
- Web Components feel fickle, need a debug tool.

### State Machine Components (was known as Robot)

- Here is the state machine front-end: [Commands/Machine](src/organization/node_modules/Commands/node_modules/Machine/index.mjs)
- State machine UI is driven by [JSON Screen Printer](src/organization/node_modules/Screen/Printer/Json.mjs)
- Decide what to do when a component Promise expires in [JSON Screen Printer](src/organization/node_modules/Screen/Printer/Json.mjs)'s Input and Select. Note: the try/catch is located in the [Commands/Machine](src/organization/node_modules/Commands/node_modules/Machine/index.mjs)
- FINISH: [Select Component](public/modules/select-component/index.js)
- Initialize Robots - Robots are the Primary way of Interacting with System
  - while the system is operational it should really be run by a subsystem
    that employs XML to create the State Machine Tree Structure.
- upgrade the ```USE``` command
- REVIEW: [Input Component](public/modules/input-component/index.js)
