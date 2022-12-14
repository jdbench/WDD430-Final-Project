export class User {
    constructor(
        public _id: string,
        public id: string,
        public username: string,
        public email: string,
        public password: string
    ) {
        this._id = _id;
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}