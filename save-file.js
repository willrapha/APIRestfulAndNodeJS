// criamos um constante para pegar o retorno do modulo que estamos importando
const fs = require('fs')

// 0 e 1 do process.argv é o nome e caminho do arquivo
// writeFile - 1 parametro nome do arquivo, 2 parametro conteudo, 3 parametro erros 
fs.writeFile(process.argv[2], process.argv[3], (error) =>{
    if(error) throw error

    console.log(`Arquivo ${process.argv[2]} foi salvo com sucesso.`)

})
