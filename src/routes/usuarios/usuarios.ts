import express from 'express';
const router = express.Router();

import { IUsuarios, Usuarios} from '@libs/usuarios/Usuarios';

const usuarioModel = new Usuarios();
usuarioModel.add({
    codigo: '',
    correo: 'erick@gmail.com',
    nombre: 'Erick Moncada',
    password: 'erick2023',
    roles: ['admin']
});

router.get('/byid/:id',(req,res)=>{
    const {id : codigo} = req.params;
    const usuario = usuarioModel.getById(codigo);
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

router.get('/all',(_req,res)=>{
    res.status(200).json(usuarioModel.getAll());
});

router.post('/new',(req,res)=>{
    const {nombre ="Sebastian", correo = "sebastian@gmail.com",password="sebastian2023"} = req.body;
    //TODO: Validar Entrada de datos
    const newUsuario : IUsuarios={
        codigo: "",
        nombre,
        correo ,
        password ,
        roles: []
    };
    if (usuarioModel.add(newUsuario)){
        return res.status(200).json({"created":true});
    }
    return res.status(400).json({"error":"Error al agregar un nuevo Usuario"});
});

router.put('/upd/:id',(req,res)=>{
    const {id}=req.params;
    const {nombre ="Moncada", correo = "Moncada@gmail.com",password="Moncada2023"} = req.body;

    const UpdateUsuario : IUsuarios={
        codigo: id,
        nombre,
        correo,
        password,
        roles: []
    };
    if(usuarioModel.update(UpdateUsuario)){
        return res.status(200).json({"update":true});
    }
    return res.status(400).json({"error":"Error al actualizar los datos"})
});

router.delete('/del/:id',(req,res)=>{
    const {id : codigo} = req.params;
    if(usuarioModel.delete(codigo)){
       return res.status(200).json({"deleted":true})
    }
    return res.status(404).json({"error":"No se pudo eliminar usuario"});
   });

export default router;