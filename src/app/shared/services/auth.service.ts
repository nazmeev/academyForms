import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user.interface";
import { tap } from "rxjs/operators";
import { Response } from '../interfaces/responce.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = this.getStorage()
    static url = 'https://films-boo.firebaseio.com/users'

    constructor(private http: HttpClient) { }

    login(user: User) {
        return this.http.get(`${AuthService.url}.json`, {
            observe: 'response',
            params: {
                "email": user.email,
                "password": user.password
            }
        }).pipe(
            tap(resp => {
                if (resp.status == 200) {
                    let result = Object.keys(resp.body).map(key => ({ ...resp.body[key], id: key }))
                    console.log('result', result);
                    
                    let match = result.filter(key => (key.email == user.email) && (key.password == user.password));
                    console.log('match', match);

                    (match.length > 0) ? this.setStorage(match[0]['id']) : this.logOut()
                }
            })
        )
    }

    registration(user: User) {
        return this.http.post<Response>(`${AuthService.url}.json`, user).pipe(
            tap(res => {
                sessionStorage.setItem('auth-token', res.name)
                this.setToken(res.name)
            })
        )
    }

    setToken(token: string) {
        this.token = token
    }
    getToken(): string {
        return this.token
    }
    isAuth(): boolean {
        console.log('AuthService isAuth', this.token)
        return !!this.token
    }
    logOut() {
        this.setToken(null)
        sessionStorage.clear()
    }
    setStorage(token: string) {
        sessionStorage.setItem('auth-token', token)
    }
    getStorage() {
        return sessionStorage.getItem('auth-token')
    }
}