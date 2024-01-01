const express = require('express');
const router = express.Router();

function calculateBMI(height, weight, age, unit) {
    if (unit === 'imperial') {
        height = height * 2.54;
        weight = weight / 2.205;
    }

    const heightInMeters = height / 100; // Convert height to meters
    let bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    if (age !== null) {
        if (age > 35) {
            bmi = (parseFloat(bmi) + 0.25).toFixed(2);
        } else if (age > 45) {
            bmi = (parseFloat(bmi) + 0.5).toFixed(2);
        } else if (age > 55) {
            bmi = (parseFloat(bmi) + 0.75).toFixed(2);
        } else if (age > 60) {
            bmi = (parseFloat(bmi) + 1).toFixed(2);
        }
    }

    return bmi;
}

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: './views' });
});
// DB LOGIC
const historyFilePath = __dirname + "/public/database/history.json";

function readHistory() {
    try {
        const historyData = fs.readFileSync(historyFilePath, "utf8");
        return JSON.parse(historyData);
    } catch (error) {
        return [];
    }
}

function saveHistory(history) {
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), "utf8");
}

router.post('/bmicalculator', (req, res) => {
    const { height, weight, age, gender, unit } = req.body;

    // Валидация роста и веса
    if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
        return res.sendFile('error.html', { root: './views' });
    }

    const calculatedBMI = calculateBMI(height, weight, age, unit);

    let interpretation = 'Нормальный вес';

    if (gender === 'Male') {
        if (calculatedBMI <= 20) {
            interpretation = 'Недостаточный вес';
        } else if (calculatedBMI <= 25) {
            interpretation = 'Нормальный вес';
        } else if (calculatedBMI <= 30) {
            interpretation = 'Избыточный вес';
        } else {
            interpretation = 'Ожирение';
        }
    }

    if (gender === 'Female') {
        if (calculatedBMI <= 19) {
            interpretation = 'Недостаточный вес';
        } else if (calculatedBMI <= 24) {
            interpretation = 'Нормальный вес';
        } else if (calculatedBMI <= 30) {
            interpretation = 'Избыточный вес';
        } else {
            interpretation = 'Ожирение';
        }
    }

    const result = {
        bmi: calculatedBMI,
        interpretation: interpretation
    };

    res.send(result);
});

module.exports = router;
