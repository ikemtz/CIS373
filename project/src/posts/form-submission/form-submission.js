/*
    Isaac Martinez
    1/27/2020
    Week #4
    Web Design and Development (CIS373002VA016-1202-001)
*/
var fields = [
  'firstName',
  'lastName',
  'dateOfBirth',
  'email',
  'phoneNumber',
  'country',
  'comment'
];

function submitFormData() {
  var formResult = {};
  var isFormValid = true;
  fields.forEach(field => {
    var element = document.getElementById(field);
    formResult[field] = element.value;
    isFormValid &= element.validity.valid;
  });
  var resultSpan = document.getElementById("result");
  resultSpan.innerText = JSON.stringify(formResult);
  var msg = `Form is ${isFormValid ? 'valid' : 'invalid'}.`;
  alert(msg);
}
