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
      case 'igual':
        this.addOperationResult();
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

  // applying logic to insert number or operation

  clearAll() {
    this.display = this._operation = [0];
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
    this._operation[this._operation.length - 1] =  value;
  }
  pushInOperation(value) {
    this._operation.push(value);
    console.log(this._operation);
    if(this._operation.length > 3) {
      let lastValue = this._operation.pop();
      let auxEval = eval(this._operation.join(''));
      this._operation = [auxEval, lastValue];
    }
  }

  setDisPlayCalculator() {
    this.display = this._operation.join('');
  }
  
  addOperation(value) {
    if(isNaN(value)){
      if(isNaN(this.getLastOperation())) {
        this.concatString(value);
        console.log(this._operation);
      } else {
        this.pushInOperation(value);
        console.log(this._operation);
      }
    } else {
      if(isNaN(this.getLastOperation())) {
        this.pushInOperation(value);
        console.log(this._operation);
      } else {
        this.concatNumber(value);
        console.log(this._operation);
      }
    }
    this.setDisPlayCalculator();
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