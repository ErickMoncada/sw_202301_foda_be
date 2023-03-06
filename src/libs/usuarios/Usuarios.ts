import { IUsuarios } from "@server/dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";

export class usuarios{
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
      this.dao = dao;
    }
    getAll() {
        return this.dao.findAll();
      }
    add(nuevoUsuario : IUsuarios){
        const date = new Date();
        const nueva: IUsuarios = {
        ...nuevoUsuario,
        created: date,
        lastacces:  date
        }
        return this.dao.create(nueva);
    }
    getById(id: string) {
        return this.dao.findByID(id);
      }
    update(id: string,updateUsuario: IUsuarios){
        const updateObject = { ...updateUsuario, lastacces: new Date() };
        return this.dao.update(id, updateObject);
    }
    delete(id: string){
        return this.dao.delete(id);
    }
}