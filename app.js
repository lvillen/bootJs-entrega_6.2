// Enigma

var plainAlphabet = "abcdefghijklmnopqrstuvwxyz:()!¡,'";
var encryptedAlphabet = "qw,ert(yuio'pa:sdfg!hjklz¡xcv)bnm";

var search = (str, letter) => {
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) return i;
    }

    return -1;
}

var transformLetter = (str_from, str_to, letter) => {
    var letterIndex = search(str_from, letter);
    // var letterIndex = str_from.indexOf(letter); Esto nos ahorra la función 'search'
    var transformedLetter = str_to[letterIndex];
    return transformedLetter;
}

var encrypt = message => {
    var messageLowerCase = message.toLowerCase();
    var result = "";

    for (var letter of messageLowerCase) {
        if (letter === " ") {
            result = result + " ";
        } else {
            result = result + transformLetter(plainAlphabet, encryptedAlphabet, letter);
        }
    }

    return result;
}

var decrypt = message => {
    var result = "";

    for (var letter of message) {
        if (letter === " ") {
            result = result + " ";
        } else {
            result = result + transformLetter(encryptedAlphabet, plainAlphabet, letter);
        }
    }

    return result;
}

//Mostrar los resultados de enigma en pantalla
var toEncryptedButton = document.getElementById("to-encrypted");
var toHumanButton = document.getElementById("to-human");
var messageInHumanTextarea = document.getElementById("human"); 
var messageEncryptedTextarea = document.getElementById("encrypted");

var callbackEncrypt = () => {
    messageEncryptedTextarea.value = encrypt(messageInHumanTextarea.value);
}

var callbackDecrypt = () => {
    messageInHumanTextarea.value = decrypt(messageEncryptedTextarea.value);
}

toEncryptedButton.addEventListener("click", callbackEncrypt);
toHumanButton.addEventListener("click", callbackDecrypt);


// Selección de número aleatorio
var randomPick = (n, min, max) => {
    var range = max - min + 1;
    var result = [];
    for (var step = 1; step <= n; step++) {
        var number; 
        do {
            number = Math.floor(Math.random() * range);
        } while (result.indexOf(number) > -1);

        result.push(number)
    }
    
    return result;
}

console.log(randomPick(10, 1, 100));

// Refactorización del código anterior

var randomPickOption2 = (n, min, max) => {
    if (n === 0) {
        console.error("Can't operate without a number");
        return;
    }

    var range = max - min + 1;
    var result = [];
    var number;
    
    do { 
        number = Math.floor(Math.random() * range);
        if (result.indexOf(number) === -1) result.push(number);
    } while (result.length < n);

    return result;
}

console.log(randomPickOption2(10, 1, 100));