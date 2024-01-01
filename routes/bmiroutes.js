const express = require('express');
const router = express.Router();

function calculateBMI(height, weight, age, unit) {
  
    if(unit == 'imperial'){
    height = height * 2.54
    weight = weight / 2.205
  }

  const heightInMeters = height / 100; // Convert height to meters
  bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2)
  if (age !== null) {
    if (age > 35) {
        bmi += 0.25;
    } else if (age > 45) {
        bmi += 0.5;
    } else if (age > 55) {
        bmi += 0.75;
    } else if (age > 60) {
        bmi += 1;
    }
}
  return bmi; 

}

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './views' });
});

router.post('/bmicalculator', (req, res) => {
  const { height, weight, age, gender, unit } = req.body;
  
  const calculatedBMI = calculateBMI(height, weight, age, unit);

  
  let interpretation = 'Normal weight';

  if (gender == "Male"){
    if (calculatedBMI <= 20){
        interpretation = 'Underweight'
    }
    else if (calculatedBMI <= 25){
        interpretation = 'Normal weight'
    }
    else if (calculatedBMI <= 30){
        interpretation = 'Overweight'
    }
    else  {
        interpretation = 'Obese'
    }
  }

  if (gender == "Female"){
    if (calculatedBMI <= 19){
        interpretation = 'Underweight'
    }
    else if (calculatedBMI <= 24){
        interpretation = 'Normal weight'
    }
    else if (calculatedBMI <= 30){
        interpretation = 'Overweight'
    }
    else  {
        interpretation = 'Obese'
    }
  }

  const result = {
    bmi: calculatedBMI,
    interpretation: interpretation
  };

  res.send(result);
});

module.exports = router;