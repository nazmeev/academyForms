import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/responce.interface';
import { Favorite } from '../interfaces/favorite.interface';
import { Film } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {
  public favorites: Favorite[] = []
  public avaragePopularity: string
  static url = 'https://films-boo.firebaseio.com/favorite'

  constructor(private http: HttpClient) { }

  create(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Response>(`${FavoriteService.url}.json`, favorite).pipe(
      map(res => {
        console.log('resp', { ...favorite, id: res.name })
        return { ...favorite, id: res.name }
      }
    ))
  }

  load(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${FavoriteService.url}.json`).pipe(
      map(res => {
        if (!res) return [];
        const mappedFavorites = Object.keys(res).map(key => ({ ...res[key], id: key }))
        this.favorites = mappedFavorites;
        return this.favorites;
      })
    )
  }

  update(favorite: Favorite): Observable<Favorite> {
    return this.http.put<Favorite>(`${FavoriteService.url}.json`, favorite).pipe(
      map(res => {
        console.log('resp', { ...favorite })
        return { ...favorite }
      })
    )
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${FavoriteService.url}/${id}.json`)
  }
  
  removeAll(): Observable<void> {
    return this.http.delete<void>(`${FavoriteService.url}.json`)
  }

  setFavorites(favorites: Favorite[]) {
    this.favorites = favorites
  }

  getFavorites(){
    return this.favorites
  }

  implementNewFavorite(film: Film) {
    return {
      filmId: film.id,
      favImage: film.poster_path,
      favTitle: film.title,
      favOverview: film.overview,
      favPopularity: film.popularity
    }
  }

  addFavorites(film: Favorite) {
    this.favorites.push(film)
  }

  getFavoriteById(id: string) {
    let favorites = this.favorites.filter(item => item.id == id)
    return favorites[0]
  }
  
  removeFavoriteById(id: string) {
    this.favorites = this.favorites.filter(item => item.id != id)
  }

}
