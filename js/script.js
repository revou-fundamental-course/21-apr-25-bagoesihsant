console.log("File connected");

// Get HTML Elements
let triviaSection = document.getElementById("trivia-section");
let alertDomain = document.getElementById("alert-domain");

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
let tempDeg = undefined;
let resultTempDeg = undefined;

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

function validate(tempDeg) {
    if (tempDeg === "") {
        alertDomain.appendChild(createError("Input kosong."));
        resetForm();
        return false;
    };

    if (tempDeg === undefined) {
        alertDomain.appendChild(createError("Input kosong."));
        resetForm();
        return false;
    }

    if (!degreeRegex.test(tempDeg)) {
        alertDomain.appendChild(createError("Input mengandung karakter illegal, harap masukkan hanya angka positif atau negatif."));
        resetForm();
        return false;
    };

    if (isNaN(parseFloat(tempDeg))) {
        alertDomain.appendChild(createError("Input bukan angka"));
        resetForm();
        return false;
    };

    return true;
}

function hasClass(elem, className) {
    return elem.className.split(" ").indexOf(className) > -1;
}

function formulaCelsiusToFahrenheit(tempDeg) {
    return (tempDeg * 9/5) + 32;
}

function formulaFahrenheitToCelsius(tempDeg) {
    return (tempDeg - 32) * 5/9;
}

function calculateCelsiusToFahrenheit() {
    tempDeg = inputCelsius.value;

    if(!validate(tempDeg)){ return; };

    resultTempDeg = formulaCelsiusToFahrenheit(parseFloat(tempDeg).toFixed(2));

    inputFahrenheit.value = parseFloat(resultTempDeg).toFixed(2);
    textAreaMethod.value = `(${tempDeg}${degreeSymbol}C x 9/5) + 32 = ${parseFloat(resultTempDeg).toFixed(2)} ${degreeSymbol}F`;
}

function calculateFahrenheitToCelsius() {
    tempDeg = inputFahrenheit.value;

    if(!validate(tempDeg)){ return; };

    resultTempDeg = formulaFahrenheitToCelsius(parseFloat(tempDeg).toFixed(2));

    inputCelsius.value = parseFloat(resultTempDeg).toFixed(2);
    textAreaMethod.value = `(${tempDeg}${degreeSymbol}F - 32) * 5/9 = ${parseFloat(resultTempDeg).toFixed(2)} ${degreeSymbol}C`;
}

function closeNotif(element) {
    element.classList.toggle("closed");
}

function createError(errorMessage) {

    // Alert Notifications Body
    let alertBody = document.createElement("div");
    alertBody.className = "alert-notif";

    // Alert Header
    let alertHeader = document.createElement("div");
    alertHeader.className = "alert-header";

    // Error Symbol
    let alertErrorSymbol = document.createElement("i");
    alertErrorSymbol.className = "error";
    alertErrorSymbol.textContent = String.fromCharCode(9888);

    // Alert Title
    let alertTitle = document.createElement("p");
    alertTitle.className = "alert-title";
    alertTitle.textContent = "Warning";
    
    // Close Symbol
    let alertCloseSymbol = document.createElement("i");
    alertCloseSymbol.className = "alert-close";
    alertCloseSymbol.textContent = String.fromCharCode(88);

    // Alert Body
    let alertNotifBody = document.createElement("div");
    alertNotifBody.className = "alert-body";

    // Alert Text
    let alertNotifyText = document.createElement("p");
    alertNotifyText.className = "alert-text";
    alertNotifyText.textContent = errorMessage;

    // Assembling
    alertNotifBody.appendChild(alertNotifyText);

    alertHeader.appendChild(alertErrorSymbol);
    alertHeader.appendChild(alertTitle);
    alertHeader.appendChild(alertCloseSymbol);

    alertBody.appendChild(alertHeader);
    alertBody.appendChild(alertNotifBody);

    alertCloseSymbol.onclick = () => {
        alertBody.classList.toggle("closed"); 
    };

    setTimeout(() => {
        alertBody.classList.toggle("closed");
        setTimeout(() => { 
            alertDomain.removeChild(alertBody);  
        }, 1000);
    }, 3000);

    return alertBody;
}

// Main Function (temperature conversion)

btnConversion.onclick = (event) => { 

    // Prevent form from input
    event.preventDefault();

    // Check app current conditions
    if (celsiusToFahrenheit) {

        calculateCelsiusToFahrenheit();

    } else {

        calculateFahrenheitToCelsius();

    };

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

        // Fahrenheit to Celsius
        celsiusToFahrenheit = false;

        // Change enabled input
        inputCelsius.disabled = true;
        inputFahrenheit.disabled = false;

        // Reverse input(s) position.
        formCalculator.removeChild(inputGroupCelsius);
        formCalculator.removeChild(inputGroupFahrenheit);

        formCalculator.insertBefore(inputGroupFahrenheit, formButtonGroup);
        formCalculator.insertBefore(inputGroupCelsius, textAreaGroup);

        // Validation and Extra Calculations
        if (inputFahrenheit.value === "") {
            resetForm();
            return;
        }else {
            calculateFahrenheitToCelsius();
        };

        textAreaMethod.value = `(${parseFloat(resultTempDeg).toFixed(2)}${degreeSymbol}F - 32) * 5/9 = ${tempDeg} ${degreeSymbol}C`;


    } else {

        // Celsius to Fahrenheit
        celsiusToFahrenheit = true;

        // Change enabled input
        inputCelsius.disabled = false;
        inputFahrenheit.disabled = true;

        // Reverse input(s) position.
        formCalculator.removeChild(inputGroupCelsius);
        formCalculator.removeChild(inputGroupFahrenheit);

        formCalculator.insertBefore(inputGroupCelsius, formButtonGroup);
        formCalculator.insertBefore(inputGroupFahrenheit, textAreaGroup);

        if (inputCelsius.value === "") {
            resetForm();
            return;
        } else {
            calculateCelsiusToFahrenheit();
        };

        textAreaMethod.value = `(${parseFloat(resultTempDeg).toFixed(2)}${degreeSymbol}C x 9/5) + 32 = ${tempDeg} ${degreeSymbol}F`;

    }
};

// Secondary function (animation, design, and miscellaneous thing(s))

let triviaTitle = triviaSection.getElementsByClassName("trivia-title");

for (let triviaIndex = 0; triviaIndex < triviaTitle.length; triviaIndex++) {
    
    let arrowsDetail = triviaTitle[triviaIndex].getElementsByClassName("arrow");
    let bodysDetail = triviaTitle[triviaIndex].getElementsByClassName("body");

    triviaTitle[triviaIndex].onclick = (event) => {
        bodysDetail[0].classList.toggle("open");
        arrowsDetail[0].classList.toggle("rotate");
    };

};