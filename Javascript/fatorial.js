// module.id - caminho completo do arquivo
// console.log(module.id)

const fatorial = (num) => {
    if(num === 0){
        return 1;
    }

    return num * fatorial (num - 1)
}
// retorno de quando utilizando o requires
//exports.fatorial = fatorial // exportamos tudo sendo necessario na hora do requires escolher o que vamos utilizar
//ou
module.exports = fatorial // Nesse caso exportamos so a nossa função
//No caso de mais de uma função utilizamos o
/*module.exports = {
    fatorial: fatorial
}*/

// exports é uma referencia para module.exports
// exports = module.exports