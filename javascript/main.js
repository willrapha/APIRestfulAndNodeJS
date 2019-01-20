const fatorial = require('./fatorial')

console.log('n-fatorial')

// yargs
// criamos um parametro chamado 'num' e pegamos seus argumentos
const argv = require('yargs').demandOption('num').argv

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

const num = argv.num

console.log(`O fatorial de ${num} é igual a ${fatorial(num)}`)

console.log(module.paths)

