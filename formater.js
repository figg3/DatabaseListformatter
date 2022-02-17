const butonFormat = document.querySelector('#buton-format');
const butonFormatCopy = document.querySelector('#buton-format-copy');
const butonClear = document.querySelector('#buton-clear');
const hidelink = document.querySelector('#show-example');
const darkmode = document.querySelector('#set-darkmode');
const textContainer = document.querySelector('#text-container');
const inputContainer = document.querySelector('#input-container');
const textArea = document.querySelector('#text-format');
let howTo = document.querySelector('#how-to');
let result = document.querySelector("#result-formater");
let dataToFormat = document.querySelector("#text-format");



// main function
const formatData = function (copy) {
    let resultArray = [];
    let valueAsArray = "";
    let inputType = document.querySelector('input[name="input-typ"]:checked').value;
    result.innerHTML = '';

        // Use split based on selected separator
        let inputBreak = document.querySelector('input[name="input-typ-lb"]:checked').value;
        if(inputBreak == 'lb')
            valueAsArray = dataToFormat.value.trim().split('\n'); 
        else if(inputBreak == 'space')
            valueAsArray = dataToFormat.value.trim().split(' '); 
        else
            valueAsArray = dataToFormat.value.trim().split(/\n| /); 


    // loop the values if the array, treating them differently based on type (string or int)
    valueAsArray.forEach(element => {
        if (inputType == 'string') {
            resultArray.push(`'${element.trim()}'`);
        } else {
            resultArray.push(element.trim());
        }
    })

    // variables used in the loop
    let counter = 0;
    let length = resultArray.length;

    // loop all of the array elements and print them 
    resultArray.forEach(element => {
        counter++;

        // Create elements needed to format with colors
        let startText = document.createElement("span");
        let startTag = document.createElement("span");
        let endText = document.createElement("span");
        let orangeText = document.createElement("span");
        let separator = document.createElement("span");

        // add the css class 
        startText.classList.add('green-text')
        endText.classList.add('seporator')
        separator.classList.add('seporator')
        startTag.classList.add('seporator')
        orangeText.classList.add('orange-text')

        // set the values of the elements 
        startText.innerHTML = `\xA0\in `;
        startTag.innerHTML = `(`;
        orangeText.innerHTML = `${element}`;
        separator.innerHTML = ',';
        endText.innerHTML = `)`;

        // Logic printing the elements in the correct order
        if (counter == 1)
            if (counter == length)
                result.append(startText, startTag, orangeText, endText, "\n")
            else
                result.append(startText, startTag, orangeText, separator, "\n");
        else if (length == counter)
            result.append("\xA0\xA0\xA0\xA0\xA0", orangeText, endText, "\n")
        else
            result.append("\xA0\xA0\xA0\xA0\xA0", orangeText, separator, "\n")
    });

    // Handle the copy the result
    if (copy !== undefined) {

        const columnCopied = document.querySelector('#fade-out')
        const copiedElement = document.createElement('h2');
        const checkBeforeRemove = document.querySelector('.copy-fadeinout');

        if (checkBeforeRemove !== null) {
            checkBeforeRemove.remove()
        }

        let range = document.createRange();
        range.selectNode(result);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");

        copiedElement.innerHTML = 'Copied'
        copiedElement.className = 'copy-fadeinout'
        columnCopied.appendChild(copiedElement);

    }
}

// the format button
butonFormat.addEventListener('click', function () {
    formatData();
})

// Copy button 
butonFormatCopy.addEventListener('click', function () {
    formatData('copy');
})

// clear button 
butonClear.addEventListener('click', function () {
    result.innerHTML = '';
    dataToFormat.value = '';
})

// click function for showing the demo
hidelink.addEventListener('click', function () {
    if (howTo.className == 'hidden-div')
        howTo.className = 'not-hidden-div'
     else 
        howTo.className = 'hidden-div'
})

// darkmode click function
darkmode.addEventListener('click', function () {

    if(textContainer.className == 'container-dark')
        setMode("light")
        else
        setMode("dark")

})

// Set mode and a cookie that expires after one year
function setMode(mode) { 

        let date = new Date();
        date.setDate(date.getDate()+365);
        expires = "; expires="+date.toUTCString();

        document.body.className = `${mode}-mode`;
        textContainer.className = `container-${mode}`
        inputContainer.className = `container-light-${mode}`
        textArea.className = `${mode}-textbox`;
        result.className = `container-result-${mode}`
        document.cookie = `mode=${mode}${expires}`; 
            if(mode == 'light')
                darkmode.text = `dark mode`
            else
            darkmode.text = `light mode`        
}

// Check if there is a cookie
function checkCookieName(name) 
    {
      let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) {
       return match[2];
      }
      else{
           return 'light';
      }
   }