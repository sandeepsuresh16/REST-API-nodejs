const http = require('http')
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct} = require('./controller/productController')

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method)
    if(req.url=='/api/product' && req.method === 'GET'){
         getProducts(req,res)
    }else if(req.url.match(/\api\/product\/([0-9]+)/) && req.method ==='GET'){
        let id = req.url.split('/')
        getProduct(req,res,id[3])
    }else if(req.url =='/api/product' && req.method === 'POST'){
        createProduct(req,res)
    }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'PUT'){
        let id =req.url.split('/')
        updateProduct(req,res,id[3])
    }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'DELETE'){
        const id = req.url.split('/')
        deleteProduct(req,res,id[3])
    }else{
        res.writeHead(404,{'content-Type':'application/JSON'})
        res.end(JSON.stringify({message:"Route not found"}))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT,()=>console.log(`server running on ${PORT}`))