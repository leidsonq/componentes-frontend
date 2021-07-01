import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-componente-detail',
  templateUrl: 'componente-detail.html',
})
export class ComponenteDetailPage {

  item: ComponenteDTO;
  items: ComponenteDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public componenteService: ComponenteService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
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

  getImageUrlIfExists(){
    this.componenteService.getImageFromBucket(this.item.codigoD)
      .subscribe (response =>{
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/${this.item.codigoD}.jpg`
      },
      error => {});
  }

  getImageDetailsUrlIfExists(){
    this.componenteService.getDetailsImageFromBucket(this.item.codigoD)
      .subscribe (response =>{
        this.item.imageDetailsUrl = `${API_CONFIG.bucketBaseUrl}/${this.item.codigoD}-details.jpg`
      },
      error => {});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
