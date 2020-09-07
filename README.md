# Forms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Techniques

Data films from service themoviedb 
Favorites save into the database generated by Firebase
For request using forkJoin from `rxjs` library

### Features

Project consist of 2 routes
1. Users / LoginComponent - driven-form
2. Users / RegistrationComponent - reactive-form by FormBuilder
3. The list of films shows films from  the themoviedb service. You can add to/(remove) favorite list
4. Favorites list. Here you can see favorite films, average vote,  can clear the favorite list
