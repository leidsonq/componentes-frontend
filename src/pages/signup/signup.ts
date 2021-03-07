import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = formBuilder.group({
        nome: ['Leidson', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['leidson@gmail.com', [Validators.required, Validators.email]], 
        senha: ['abc', [Validators.required]],
        telefone1: ['62-90000-8965',[Validators.required]],
        telefone2: ['61-95555-0011', []],
        telefone3: ['', []],
      })
  }

  signupUser(){
    console.log("Enviou o form");
  }

}
