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
const degreeRegex = /^[\d\-.]+$/;

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

        if (tempDeg === "") {
            console.log("Input is empty.");
            resetForm();
            return;
        }

        if (!degreeRegex.test(tempDeg)) {
            console.log("Input contain illegal character(s), plase input positive/negative number only.");
            resetForm();
            return;
        }

        if (isNaN(parseFloat(tempDeg))) {
            console.log("Input is not a number.");
            resetForm();
            return;
        }

        resultTempDeg = calculateCelsiusToFahrenheit(parseFloat(tempDeg).toFixed(2));

        inputFahrenheit.value = parseFloat(resultTempDeg).toFixed(2);
        textAreaMethod.value = `(${tempDeg} ${degreeSymbol}C x 9/5) + 32 = ${resultTempDeg} ${degreeSymbol}F`

    } else {

        tempDeg = inputFahrenheit.value;

        if (tempDeg === "") {
            console.log("Input is empty.");
            resetForm();
            return;
        }

        if (!degreeRegex.test(tempDeg)) {
            console.log("Input contain illegal character(s), plase input positive/negative number only.");
            resetForm();
            return;
        }

        if (isNaN(parseFloat(tempDeg))) {
            console.log("Input is not a number.");
            resetForm();
            return;
        }

        resultTempDeg = calculateFahrenheitToCelsius(parseFloat(tempDeg).toFixed(2));

        inputCelsius.value = parseFloat(resultTempDeg).toFixed(2);
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

        // Change enabled input
        inputCelsius.disabled = true;
        inputFahrenheit.disabled = false;

        // Reverse input(s) position.
        formCalculator.removeChild(inputGroupCelsius);
        formCalculator.removeChild(inputGroupFahrenheit);

        formCalculator.insertBefore(inputGroupFahrenheit, formButtonGroup);
        formCalculator.insertBefore(inputGroupCelsius, textAreaGroup);


    } else {
        celsiusToFahrenheit = true;

        // Change enabled input
        inputCelsius.disabled = false;
        inputFahrenheit.disabled = true;

        // Reverse input(s) position.
        formCalculator.removeChild(inputGroupCelsius);
        formCalculator.removeChild(inputGroupFahrenheit);

        formCalculator.insertBefore(inputGroupCelsius, formButtonGroup);
        formCalculator.insertBefore(inputGroupFahrenheit, textAreaGroup);

    }
};