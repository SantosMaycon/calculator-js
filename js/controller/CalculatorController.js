class CalculatorController {
  constructor() {
    this._display = document.querySelector('#display');
    this._time = document.querySelector('#hora');
    this._date = document.querySelector('#data');
    this._locale = 'pt-BR';
    this.initializeDisplay();
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
}