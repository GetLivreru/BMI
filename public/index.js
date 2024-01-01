document.addEventListener('DOMContentLoaded', function () {
  const bmiForm = document.getElementById('bmiForm');
  const resultDiv = document.getElementById('resultDiv');

  bmiForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const heightInput = document.getElementById('height');
      const weightInput = document.getElementById('weight');

      const height = parseFloat(heightInput.value);
      const weight = parseFloat(weightInput.value);

      const bmi = weight / (height * height);

      // Отправка синхронного запроса на сервер
      const response = await fetch('/bmicalculator', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
              height: height,
              weight: weight,
              age: document.getElementById('age').value,
              gender: document.getElementById('gender').value,
              unit: document.getElementById('measurementSystem').value
          }),
      });

      // Обработка ответа и обновление содержимого страницы
      const resultHTML = await response.text();
      resultDiv.innerHTML = resultHTML;
  });
});
