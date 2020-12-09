class CalculatorController {
  constructor() {
    this._locale = 'pt-BR';
    this._operation = [0];
    this._display = document.querySelector('#display');
    this._time = document.querySelector('#hora');
    this._date = document.querySelector('#data');
    this.initializeDisplay();
    this.initializeButtons();
    this.initializeKeyBord();
  }

  initializeDisplay() {
    this.setDisplay();
    setInterval(() => this.setDisplay(), 1000);
    this.pasteFromClipboard();
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

  // copy display

  copyToClipboard() {
    console.log("Entrou no ctrl + c");
    let input = document.createElement('input');
    
    input.value = this.display.innerHTML;

    document.body.appendChild(input);

    input.select();

    document.execCommand('copy');

    input.remove();
  }

  // paste display

  pasteFromClipboard() {
    document.addEventListener('paste', (event) => {
      let text = event.clipboardData.getData('text');
      this.addOperation(+(text));
    });
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

  // adding event for keybord

  initializeKeyBord() {
    document.addEventListener('keyup', (event) => {
      console.log(event);
      switch (event.key) {
        case 'Escape':
          this.clearAll();
          break;
        case 'Backspace':
          this.clearEntry();
          break;

        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
          this.addOperation(event.key);
          break;

        case '.':
        case ',':
          this.addDot();
          break;
          
        case '=':
        case 'Enter':
          this.operationResult();
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
          this.addOperation(+event.key);
          break;

        case 'c':
          if(event.ctrlKey) this.copyToClipboard();
          break;
      }   
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
        this.addDot();
        break;
      case 'igual':
        this.operationResult();
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
    if(this._operation.length == 0)
      this._operation.push(0);
    this.display = this._operation.join('');
    console.log(this._operation);
  }

  operationResult() {
  if(this._operation.length >= 3) {
    let result;
    if(this._operation.includes('%')){
      result = this._operation[2] * this._operation[0] / 100;
    } else {
      result = eval(this._operation.join(''));
    }
    this._operation = [result];
    }
    this.setDisPlayCalculator(); 
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
    //console.log(this._operation);
    this.calc();
  }
  
  addDot() {

    let validDot = this.getLastOperation().toString().includes('.');

    if(!isNaN(this.getLastOperation()) && !validDot) {
      this._operation[this._operation.length - 1] = this.getLastOperation().toString() + ".";
      console.log(this._operation);
    }

    this.setDisPlayCalculator();
  }

  calc() {
    if(this._operation.length > 3) {
      let lastValue = this._operation.pop();
      let result;

      if(this._operation.includes('%')){
        result = this._operation[2] * this._operation[0] / 100
      } else {
        result = eval(this._operation.join(''));
      }
      this._operation = [result, lastValue];
    }
  }

  setDisPlayCalculator() {
    if(this._operation.join('').length > 10) {
      this.display = 'Not Support';
      return false;
    }
    
    this.display = this._operation.join('');
  }
  
  addOperation(value) {
    if(isNaN(value)){
      console.log('String: ' + value);
      if(isNaN(this.getLastOperation())) {
        this.concatString(value);
        console.log(this._operation);
      } else {
        this.pushInOperation(value);
        console.log(this._operation);
      }
    } else {
      console.log('Number: ' + value);
      if(isNaN(this.getLastOperation())) {
        this.pushInOperation(value);
        console.log(this._operation);
      } else {
        if(this.getLastOperation().toString().includes('.') && value === 0) {
          this._operation[this._operation.length - 1] = this._operation[this._operation.length - 1].toString() + value.toString();
          console.log(this._operation);
        } else {
          this.concatNumber(value);
          console.log(this._operation);
        }
      }
    }
    this.setDisPlayCalculator();
  }
}