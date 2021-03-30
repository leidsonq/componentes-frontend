import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController) {

      this.formGroup = formBuilder.group({
        nome: ['Leidson', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['leidson@gmail.com', [Validators.required, Validators.email]], 
        senha: ['abc', [Validators.required]],
        telefone1: ['62-90000-8965',[Validators.required]],
        telefone2: ['61-95555-0011', []]
      })
  }

    signupUser(){
      console.log(this.formGroup.value);
      this.usuarioService.insert(this.formGroup.value)
        .subscribe(response =>{
          this.showInsertOk();
        },
        error => {});
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

}
