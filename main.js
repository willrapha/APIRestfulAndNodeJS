const fatorial = require('./fatorial')

console.log('n-fatorial')

/* 
// process.cwd() - diretorio atual
console.log(`Executando o script a partir do diretorio ${process.cwd()}`)

// process.on() - podemos se inscrever em um evento
// no exemplo se inscrevemos o 'exit'
process.on('exit', () => {
    console.log('o script está prestes a terminar')
});
*/

// process.argv - traz os argumentos que foram utilizados para iniciar o script
//console.log(process.argv)

const num = parseInt(process.argv[2])

console.log(`O fatorial de ${num} é igual a ${fatorial(num)}`)
