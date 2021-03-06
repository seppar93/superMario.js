const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
  constructor() {

    this.keyStates = new Map();
    // ^hold the given state of a given key

    this.keyMap = new Map();
    // ^^ holds the call back function for a given key code

  }

  addMapping(keyCode, callback) {
    this.keyMap.set(keyCode, callback);
  }

  handleEvent(event) {
    const { keyCode } = event;

    if (!this.keyMap.has(keyCode)) {
      return;
      // ^^ keeps track of what we have mapped and if not prevents it 

    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);
    console.log(this.keyStates);

    this.keyMap.get(keyCode)(keyState);
  }

  listenTo(window) {
    ['keydown', 'keyup'].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    });
  }
}