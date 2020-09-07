import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../shared/services/favorite.service';
import { Favorite } from '../shared/interfaces/favorite.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {
  public loaded: boolean = false
  public avaragePopularity: string
  public imgPath = `https://image.tmdb.org/t/p/w185`

  constructor(
    public favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.getFavorites()
  }

  getFavorites(){
    if(this.favoriteService.favorites.length){
      this.avaragePopularity = this.favoriteService.avaragePopularity
      console.log('return data', this.avaragePopularity)
      this.loaded = true
      this.calculateAvarage(this.favoriteService.favorites)
    }else{
      console.log('return load data')
      this.favoriteService.load().subscribe(
        (filmList: Favorite[]) => {
          this.favoriteService.favorites = filmList
          this.calculateAvarage(filmList)
          // filmList.map(item => {
          //   this.totalPopularity += item.favPopularity
          // })
          // this.FavoriteService.favorites = filmList
          // this.avaragePopularity = this.FavoriteService.avaragePopularity = (this.totalPopularity / filmList.length).toFixed(2)
          // this.loaded = true
        }
      )
    }
  }

  removeFavorite(id:string){
    let favorite = this.favoriteService.favorites.filter(item => item.id == id)

    this.favoriteService.remove(favorite[0].id).subscribe(() => {
      this.favoriteService.favorites = this.favoriteService.favorites.filter(item => item.id != id)
      this.calculateAvarage(this.favoriteService.favorites)
    }, err => console.error( err ))
  }

  clearFavorite(): void{
    console.log('clearFavorite')

    this.favoriteService.removeAll().subscribe(() => {
      this.favoriteService.favorites = []
    }, err => console.error( err ))
  }

  calculateAvarage(filmList){
    let totalPopularity: number = 0
    filmList.map(item => {
      totalPopularity += item.favPopularity
    })
    this.avaragePopularity = this.favoriteService.avaragePopularity = (totalPopularity / filmList.length).toFixed(2)
    this.loaded = true
  }
}