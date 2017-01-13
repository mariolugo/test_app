export class User{
    id: string;
    token: string;
    email: string;
    admin: string;

    constructor()
    constructor(
        id: string,
        token: string,
        email: string,
        admin: string
    )
    constructor(
        id?: string,
        token?: string,
        email?:string,
        admin?: string
    ) {
        this.id = id;
        this.token = token;
        this.email = email;
        this.admin = admin;
    }

    isAdmin() {
        return this.admin;
    }

    getEmail() {
        return this.email;
    }

    getToken() {
        return this.token;
    }
}