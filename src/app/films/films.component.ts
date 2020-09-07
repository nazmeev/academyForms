import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FilmsService } from '../shared/services/films.service';
import { FavoriteService } from '../shared/services/favorite.service';
import { Favorite } from '../shared/interfaces/favorite.interface';
import { responceFilms } from '../shared/interfaces/responceFilms.interface';
import { forkJoin, of } from 'rxjs';
import { Film } from '../shared/interfaces/film.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})

export class FilmsComponent implements OnInit {
  public maxPages: number = 4
  public loaded: boolean = false
  public moreActive: boolean = true

  public films: Film[] = []
  public favorites: Favorite[] = []

  public imgPath = this.filmsService.smallImgPath

  constructor(
    private filmsService: FilmsService,
    private favoriteService: FavoriteService
  ) {  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.getPopularFilms3()
  }

  getPopularFilms() {
    console.log('loading data')
    forkJoin(
      this.filmsService.loadFilms(),
      this.favoriteService.load()
    )
      .subscribe(([films, favorites]) => {
        this.films = films
        this.favorites = favorites
        this.loaded = true
      })
  }
  getPopularFilms2() {
    this.filmsService.loadFilms().pipe(
      switchMap((films: Film[]) => {
        this.films = films;
        return this.favoriteService.load()
      }),
      switchMap((favorites: Favorite[]) => {
        this.favorites = favorites;
        return of(true);
      })
    ).subscribe((loaded: boolean) => {
      this.loaded = loaded;
    })
  }
  getPopularFilms3() {
    this.filmsService.loadFilms().subscribe(
      (filmList: Film[]) => {
        this.films = filmList
        this.favoriteService.load().subscribe(
          (favoritesList: Favorite[]) => {
            this.favorites = favoritesList
            this.loaded = true
        })
      }
    )
  }

  loadMore() {
    console.log('loadMore')

    if (this.moreActive)
      this.filmsService.loadFilms().subscribe(films => {
        this.films = films
        if (this.filmsService.getPage > this.maxPages) this.moreActive = false
      }, err => console.error('err', err))
  }

  addFavorite(id: number) {
    console.log('addFavorite')
    let film = this.filmsService.getFilmById(id)

    let favorite: Favorite = this.favoriteService.implementNewFavorite(film)

    this.favoriteService.create(favorite).subscribe(fav => {
      this.favoriteService.addFavorites(fav)
      this.favorites = this.favoriteService.favorites
    }, err => console.error(err))
  }

  removeFavorite(id: string) {
    console.log('removeFavorite')
    this.favoriteService.remove(id).subscribe(() => {
      this.favoriteService.removeFavoriteById(id)
      this.favorites = this.favoriteService.favorites
    }, err => console.error(err))
  }

}