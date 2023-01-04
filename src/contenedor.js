const fs = require("fs")
const path = require("path")
const datos = path.join(__dirname,'/materiasPrimas.json')
class Contenedor{

    constructor(listaMp){
        this.listaMp = listaMp
    }

    async save(objeto){
        try {
            
            let dato = await fs.promises.readFile(datos, "utf-8")
            let datopar = JSON.parse(dato)
            if(!objeto.cod){
                let objeto1={...objeto, cod:(datopar.length+1)}
                datopar.push(objeto1)
            }else if(objeto.cod){
                datopar.push(objeto)
            }
            
            await fs.promises.writeFile(datos, JSON.stringify(datopar, null, 2)
            
            ).then(()=>{
                return{
                    status:"Satisfactorio", message:`Materia Prima Guardada con exito  ${objeto.cod}`
                }
            }).catch((error)=>{
                throw new Error (`Error al guardar: ${error}`)
            })
            
        } catch (error) {
            console.log(error)
        }

    }
    async obtenerId(id){
        try {
            let dato = await fs.promises.readFile(datos, "utf-8")
            let datopar = JSON.parse(dato)
            let objetoid = datopar.filter(({ cod }) => cod == id);
            

            return console.log(objetoid[0]) 
            
        } catch (error) {
            throw new Error (`Id no encontrado:  ${error}`)  
        }
    }
    async obtenerMp(){
        try {
            let dato = await fs.promises.readFile(datos, "utf-8")
            let datopar = JSON.parse(dato)
            
            return console.log(datopar)
            
        } catch (error) {
            throw new Error (`Error al leer archivo o error al obtener datos del archivo:  ${error}`)
        }
    }
    async eliminarPorId(id){
        let data = await fs.promises.readFile(datos, "utf-8");
        let datoP = JSON.parse(data);
        let listaFiltrada = datoP.filter( x => x.cod != id );

        try {
            await fs.promises.writeFile(datos, JSON.stringify(listaFiltrada, null, 2));
  
        } catch (error) {
            throw new Error (`El id no corresponde a ninguna Materia Prima:  ${error}`)
        }
    }
    async eliminarTodo() {
        await fs.promises.unlink(datos, function (err) {
            if (err) throw err;
            console.log('Archivo eliminado!');
        });
    }
    async modificarMp(id, modificacion){
        await this.eliminarPorId(id)
        await this.save(modificacion)
 
    }
}
module.exports = Contenedor;