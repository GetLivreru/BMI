document.addEventListener('DOMContentLoaded', function() {
  const bmiForm = document.getElementById('bmiForm');
  const resultDiv = document.getElementById('resultDiv');
  

  bmiForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

  
    // Rest of the code for calculating BMI and displaying the result
const bmi = weight / (height * height);
resultDiv.textContent = 'Your BMI is: ' + bmi.toFixed(2);
  });
});