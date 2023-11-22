import './style.css';
import './assets/images/icon-arrow.svg';
import './assets/images/favicon-32x32.png';
import InputValidation from "./input_validation.js";

const validInputs = new InputValidation;

class AgeCalculator{
  constructor() {
    this._userInputDay;
    this._userInputMonth;
    this._userInputYear;

    this.year;
    this.month;
    this.day;

    document.querySelectorAll('form').forEach(form => form.addEventListener('submit', this._setInput.bind(this)));
  }

  _init() {
    this.year = this._ageYear();
    this.month = this._ageMonth();
    this.day = this._ageDay();
    this._render();
    // console.log(`result: ${this.year} year, ${this.month} month and ${this.day} days`)
  }

  _setInput() {
    if(validInputs.inputDate == ''){
      console.log('invalid!')
      return;
    } else {
      this._userInputDay = validInputs.inputDate[0];
      this._userInputMonth = validInputs.inputDate[1];
      this._userInputYear = validInputs.inputDate[2];
      
      //start calculation methods
      this._init();
    }
  }
  
  _inputMilliseconds() {
    return new Date(`${this._userInputYear}-${this._userInputMonth}-${this._userInputDay}`).getTime();
  }

  //Calculation methods

  _totalMillisecondsDiff() {
    return Date.now() - this._inputMilliseconds();
  }

  _ageYear() {
    return Math.floor(this._totalMillisecondsDiff() / (1000*3600*24*365));
  }

  _ageMonth() {
    const totalDaysLeft = Math.floor((this._totalMillisecondsDiff() % (1000*3600*24*365) / (1000*3600*24)));
    return Math.floor(totalDaysLeft/30);
  }

  _ageDay() {
    const totalDaysLeft = Math.floor((this._totalMillisecondsDiff() % (1000*3600*24*365) / (1000*3600*24)));
    return Math.floor(totalDaysLeft%30);
  }

  _totalMonthsDiff() {
    return this._ageMonth() + (this._ageYear()*12);
  }

  _totalDaysDiff() {
    return (this._totalMonthsDiff()*30) + this._ageDay;
  }

  //UI update
  _render() {
    const resultYear = document.querySelector('.result-number-year');
    const resultMonth = document.querySelector('.result-number-month');
    const resultDay = document.querySelector('.result-number-day');

    resultYear.textContent = this.year;
    resultMonth.textContent = this.month;
    resultDay.textContent = this.day;
  }

}

const App = new AgeCalculator;

// (1000 * 60 * 60 * 24 * 365) milliseconds = 1 year
// (1000 * 60*60* 24) milliseconds = 1 day
