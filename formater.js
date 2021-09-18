const butonFormat = document.querySelector('#buton-format');
const butonFormatCopy = document.querySelector('#buton-format-copy');
const butonClear = document.querySelector('#buton-clear');
const hidelink = document.querySelector('#show-example');
let howTo = document.querySelector('#how-to');
let result = document.querySelector("#result-formater");
let dataToFormat = document.querySelector("#text-format");
let textCopy = document.querySelector('#text-format-copy');

const formatData = function (copy) {
    let resultArray = [];
    let valueAsArray = dataToFormat.value.trim().split('\n');
    let inputType = document.querySelector('input[name="input-typ"]:checked').value;
    result.innerHTML = '';

    valueAsArray.forEach(function (element) {

        if (inputType == 'string') {
            resultArray.push(`'${element}'`);
        } else {
            resultArray.push(element);
        }
    })

    let finalResult = `in (${resultArray.toString()})`
    result.append(finalResult);

    if (copy !== undefined) {

        const columnCopied = document.querySelector('#fade-out')
        const copiedElement = document.createElement('h2');

        const checkBeforeRemove = document.querySelector('.copy-fadeinout');

        if (checkBeforeRemove !== null) {
            checkBeforeRemove.remove()
        }

        textCopy.type = 'text';
        textCopy.value = finalResult;
        textCopy.select();
        textCopy.setSelectionRange(0, 99999);
        document.execCommand("copy");
        textCopy.type = 'hidden';

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
    if(howTo.className == 'hidden-div') {
        howTo.className = 'not-hidden-div'
    }else{
        howTo.className = 'hidden-div'
    }
})