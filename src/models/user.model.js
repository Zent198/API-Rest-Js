export class UsuarioModel {
    constructor(name, email, id) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.deletedAT = null;
    }
}