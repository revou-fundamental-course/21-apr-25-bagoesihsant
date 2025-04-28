console.log("File connected");

// Get HTML Elements

// Form Elements
let formCalculator = document.getElementById("form-calc-suhu");

let inputCelsius = document.getElementById("txt-input-celsius");
let inputGroupCelsius = document.getElementById("input-celsius");

let inputFahrenheit = document.getElementById("txt-input-fahrenheit");
let inputGroupFahrenheit = document.getElementById("input-fahrenheit");

let formButtonGroup = document.getElementById("btn-group");

let textAreaMethod = document.getElementById("txt-calc-method");
let textAreaGroup = document.getElementById("calc-method");

// Form Buttons
let btnConversion = document.getElementById("convert");
let btnReset = document.getElementById("reset");
let btnReverse = document.getElementById("reverse");

// Result Variables
let tempDeg;
let resultTempDeg;

// Set app condition
let celsiusToFahrenheit = true;

// Miscellaneous Variable(s)
const degreeSymbol = String.fromCharCode(176);

// Function(s)

function resetForm() {
    inputCelsius.value = "";
    inputFahrenheit.value = "";
    textAreaMethod.value = "";

    tempDeg = undefined;
    resultTempDeg = undefined;
}

function calculateCelsiusToFahrenheit(tempDeg) {
    return (tempDeg * 9/5) + 32;
}

function calculateFahrenheitToCelsius(tempDeg) {
    return (tempDeg - 32) * 5/9;
}

btnConversion.onclick = (event) => { 

    // Prevent form from input
    event.preventDefault();

    

    // Check app current condition
    if (celsiusToFahrenheit) {

        tempDeg = inputCelsius.value;
        resultTempDeg = calculateCelsiusToFahrenheit(tempDeg);

        inputFahrenheit.value = resultTempDeg;
        textAreaMethod.value = `(${tempDeg} ${degreeSymbol}C x 9/5) + 32 = ${resultTempDeg} ${degreeSymbol}F`

    } else {

        tempDeg = inputFahrenheit.value;
        resultTempDeg = calculateFahrenheitToCelsius(tempDeg);

        inputCelsius.value = resultTempDeg;
        textAreaMethod.value = `(${tempDeg} ${degreeSymbol}F - 32) * 5/9 = ${resultTempDeg} ${degreeSymbol}C`;

    }

};

btnReset.onclick = (event) => { 
 
    // Prevent form from input
    event.preventDefault();

    resetForm();
}

btnReverse.onclick = (event) => { 

    // Prevent form from input
    event.preventDefault();

    // Change current app condition
    if (celsiusToFahrenheit) {
        celsiusToFahrenheit = false;

        inputCelsius.disabled = true;
        inputFahrenheit.disabled = false;

        formCalculator.removeChild(inputGroupCelsius);
        formCalculator.removeChild(inputGroupFahrenheit);

        formCalculator.insertBefore(inputGroupFahrenheit, formButtonGroup);
        formCalculator.insertBefore(inputGroupCelsius, textAreaGroup);


    } else {
        celsiusToFahrenheit = true;

        inputCelsius.disabled = false;
        inputFahrenheit.disabled = true;

        formCalculator.removeChild(inputGroupCelsius);
        formCalculator.removeChild(inputGroupFahrenheit);

        formCalculator.insertBefore(inputGroupCelsius, formButtonGroup);
        formCalculator.insertBefore(inputGroupFahrenheit, textAreaGroup);

    }
};