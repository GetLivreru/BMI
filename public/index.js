document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const resultDiv = document.getElementById('resultDiv');
  
    bmiForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = new FormData(bmiForm);
      fetch('/bmicalculator', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Display BMI result and interpretation
        resultDiv.innerHTML = `BMI: ${data.bmi}<br>Interpretation: ${data.interpretation}`;
      })
      .catch(error => console.error('Error:', error));
    });
  });
  