import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@IonicPage()
@Component({
  selector: 'page-componentes',
  templateUrl: 'componentes.html',
})
export class ComponentesPage {

  items: ComponenteDTO[];
  items2: ComponenteDTO[];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public componenteService: ComponenteService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let conjunto_id = this.navParams.get('conjunto');
    let loader = this.presentLoading();
    this.componenteService.findByConjunto (conjunto_id)
      .subscribe (response => {
        this.items = response  ['componentes'];
        this.items2 = response  ['subConjunto'];
        loader.dismiss();
        this.loadImagesUrls();
      },
      error =>{
        loader.dismiss();
      });
  }

  showComponentesSubConjunto (subconjunto_id: string) {
    this.navCtrl.push('SubcomponentesPage', {subconjunto: subconjunto_id});
  }

  loadImagesUrls(){
    for (var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.componenteService.getSmallImageFromBucket(item.codigoD)
        .subscribe(response =>{
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/${item.codigoD}-small.jpg`
          console.log(item.codigoD);
          
        },
        error =>{});
    }
  }

  showDetail(componente_id: string){
    this.navCtrl.push('ComponenteDetailPage', {componente_id: componente_id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
