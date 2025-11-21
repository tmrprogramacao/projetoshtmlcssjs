const output = document.getElementById("passwordOutput");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");


lengthInput.addEventListener("input", () => {
lengthValue.textContent = lengthInput.value;
});


function generatePassword() {
const length = lengthInput.value;
const includeUpper = document.getElementById("uppercase").checked;
const includeNumbers = document.getElementById("numbers").checked;
const includeSymbols = document.getElementById("symbols").checked;


let chars = "abcdefghijklmnopqrstuvwxyz";
if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
if (includeNumbers) chars += "0123456789";
if (includeSymbols) chars += "!@#$%^&*()-_=+[]{};:,.<>?/";


let password = "";
for (let i = 0; i < length; i++) {
password += chars.charAt(Math.floor(Math.random() * chars.length));
}


output.textContent = password;
}


function copyPassword() {
const text = output.textContent;
navigator.clipboard.writeText(text);
alert("Senha copiada!");
}