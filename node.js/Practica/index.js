const fs = require('fs')                                         // Importa el módulo de sistema de archivos de Node.js

const contenido = fs.readFileSync('./datos.csv', 'utf-8');        // Lee el archivo CSV completo y lo guarda como un string

const filas = contenido.split(/\r?\n/)                           // Divide el string en un array usando saltos de línea (Windows/Linux)

const cabeceras = filas[0].split(";");                           // Coge la primera fila y la separa por puntos y coma para las claves

const arrayFinal = [];                                           // Crea un array vacío donde guardaremos los objetos resultantes

for (let i = 1; i < filas.length; i++){                          // Recorre las filas empezando desde la 1 (saltando la cabecera)
    if (!filas[i].trim()) continue;                               // Si la fila está vacía o solo tiene espacios, la salta
    const valores = filas[i].split(";");                         // Divide la fila actual en un array de valores usando el separador
    let obj = {};                                                // Crea un objeto vacío para representar la fila actual
    for (let j = 0; j < cabeceras.length; j++){                  // Recorre cada nombre de columna (cabecera)
        obj[cabeceras[j].trim()] = valores[j].trim();            // Asigna el valor a la clave eliminando espacios en blanco
    }
    arrayFinal.push(obj);                                        // Añade el objeto de la fila recién creado al array final
}

console.log(arrayFinal)                                          // Muestra por consola el array de objetos para verificarlo

const jsonFinal = JSON.stringify(arrayFinal, null, 2);           // Convierte el array a un string JSON con sangría de 2 espacios

fs.writeFileSync('./datos.json', jsonFinal, 'utf-8')             // Crea (o sobrescribe) el archivo .json con el contenido final
console.log("Éxito!");                                           // Imprime un mensaje de confirmación al terminar todo el proceso