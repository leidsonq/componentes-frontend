import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-componente-detail',
  templateUrl: 'componente-detail.html',
})
export class ComponenteDetailPage {

  item: ComponenteDTO;
  items: ComponenteDTO[];
  picture: string;
  pictureDetails: string;
  pictureSend: string;
  cameraOn: boolean = false;
  componenteImage;
  componenteImageDetail;
  fileName: string;
  itemSelecionado: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public componenteService: ComponenteService,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public sanitizer: DomSanitizer) {
    this.componenteImage = 'assets/imgs/prod.jpg';
    this.componenteImageDetail = 'assets/imgs/prod.jpg';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let componente_id = this.navParams.get('componente_id');
    let loader = this.presentLoading();
    this.componenteService.findByCodigoD(componente_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
        this.getImageDetailsUrlIfExists();
        loader.dismiss();
      },
        error => {
          loader.dismiss();
        });
  }

  getImageUrlIfExists() {
    this.componenteService.getImageFromBucket(this.item.codigoD)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/${this.item.codigoD}.jpg`
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.componenteImage = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
        error => {
          this.componenteImage = 'assets/imgs/prod.jpg';
        });
  }

  getImageDetailsUrlIfExists() {
    this.componenteService.getDetailsImageFromBucket(this.item.codigoD)
      .subscribe(response => {
        this.item.imageDetailsUrl = `${API_CONFIG.bucketBaseUrl}/${this.item.codigoD}-details.jpg`
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.componenteImageDetail = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
        error => {
          this.componenteImageDetail = 'assets/imgs/prod.jpg';
        });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    })
  }

  getCameraPicture(tipo: string) {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      if (tipo == 'C') {
        this.picture = 'data:image/png;base64,' + imageData;
      }
      if (tipo == 'D') {
        this.pictureDetails = 'data:image/png;base64,' + imageData;
      }

      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture(tipo: string) {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      if (tipo == 'C') {
        this.picture = 'data:image/png;base64,' + imageData;
      }
      if (tipo == 'D') {
        this.pictureDetails = 'data:image/png;base64,' + imageData;
      }
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  //Envia a imagem capturada da camera ou galeria para o S3
  sendPicture(tipo: string) {
    let componente_id = this.navParams.get('componente_id');
    this.componenteService.findByCodigoD(componente_id)
      .subscribe(response => {
        let componente = response;
        if (tipo == 'C') {
          this.fileName = componente.codigoD + '.jpg';
          this.pictureSend = this.picture;
        }
        if (tipo == 'D') {
          this.fileName = componente.codigoD + '-details.jpg';
          this.pictureSend = this.pictureDetails;
        }

        this.componenteService.uploadPicture(this.pictureSend, this.fileName)
          .subscribe(response => {
            if (tipo == 'C') {
              this.picture = null;
              this.getImageUrlIfExists();
            }
            if (tipo == 'D') {
              this.pictureDetails = null;
              this.getImageDetailsUrlIfExists();
            }
          },
            error => {
            });
      },
        error => { });
  }

  cancel(tipo: string) {
    if (tipo == 'C') {
      this.picture = null;
    }
    if (tipo == 'D') {
      this.pictureDetails = null;
    }

  }
  itemSelect() {
    if (this.itemSelecionado == true) {
      this.itemSelecionado = false;
    } else {
      this.itemSelecionado = true;
    }

  }

}
