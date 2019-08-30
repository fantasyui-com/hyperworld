# HyperWorld OOP Language
Virtual World of Objects.

![screenshot](screenshot.png)
![screenshot-robots](screenshot-robots.png)
![screenshot-command](screenshot-command.png)
![screenshot-login](screenshot-login.png)
![screenshot-browser](screenshot-browser.png)
![screenshot-conversation](screenshot-conversation.png)

## World Structure
- Universe is made up of Locations
- Location contain interactive Agents/Robots

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

## Developer Notes
- Custom Element's Sub Elements must be registered AFTER the Main Custom Element calls customElements.define(...);

## Todo
- Robot
- Insert a command processor where the search box is
- Initialize Robots - Robots are the Primary way of Interacting with System

## Press
- Project name is: HyperWorld (One word, both Hyper and World are capitalized)
- NPM Location: https://www.npmjs.com/package/hyperworld
- GitHub Location: https://github.com/fantasyui-com/hyperworld#readme

## Administration
- Define Components before defining sub Components
- do not use shorthand ```<tag/>``` use the full thing.

## Notes

- robotiq
- <script src="https://unpkg.com/lit-html/lit-html.js"></script>
- z circle ui
