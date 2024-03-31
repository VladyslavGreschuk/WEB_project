const form = document.getElementById('surveyForm');


function saveToLocalStorage() {
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach(function(value, key) {
        if (key === 'taxNews') {
            formObject[key] = Array.isArray(formObject[key]) ? [...formObject[key], value] : [value];
        } else {
            formObject[key] = value;
        }
    });

    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    surveys.push(formObject);
    localStorage.setItem('surveys', JSON.stringify(surveys));
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    saveToLocalStorage();
    alert('Дякуємо за участь у опитуванні!');
    this.reset();
});

const rangeInput = document.getElementById('mark');
const outputValue = document.getElementById('markValue');

rangeInput.addEventListener('input', function() {
    outputValue.textContent = this.value;
});

const surveys = JSON.parse(localStorage.getItem('surveys')) || [];

function displayFilteredSurveys() {
    const markFilter = document.getElementById('markFilter').value;
    const othersFilter = document.getElementById('othersFilter').value.toLowerCase();
    const gainFilter = document.getElementById('gainFilter').value;

    const filteredSurveys = surveys.filter(function(survey) {
        return (survey.mark >= markFilter || markFilter === '') &&
            (survey.others.toLowerCase().includes(othersFilter) || othersFilter === '') &&
            (survey.gain === gainFilter || gainFilter === '');
    });

    console.log(filteredSurveys);
  
}


document.getElementById('markFilter').addEventListener('change', displayFilteredSurveys);
document.getElementById('othersFilter').addEventListener('input', displayFilteredSurveys);
document.getElementById('gainFilter').addEventListener('change', displayFilteredSurveys);

