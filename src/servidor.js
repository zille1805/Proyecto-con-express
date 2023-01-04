const express= require("express")
const { json } = require("express/lib/response")
const app = express()
const PORT = 8080
const Contenedor = require("./Contenedor.js")
const contenedor = new Contenedor("./MateriasPrimas.json")


const server = app.listen (PORT, ()=>{
    console.log("seridor levantado en el puerto " + server.address().port)
})

app.use(express.json());
//peticiones Get:

app.get("/api/productos",async (req, res)=>{
    
    const materiasPrimas = await contenedor.obtenerMp()
    

    res.json({products: materiasPrimas});
})

app.get("/api/productos/:id",async (req, res)=>{
    
    let id= req.params.id
    const materiasPrimas = await contenedor.obtenerId(id)

    res.json( materiasPrimas);
})


// Peticiones Post:
app.post("/api/productos",async (req, res)=>{
    
    let materiaPrima= req.body;
    await contenedor.save(materiaPrima)
    
    res.json({materiaPrimaAgregada: materiaPrima});
})

// Peticiones Put:
app.put("/api/productos/:id",async (req, res)=>{
    
    let id= req.params.id;
    let materiaPrimaMod= req.body;
    const materiasPrimas = await contenedor.modificarMp(id, materiaPrimaMod)

    res.json( materiasPrimas);
})

// peticiones Delete:

app.delete("/api/productos/:id",async (req, res)=>{
    
    let id= req.params.id
    const materiasPrimas = await contenedor.eliminarPorId(id)

    res.json( materiasPrimas);
})