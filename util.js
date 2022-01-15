const fs = require('fs')


function writeDataToFile(filename,content){
    fs.writeFileSync(filename,JSON.stringify(content),'utf-8',(error)=>{
        console.log(error)
    })
}

function getPostData(req){
    return new Promise((resolve,reject)=>{
        try{
            let body =""
            req.on('data',(chunck)=>{
                body+=chunck.toString()
            })

            req.on('end',()=>{
                resolve(body)
            })
            
        }catch(error){
            console.log(error)
            reject({message:"error while adding"})
        }
    })
}


module.exports ={
    getPostData,writeDataToFile
}