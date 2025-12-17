//console.log("Hola desde index.js")

const { error, log } = require("console")
const fs = require("fs")

/*fs.readFile("archivo.txt", "utf-8", (error, data) => {
    console.log(data)
})

fs.writeFile("nuevo.txt", "Soy un archivo nuevo", (error) => {
    console.log("Archivo creado");
    
})


//Sincrono, espera respuesta
const text = fs.readFileSync('./archivo.txt', 'utf-8')
console.log(text)


//Asincrono, no espera respuesta
fs.readFile('./archivo.txt', 'utf-8', (error, data) => {
    console.log(data)
})

//Sincrono
fs.writeFileSync('./nuevo.txt', text, 'utf-8')


//Asincrono
fs.writeFile('./nuevo.txt', 'texto introducido', 'utf-8', (error) => {
    console.log('Ya se ha cargado el texto');
    
})*/



//Encriptación
const crypto = require('crypto');
const { json } = require("stream/consumers");

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('MiClaveSecreta', 'salt', 32)

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm,Buffer.from(key), iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')}
}



//Desencriptar
function decrypt(text, iv){
    let ivBuffer = Buffer.from(iv, 'hex');
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), ivBuffer);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

/*const encriptado = encrypt('Jorge Sanchez Gallego')
console.log(encriptado)

const desencriptado = decrypt('bc0e4928dd7fa8d4ad7f2450437966940bbd9b58d82fbda44539dece59ec7f39', '404ff3299e9344acd0698499b686c607');
console.log(desencriptado)*/

/*Utilizando las librerías mencionadas, deberéis crear las funciones necesarias para leer el contenido de un archivo de texto, 
cifrarlo y sobrescribir el archivo con el contenido cifrado. También deberíamos poder realizar la operación contraria: 
leer el contenido cifrado del archivo, desencriptarlo y sobrescribir el archivo con el contenido desencriptado.*/

const text = fs.readFileSync('./archivo.txt', 'utf-8')
function readAndCrip(text, archivo){
    
    const textEncrip = encrypt(text);
    fs.writeFileSync(archivo, JSON.stringify(textEncrip, null, 2), 'utf-8')
}

readAndCrip(text, './archivo.txt')




function readAndDecrip(archivo){
    const contenido = fs.readFileSync('./archivo.txt', 'utf-8')
    const objeto = JSON.parse(contenido)
    const decripText = decrypt(objeto.encryptedData, objeto.iv)
    fs.writeFileSync(archivo, decripText, 'utf-8')
}

readAndDecrip('./archivo.txt')

