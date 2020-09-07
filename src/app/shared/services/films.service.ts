import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs';
import { Film } from '../interfaces/film.interface';
import { Subject, Observable } from 'rxjs';
import { responceFilms } from '../interfaces/responceFilms.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  public films: Film[] = [];
  public filmsPopular: Film[] = [];
  public filmsFiltered: Film[] = [];

  public visibility: string = 'visible';
  public page: number = 1;
  public pageMax: number = 4;
  public search: string = '';

  apiUrl: string = "https://api.themoviedb.org/3"
  movieUrl: string = `${this.apiUrl}/movie`

  imgPath: string = 'https://image.tmdb.org/t/p'
  midImgPath: string = `${this.imgPath}/w500`
  smallImgPath: string = `${this.imgPath}/w185`
  bigBackPath: string = `${this.imgPath}/w1280`
  midBackPath: string = `${this.imgPath}/w780`
  smallBackPath: string = `${this.imgPath}/w300`

  // public moreSource$ = new Subject()

  constructor(private _http: HttpClient) { }

  loadFilms(type: string = 'popular'): Observable<Film[]> {
    return this._http.get(`${this.movieUrl}/${type}?page=${this.page}`).pipe(
      map((responce: responceFilms) => {
        this.page = responce.page + 1
        this.addFilms(responce.results)
        // this.addFilms(responce.results)
        // this.moreSource$.next(responce.results)
        return this.films
      }),
      // tap( () => {
      //   console.log('loading')
      // })
    )
  }

  loadFilm(filmId?: number) {
    return this._http.get(`${this.movieUrl}/${filmId}`);
  }

  // set setFilms(films: Film[]) {
  //   this.films = films
  // }
  // get getFilms(): Film[] {
  //   return this.films
  // }
  // set setPage(page: number) {
  //   this.page = page
  // }
  get getPage(): number {
    return this.page
  }

  addFilms(filmList: Film[]) {
    filmList.map(film => {
      this.films.push(film)
    })
  }

  getFilmById(id: number) {
    let film = this.films.filter(item => item.id == id)
    return film[0]
  }

  filteringSearch(search: string){
    this.films.filter(film => film.title.toLowerCase().indexOf(search.toLowerCase()) != -1)
  }

  getSearch(search: string){
    if(search == '')
      this.films.map(film => film.visible = true)
    else
    this.films.map(film => 
      (film.title.toLowerCase().indexOf(search.toLowerCase()) != -1)? film.visible = true : film.visible = false
    )
console.log(this.films)
    // if(search == '') this.visibility = 'visible'; else this.visibility = 'invisible';
    // this.filmsFilteredSource.next(this.filmsFiltered);
    // this.moreVisibledSource.next(this.visibility);
  }

}