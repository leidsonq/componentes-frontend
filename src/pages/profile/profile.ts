import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.usuarioService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.usuario = response;
        this.getImageIfExists();
      },
      error =>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else{
      this.navCtrl.setRoot('HomePage');
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

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
  }

  getGalleryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
  }

  sendPicture(){
    this.usuarioService.uploadPicture(this.picture)
      .subscribe (response=>{
        this.picture = null;
        this.loadData();
      },
      error =>{
      });
  }

  cancel(){
    this.picture = null;
  }

}
