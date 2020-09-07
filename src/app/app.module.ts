import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FilmsComponent } from './films/films.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FilmComponent } from './film/film.component';
import { FilmsItemComponent } from './films/films-item/films-item.component';
import { ApiinterceptorService } from './shared/services/apiinterceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeFavoritedPipe } from './shared/pipes/pipe-favorited.pipe';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesItemComponent } from './favorites/favorites-item/favorites-item.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { SearchComponent } from './shared/components/search/search.component';
import { UsersComponent } from './users/users.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FilmsComponent,
    MenuComponent,
    FilmComponent,
    FilmsItemComponent,
    PipeFavoritedPipe,
    FavoritesComponent,
    FavoritesItemComponent,
    SearchComponent,
    RegistrationComponent,
    UsersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiinterceptorService,
    multi: true,
    
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
