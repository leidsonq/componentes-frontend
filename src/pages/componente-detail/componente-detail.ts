import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';

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
    public componenteService: ComponenteService) {
  }

  ionViewDidLoad() {
    let componente_id = this.navParams.get('componente_id');
    this.componenteService.findByChave(componente_id)
      .subscribe(response => {
        this.items = response;

        for (var i=0; i<this.items.length; i++){
          this.item = this.items[i];
        } 

        this.getImageUrlIfExists();
        this.getImageDetailsUrlIfExists();
      },
      error => {});
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

}
