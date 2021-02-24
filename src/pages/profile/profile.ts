import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  usuario: UsuarioDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.usuarioService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.usuario = response;
        this.getImageIfExists();
      },
      error =>{});
    }
  }
  getImageIfExists(){
    this.usuarioService.getImageFromBuket(this.usuario.id)
    .subscribe(response => {
      this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
    },
    error => {
      console.log("ERROR AO BUSCAR A IMGAEM NO S3");
    });
  }

}
