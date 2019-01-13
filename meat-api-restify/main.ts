import * as restify from 'restify'

// criando server com restify
const server = restify.createServer({
    name: 'meat-api',
    version: '1.0.0'
})

// plugin para fornecer parametros da url
server.use(restify.plugins.queryParser()) // acionado a todo momento

// req - dados do request
// resp - utilizado para resposta
// next - após terminar a callback
server.get('/info', (req, resp, next) => { 
    
    // Codigo de retorno da resposta
    // resp.status(400);

    // Manual
    // resp.contentType = 'application/json'; //header
    // resp.send({
    //     message: 'hello'
    // });

    // É possivel setar o header tambem dessa forma
    // resp.setHeader('Content-Type', 'application/json'); 

    // .json - esse metodo seta contentType para json e faz o send
    resp.json({ 
        browser: req.userAgent(), // browser do request
        method: req.method, // metodo http
        url: req.href(), // url 
        path: req.path(), // caminho da rota
        query: req.query // query strings utilizadas na url
    }); 

    return next() // sempre no final para indicarmos que terminamos de processar o request
})

server.listen(3000, () =>{
    console.log('API is running on http://localhost:3000')
})
