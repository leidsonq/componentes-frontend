import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponenteService } from '../../services/domain/componente.service';

@IonicPage()
@Component({
  selector: 'page-new-photo',
  templateUrl: 'new-photo.html',
})
export class NewPhotoPage {

  cameraOn: boolean = false;
  picture: string;
  fileName: string;
  pictureSend: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public componenteService: ComponenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPhotoPage');
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
      this.cameraOn = false;
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
      this.cameraOn = false;
    });
  }

  //Envia a imagem capturada da camera ou galeria para o S3
  sendPicture() {

    this.fileName = this.navParams.get('nome')+".jpg";
    this.pictureSend = this.picture;

    this.componenteService.uploadPicture(this.pictureSend, this.fileName)
      .subscribe(response => {
        this.picture = null;
        if (this.navParams.get('page') == 'ComponenteDetailPage'){
          let componente_id = this.navParams.get('componente_id');
          this.navCtrl.push(this.navParams.get('page'), {componente_id});
        }else{
          this.navCtrl.push(this.navParams.get('page'));
        }
        
      },
        error => {
        });
    
    
  }
  //descarta a imagem fotografada
  cancel() {
    this.picture = null;
  }
}


