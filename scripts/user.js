export class User {
    _displayName;
    _emailAddress;
    _username;
    _password;
    constructor(displayName = "", emailAddress = "", username = "", password = "") {
        this._displayName = displayName;
        this._emailAddress = emailAddress;
        this._username = username;
        this._password = password;
    }
    get displayName() {
        return this._displayName;
    }
    set displayName(value) {
        this._displayName = value;
    }
    get emailAddress() {
        return this._emailAddress;
    }
    set emailAddress(value) {
        this._emailAddress = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    toString() {
        return `Display Name: ${this.displayName}\nEmail Address: ${this.emailAddress}\nUser Name: ${this.username}`;
    }
    toJSON() {
        return {
            "displayName": this.displayName,
            "emailAddress": this.emailAddress,
            "username": this.username,
            "Password": this._password
        };
    }
    fromJSON(json) {
        this.displayName = json.displayName;
        this.emailAddress = json.emailAddress;
        this.username = json.username;
        this._password = json.Password;
    }
    serialize() {
        if (!this.displayName || !this.emailAddress || !this.username || !this._password) {
            console.error("One or more of the user properties are missing or invalid.");
            return null;
        }
        return `${this.displayName}, ${this.emailAddress}, ${this.username}, ${this._password}`;
    }
    deserialize(data) {
        if (typeof data !== "string" || data.split(",").length !== 4) {
            console.error("Invalid Data format for deserializing data.");
            return;
        }
        const propArray = data.split(",");
        this.displayName = propArray[0];
        this.emailAddress = propArray[1];
        this.username = propArray[2];
        this._password = propArray[3];
    }
}
//# sourceMappingURL=user.js.map