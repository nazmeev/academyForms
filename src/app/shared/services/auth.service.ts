import { Injectable } from "@angular/core";
import { Auth } from "../interfaces/auth.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interfaces/user.interface";
import { map } from "rxjs/operators";
import { Response } from '../interfaces/responce.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = null
    static url = 'https://films-boo.firebaseio.com/users'
    constructor(private http: HttpClient) {

    }

    // login(user: Auth): Observable<Response>{
    //     return this.http.post<Response>(`${AuthService.url}.json`, user)
    // }

    registration(user: User) {
        return this.http.post<Response>(`${AuthService.url}.json`, user).pipe(
            map(res => {
                localStorage.setItem('auth-token', res.name)
                this.setToken(res.name)
            })
        )
    }

    setToken(token: string){
        this.token = token
    }
}