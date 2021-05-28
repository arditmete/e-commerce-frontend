import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User;
  constructor(private userService: UserService, private httpClient: HttpClient) { }

  registerForm = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    username: new FormControl(),
    gender: new FormControl(),
    phoneNumber: new FormControl()
  })

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.user.email = this.registerForm.value.email;
    this.user.firstname = this.registerForm.value.firstname;
    this.user.lastname = this.registerForm.value.lastname;
    this.user.password = this.registerForm.value.password;
    this.user.username = this.registerForm.value.username;
    this.user.gender = this.registerForm.value.gender;
    this.user.phoneNumber = this.registerForm.value.phoneNumber;


    this.userService.register(this.user).subscribe(
      data => {
      },
      error=>{
      }
    )
  }
}
