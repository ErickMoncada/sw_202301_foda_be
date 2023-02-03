import express from 'express';
const router = express.Router();

import { IUsuarios, Usuarios} from '@libs/usuarios/Usuarios';

const usuarioModel = new Usuarios();
usuarioModel.add({
    codigo: '',
    correo: 'erick@gmail.com',
    nombre: 'Erick Moncada',
    password: 'erick2023',
    roles: []
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

export default router;