export interface IUsuarios{
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles: [];
    created?: Date;
    lastacces?: Date;
}

export class Usuarios{
    private usuarios: IUsuarios[];
    constructor(){
        this.usuarios=[];
    }
    getAll(){
        return this.usuarios;
    }
    add(nuevoUsuario : IUsuarios){
        const date = new Date();
        const nueva: IUsuarios = {
        ...nuevoUsuario,
        codigo: (Math.random()* 1000).toString()+new Date().getTime().toString(),
        created: date,
        lastacces:  date
        }
        this.usuarios.push(nueva);
        return true;
    }
    getById(codigo: string){
        const usuarioToReturn = this.usuarios.find((usu)=>{
            return usu.codigo === codigo;
        });
        return usuarioToReturn;
    }
}