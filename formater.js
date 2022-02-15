const butonFormat = document.querySelector('#buton-format');
const butonFormatCopy = document.querySelector('#buton-format-copy');
const butonClear = document.querySelector('#buton-clear');
const hidelink = document.querySelector('#show-example');
let howTo = document.querySelector('#how-to');
let result = document.querySelector("#result-formater");
let dataToFormat = document.querySelector("#text-format");

const formatData = function (copy) {
    let resultArray = [];
    let valueAsArray = dataToFormat.value.trim().split('\n'); 
    let inputType = document.querySelector('input[name="input-typ"]:checked').value;
    result.innerHTML = '';

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

butonFormat.addEventListener('click', function () {
    formatData();
})

butonFormatCopy.addEventListener('click', function () {
    formatData('copy');
})

butonClear.addEventListener('click', function () {
    result.innerHTML = '';
    dataToFormat.value = '';

})

hidelink.addEventListener('click', function () {
    if (howTo.className == 'hidden-div') {
        howTo.className = 'not-hidden-div'
    } else {
        howTo.className = 'hidden-div'
    }
})
