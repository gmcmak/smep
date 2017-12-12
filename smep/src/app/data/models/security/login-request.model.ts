export class LoginRequest {
    
    userName: string;
    secret: string;
    rememberMe: boolean;

    constructor(userName: string, secret: string, rememberMe?: boolean) {
        this.userName = userName;
        this.secret = secret;
        this.rememberMe = rememberMe;
    }
}