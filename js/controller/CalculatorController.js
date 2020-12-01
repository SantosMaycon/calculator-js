class CalculatorController {
  constructor() {
    this._locale = 'pt-BR';
    this._operation = [];
    this._display = document.querySelector('#display');
    this._time = document.querySelector('#hora');
    this._date = document.querySelector('#data');
    this.initializeDisplay();
    this.initializeButtons();
  }

  initializeDisplay() {
    this.setDisplay();
    setInterval(() => this.setDisplay(), 1000);
  }

  setDisplay() {
    this.currentDate = new Date().toLocaleDateString(this._locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    this.currentTime = new Date().toLocaleTimeString(this._locale);
  }

  get display() {
    return this._display;
  }

  set display(value) {
    this._display.innerHTML = value;
  }

  get currentTime() {
    return this._time;
  }

  set currentTime(value) {
    this._time.innerHTML = value;
  }

  get currentDate() {
    return this._date;
  }

  set currentDate(value) {
    this._date.innerHTML = value;
  }

  // calculator logic

  initializeButtons() {
    let buttons = document.querySelectorAll('#buttons > g, #parts > g');
    
    const eventListeners = ['click', 'drag'];
    const eventListenersPointers = ['mouseover', 'mouseup', 'mousedown'];

    eventListeners.forEach( (eventListener) => {
      buttons.forEach((button) =>  button.addEventListener(eventListener, () =>{
        let buttonValue = button.className.baseVal.replace('btn-','');
        console.log(buttonValue);
      }));
    });
    
    eventListenersPointers.forEach( (pointer) => {
      buttons.forEach((button) =>  button.addEventListener(pointer, () => {
        button.style.cursor = 'pointer';
      }));
    })
  }
}