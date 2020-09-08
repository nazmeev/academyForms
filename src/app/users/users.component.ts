import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public messageAlert: string = ''
  public typeAlert: string = ''
  public isAuth: boolean
  public userName: string = ''

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { data: string, type: string }
    console.log('state', state)
    if (state) {
      this.messageAlert = state.data
      this.typeAlert = state.type
      console.log('state', state.data)
    }

    this.isAuth = this.authService.isAuth()
    if (this.isAuth) {
      console.log('UsersComponent user')
      let token: string = this.authService.getStorage()
      this.userService.getUser(token).subscribe((user: User) => {
        this.userName = user.login
      },
        err => {
          console.warn('UsersComponent getUser err ', err)
        })
    } else {
      console.log('UsersComponent guest')

    }
  }

  ngOnInit(): void {
  }

}
