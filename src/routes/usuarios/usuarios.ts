import express from 'express';
const router = express.Router();
import { UsuariosDao } from '@dao/models/Usuarios/UsuariosDao';
import { IUsuarios } from '@server/dao/models/Usuarios/IUsuarios';
import { usuarios } from '@libs/usuarios/Usuarios';
import { MongoDBConn } from '@server/dao/MongoDBConn';

const usauriosDao = new UsuariosDao(MongoDBConn);
let usuarioModel:usuarios;
usauriosDao.init().then(()=>{
    usuarioModel = new usuarios(usauriosDao);
});

router.get('/byid/:id',async(req,res)=>{
    const {id : codigo} = req.params;
    const usuario = await usuarioModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"No se encontro usuario"});
});

router.get('/',(_req,res)=>{
    const jsonUrls = {
        "getAll": {"method":"get","url":"usuarios/all"},
        "getById": {"method":"get","url":"usuarios/byid/:id"},
        "new": {"method":"post","url":"usuarios/new"},
        "update": {"method":"put","url":"usuarios/upd/:id"},
        "delete": {"method":"delete","url":"usuarios/del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', async(_req,res)=>{
    res.status(200).json(await usuarioModel.getAll());
});

router.post('/new',async(req,res)=>{
    const {nombre ="Sebastian", correo = "sebastian@gmail.com",password="sebastian2023"} = req.body;
    //TODO: Validar Entrada de datos
    const newUsuario : IUsuarios={
        codigo: "",
        nombre,
        correo ,
        password ,
        roles: []
    };
    if (await usuarioModel.add(newUsuario)){
        return res.status(200).json({"created":true});
    }
    return res.status(400).json({"error":"Error al agregar un nuevo Usuario"});
});

router.put('/upd/:id',async(req,res)=>{
    const {id}=req.params;
    const {nombre ="--NoRecibido--", correo = "--NoRecibido--",password="--NoRecibido",roles=[],codigo=""} = req.body;

    if (
        nombre === "--NoRecibido--"
        || correo === "--NoRecibido--"
        || password === "--NoRecibido--"
    ){
        return res.status(403).json({"error":"Debe mandar el nombre, correo y password"})
    }
    const UpdateUsuario : IUsuarios={
        codigo,
        nombre,
        correo,
        password,
        roles
    };
    if(await usuarioModel.update(id,UpdateUsuario)){
        return res.status(200).json({"update":true});
    }
    return res.status(400).json({"error":"Error al actualizar los datos"})
});

router.delete('/del/:id',async(req,res)=>{
    const {id : codigo} = req.params;
    if(await usuarioModel.delete(codigo)){
       return res.status(200).json({"deleted":true})
    }
    return res.status(404).json({"error":"No se pudo eliminar usuario"});
   });

export default router;