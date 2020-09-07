import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  linksMenu: Menu[] = [
    { path: '/films', label: 'Все фильмы', active: 'active', icon: 'list_alt'},
    { path: '/favorites', label: 'Избранное', active: 'active', icon: 'list_alt'},
    { path: '/login', label: 'Войти', active: 'active', icon: 'list_alt'},
    { path: '/registration', label: 'Реєстрація', active: 'active', icon: 'list_alt'},
  ]

  constructor() { }
  
  getMenu(){
    return this.linksMenu
  }

}