const presentDate = new Date();
const presentYear = presentDate.getFullYear();
const presentMonth = presentDate.getMonth(); //Note: zero index!
const presentDay = presentDate.getDate();

class InputValidation {
  constructor() {
    this._inputValues = [];

    //Update the max value of year input to currentYear
    document.getElementById('input-year').max = presentYear;

    document.querySelectorAll('form').forEach(form => form.addEventListener('submit', this._pushInputDate.bind(this)));
    document.querySelector('#input-day').addEventListener('change', this._checkInput.bind(this, 'day'));
    document.querySelector('#input-month').addEventListener('change', this._checkInput.bind(this, 'month'));
    document.querySelector('#input-year').addEventListener('change', this._checkInput.bind(this, 'year'));
  }
  
  _checkInput(inputType, e) {
    const errorText = document.querySelector(`.error-text-${inputType}`);
    const labelText = document.querySelector(`.label-text-${inputType}`);

    const inputMonth = document.getElementById('input-month');
    const inputDay = document.getElementById('input-day');

    inputMonth.max = 12;
    inputDay.max = 31;
    this._checkMonthsWith30days();
    if(!e.target.checkValidity()) {
      labelText.classList.add('invalid');
      errorText.style.display = 'block';
    } else {
      errorText.style.display = 'none';
      labelText.classList.remove('invalid');
    }
  }

  _checkMonthsWith30days() {
    //check for months having 30 days
    //Sep(9), April(4), June(6), Nov(11)
    const monthInput = document.getElementById('input-month');
    const dayInput = document.getElementById('input-day');
    const yearInput = document.getElementById('input-year');

    switch (+monthInput.value) {
      case 9: //September
        dayInput.max = 30;
        break;
      case 4: //April
        dayInput.max = 30;
        break;
      case 6: //June
        dayInput.max = 30;
        break;
      case 11: //November
        dayInput.max = 30;
        break;
      case 2: //February
      //check for leap year
        ((yearInput.value % 4 == 0) && (yearInput.value % 100 != 0) || (yearInput.value % 400 == 0) ) ? dayInput.max = 29 : dayInput.max = 28;
        break;
      default:
        dayInput.max = 31;
        break;
    }
  }

  _isCurrentDate(inputYear, inputMonth, inputDay){
    if(inputYear == presentYear) {
      if(inputMonth > presentMonth && inputDay > presentDay){
        return true;
      }
    } else {
      return false;
    }
  }
  
  _pushInputDate(e) {
    const inputYear = document.getElementById('input-year');
    const inputMonth = document.getElementById('input-month');
    const inputDay = document.getElementById('input-day');
    e.preventDefault();
    
    if(!this._isCurrentDate(inputYear.value, inputMonth.value, inputDay.value)){
      const inputFields = document.querySelectorAll('.input-fields');
      this._inputValues = [];
      inputFields.forEach(input => this._inputValues.push(+input.value));
      inputFields.forEach(input => input.value = '');
      this.inputDate;
    } else {
      alert('Were you born in the future 🤔 ?');
      inputMonth.max = presentMonth + 1;
      inputMonth.value = presentMonth + 1;  
      inputDay.max = presentDay;
      inputDay.value = presentDay;
      inputYear.value = presentYear;
      return;
    }
  }

  get inputDate() {
    return this._inputValues;
  }
}


export default InputValidation;