import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    static url = 'https://films-boo.firebaseio.com/users'

    constructor(
        private http: HttpClient
        // private authService: AuthService
    ) {
        console.log('UserService');
        
     }

    getUser(id: string) {        
        return this.http.get(`${UserService.url}/${id}.json`)
    }
}