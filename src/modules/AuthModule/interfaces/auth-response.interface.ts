import { User } from "src/modules/UserModule/user.entity";

export interface AuthResponse {
    user: User
    token: string
}