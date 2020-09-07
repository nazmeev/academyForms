import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Favorite } from '../interfaces/favorite.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public loginMinlength: number = 5
  public loginMaxlength: number = 8
  public passwordMinlength: number = 4
  public phoneMinlength: number = 10
  public phoneMaxlength: number = 13

  static url = 'https://films-boo.firebaseio.com/users'

  public validationMessages = {
    'login': {
      'required': 'Обязательное для заполнения поле\r\n',
      'minlength': `Длина должна быть не меньше ${this.loginMinlength} символов\r\n`,
      'maxlength': `Длина должна быть не больше ${this.loginMaxlength} символов\r\n`,
    },
    'email': {
      'required': 'Обязательное для заполнения поле\r\n',
      'email': 'Не удовлетворяет формат ел. почты\r\n',
    },
    'password': {
      'required': 'Обязательное для заполнения поле\r\n',
      'minlength': `Длина должна быть не меньше ${this.passwordMinlength} символов\r\n`,
      'hasSymbol': `Должны быть символы`,
      'hasCapitalSymbol': `Должны быть заглавные символы`,
      'hasKyrSymbol': `Не должно быть кириличных символов`,
      'hasNumber': `Должны быть цифры\r\n`,
    },
    'phones': {
      'required': 'Обязательное для заполнения поле\r\n',
      'isPhone': 'Неверный формат телефонного номера\r\n',
      'minlength': `Длина должна быть не меньше ${this.phoneMinlength} символов\r\n`,
      'maxlength': `Длина должна быть не больше ${this.phoneMaxlength} символов\r\n`,
    }
  }
  public formErrors = {
    'login': '',
    'email': '',
    'password': '',
    'phones': ''
  }
  public formErrorsClasses = {
    'login': '',
    'email': '',
    'password': '',
    'phones': ''
  }
  public phoneErrors = {}
  public phoneErrorsClasses = {}

  constructor(private http: HttpClient) { }

  get getValidationMessages(){
    return this.validationMessages
  }
  get getFormErrors(){
    return this.formErrors
  }
  get getFormErrorsClasses(){
    return this.formErrorsClasses
  }

  hasNumber(control: FormControl) {
    return (!/[0-9]/.test(control.value)) ? { "hasNumber": true } : null
  }
  hasSymbol(control: FormControl) {
    return (!/[a-z]/.test(control.value)) ? { "hasSymbol": true } : null
  }
  hasKyrSymbol(control: FormControl) {
    return (/[а-я, А-Я]/i.test(control.value)) ? { "hasKyrSymbol": true } : null
  }
  hasCapitalSymbol(control: FormControl) {
    return (!/[A-Z]/.test(control.value)) ? { "hasCapitalSymbol": true } : null
  }
  isPhone(control: FormControl) {
    return (!/^[-+]?[0-9]+$/.test(control.value)) ? { "isPhone": true } : null
  }
  checkUniqLogin(login: string): Observable<any>{
    return this.http.get<User[]>(`${RegistrationService.url}.json`).pipe(
      map(res => { console.log(res)
        // return { "checkLogin": true };
      })
    )
  }

  prepareUserToSave(user: User): User{
    user.phones = user.phones.toString()
    return user
  }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<Response>(`${RegistrationService.url}.json`, user).pipe(
  //     map(res => {
  //       console.log('resp', res)
  //       return { ...user }
  //     }
  //   ))
  // }
}
