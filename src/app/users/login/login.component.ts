import { Component, OnInit } from '@angular/core';
import { loginForm } from '../../shared/interfaces/loginform.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myForm: loginForm
  public formData = []

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    // console.log('actualLength', form.controls.password.errors.minlength.actualLength)
    // console.log('requiredLength', form.controls.password.errors.minlength.requiredLength)
    if(form.status === "VALID"){
      this.myForm = {
        email: form.value.email,
        password: form.value.password
      }
    }
    Object.keys(form.value).map(key => this.formData.push({value: form.value[key], field: key}) )
    console.log(this.formData)
  }

}
