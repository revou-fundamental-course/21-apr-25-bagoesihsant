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

function hasClass(elem, className) {
    return elem.className.split(" ").indexOf(className) > -1;
}

function calculateCelsiusToFahrenheit(tempDeg) {
    return (tempDeg * 9/5) + 32;
}

function calculateFahrenheitToCelsius(tempDeg) {
    return (tempDeg - 32) * 5/9;
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

    return alertBody;
}

// Main Function (temperature conversion)

btnConversion.onclick = (event) => { 

    // Prevent form from input
    event.preventDefault();

    // Check app current condition
    if (celsiusToFahrenheit) {

        tempDeg = inputCelsius.value;

        if (tempDeg === "") {
            alertDomain.appendChild(createError("Input kosong."));
            resetForm();
            return;
        }

        if (!degreeRegex.test(tempDeg)) {
            alertDomain.appendChild(createError("Input mengandung karakter illegal, harap masukkan hanya angka positif atau negatif."));
            resetForm();
            return;
        }

        if (isNaN(parseFloat(tempDeg))) {
            alertDomain.appendChild(createError("Input bukan angka"));
            resetForm();
            return;
        }

        resultTempDeg = calculateCelsiusToFahrenheit(parseFloat(tempDeg).toFixed(2));

        inputFahrenheit.value = parseFloat(resultTempDeg).toFixed(2);
        textAreaMethod.value = `(${tempDeg} ${degreeSymbol}C x 9/5) + 32 = ${resultTempDeg} ${degreeSymbol}F`

    } else {

        tempDeg = inputFahrenheit.value;

        if (tempDeg === "") {
            alertDomain.appendChild(createError("Input kosong."));
            resetForm();
            return;
        }

        if (!degreeRegex.test(tempDeg)) {
            alertDomain.appendChild(createError("Input mengandung karakter illegal, harap masukkan hanya angka positif atau negatif."));
            resetForm();
            return;
        }

        if (isNaN(parseFloat(tempDeg))) {
            alertDomain.appendChild(createError("Input bukan angka"));
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

document.addEventListener('click', (event) => {

    if (hasClass(event.target, 'alert-close')) {

        let alertNotif = event.target.parentElement.parentElement;

        event.target.onclick = () => {
            alertNotif.classList.toggle("closed");
        };

        setTimeout(() => { alertNotif.classList.toggle("closed"); }, 2000);

    };

});