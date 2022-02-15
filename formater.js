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

    valueAsArray.forEach(function (element) {

        if (inputType == 'string') {
            resultArray.push(`'${element.trim()}'`);
        } else {
            resultArray.push(element.trim());
        }
    })

    let counter = 0;
    let length = resultArray.length;    

    resultArray.forEach(element => {
        counter++;
        if( counter == 1)
            if(counter == length)
                result.append(`\xA0\in (${element})\n`)
                else
                result.append(`\xA0\in (${element},\n`)
        else if (length == counter)
            result.append(`\xA0\xA0\xA0\xA0\xA0${element})\n`) 
        else
            result.append(`\xA0\xA0\xA0\xA0\xA0${element},\n`)
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
