console.log('n-fatorial')

// process.cwd() - diretorio atual
console.log(`Executando o script a partir do diretorio ${process.cwd()}`)

// process.on() - podemos se inscrever em um evento
// no exemplo se inscrevemos o 'exit'
process.on('exit', () => {
    console.log('o script está prestes a terminar')
});

const fatorial = (num) => {
    if(num === 0){
        return 1;
    }

    return num * fatorial (num - 1)
}

// process.argv - traz os argumentos que foram utilizados para iniciar o script
console.log(process.argv)

console.log(`O fatorial de 5 é igual a ${fatorial(5)}`)

