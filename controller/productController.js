const Product = require('../model/productModel')
const {getPostData} = require('../util')

async function getProducts(req,res){
    try {
        const products = await Product.findAll()
        res.writeHead(200,{'content-Type':'application/JSON'})
        res.end(JSON.stringify(products))
    } catch (error) {
       console.log(error) 
    }
}

async function getProduct(req,res,id){
    try {
        const product = await Product.findById(id)
        console.log(id)
        if(product){
            res.writeHead(200,{'Content-Type':'application/JSON'})
            res.end(JSON.stringify(product))
        }else{
            res.writeHead(404,{'Content-Type':'application/JSON'})
            res.end(JSON.stringify({message:'Product not found'}))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createProduct(req,res){
    console.log('@productcontroller-createProduct')
    try {
        const body = await getPostData(req)
        // console.log(body)
        const {title,description,price} = JSON.parse(body)

        const product ={
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)
        if(!newProduct){
            res.writeHead(404,{'Content-TYpe':'application/json'})
            res.end(JSON.stringify({message:"error while creating new product"}))
        }else{
            res.writeHead(201,{'Content-Type':'application/json'})
            res.end(JSON.stringify(newProduct))
        }
    } catch (error) {
        console.log(error);        
    }
}

async function updateProduct(req,res,id){
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404,{'Content-Type':'application/json'})
            res.end(JSON.stringify({message:"product not found"}))
        }else{
            const body = await getPostData(req)
            
            const {title,description,price} = JSON.parse(body)
            const updProduct = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updatedProduct = await Product.update(updProduct,id)
            res.writeHead(201,{'Content-Type':'application/json'})
            res.end(JSON.stringify(updatedProduct))
        }
    }catch(err){
        console.log(err)
    }      
}

async function deleteProduct(req,res,id){
     
     try {
        await Product.remove(id)
        res.writeHead(201,{'Content-Type':'application/json'})
        res.end(JSON.stringify({message:`product ${id} deleted`}))
     } catch (error) {
         console.log(error)
     }
     
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}