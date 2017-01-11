export class User{
    id: string;
    firstName: string;
    lastName: string;
    cellphone: string;
    photo: string;
    email: string;

    constructor()
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        cellphone: string,
        photo: string,
        email: string
    )
    constructor(
        id?: string,
        firstName?: string,
        lastName?: string,
        cellphone?: string,
        photo?: string,
        email?:string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cellphone = cellphone;
        this.photo = photo;
        this.email = email;
    }

    getfirstName() {
        return this.firstName + " " + this.lastName;
    }
}