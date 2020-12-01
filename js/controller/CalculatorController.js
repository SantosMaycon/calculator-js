class CalculatorController {
  constructor() {
    this._locale = 'pt-BR';
    this._operation = [0];
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

  // adding click event on the buttons

  initializeButtons() {
    let buttons = document.querySelectorAll('#buttons > g, #parts > g');
    
    const eventListeners = ['click', 'drag'];
    const eventListenersPointers = ['mouseover', 'mouseup', 'mousedown'];

    eventListeners.forEach( (eventListener) => {
      buttons.forEach((button) =>  button.addEventListener(eventListener, () =>{
        let buttonValue = button.className.baseVal.replace('btn-','');
        this.optionExecuted(buttonValue);
        console.log(buttonValue);
      }));
    });
    
    eventListenersPointers.forEach( (pointer) => {
      buttons.forEach((button) =>  button.addEventListener(pointer, () => {
        button.style.cursor = 'pointer';
      }));
    })
  }

  // switch case logic

  optionExecuted(value){
    switch (value) {
      case 'ac':
        this.clearAll();
        break;
      case 'ce':
        this.clearEntry();
        break;
      case 'soma':
        this.addOperation("+");
        break;
      case 'subtracao':
        this.addOperation('-');
        break;
      case 'multiplicacao':
        this.addOperation('*');
        break;
      case 'divisao':
        this.addOperation('/');
        break;
      case 'porcento':
        this.addOperation('%');
        break;
      case 'ponto':
        this.addOperation('.');
        break;
      
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(+value);
        break;
      
      default:
        this.setError();
        break;
    }
  }

  clearAll() {
    this._operation = [0];
  }

  clearEntry() {
    this._operation.pop();
  }

  setError() {
    this.displayCalc = 'Error';
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  concatNumber(value) {
    this._operation[this._operation.length - 1] = +(this._operation[this._operation.length - 1].toString() + value.toString());
  }
  
  concatString(value) {
    this._operation[this._operation.length - 1] = this._operation[this._operation.length - 1].toString() + value.toString();
  }

  
  addOperation(value) {
    if(isNaN(value)){
      if(isNaN(this.getLastOperation())) {
        console.log("Valor passado é String");
        console.log("Valor anterior é String");
        console.log("Vou concatenar o valor anterior")
        this.concatString(value);
      } else {
        console.log("Valor passado é String");
        console.log("Valor anterior é Number");
        console.log("Vou utilizar o metodo Push!");
        this._operation.push(value);
        console.log(this._operation);
      }
    } else {
      if(isNaN(this.getLastOperation())) {
        console.log("Valor passado é Number");
        console.log("Valor anterior é String");
        console.log("Vou utilizar o metodo Push!");
        this._operation.push(value);
        console.log(this._operation);
      } else {
        console.log("Valor passado é Number");
        console.log("Valor anterior é Number");
        console.log("Vou concatenar o valor anterior");
        this.concatNumber(value);
        console.log(this._operation);
      }
    }
  }
  
}












































  // addOperation(value) {
  //   if(isNaN(value)) {
  //     // Value is a string
  //     if(!isNaN(this.getLastOperation)){
  //       // The last value is number
  //       this._operation.push(value);
  //       console.log(this._operation);
  //     } else {
  //       // The last value is string
  //       this.concatString(value);
  //       console.log(this._operation);
  //     }
  //   } else {
  //     // Value is a number
  //     if(!isNaN(this.getLastOperation)){
  //       // The last value is number
  //       this.concatNumber(value);
  //       console.log(this._operation);
  //     } else {
  //       // The last value is string
  //       this._operation.push(value);
  //       console.log(this._operation);
  //     }
  //   }
  // }