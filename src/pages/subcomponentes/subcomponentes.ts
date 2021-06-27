import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-subcomponentes',
  templateUrl: 'subcomponentes.html',
})
export class SubcomponentesPage {

  items: ComponenteDTO[];
  subConj: string;
  controle: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public componenteService: ComponenteService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
    this.subConj = this.navParams.get('subconjunto');

  }
  loadData(){
    let subconjunto_id = this.navParams.get('subconjunto');
    let loader = this.presentLoading();
    this.componenteService.findBySubConjunto (subconjunto_id)
      .subscribe (response => {
        this.items = response  ['componentes'];
        loader.dismiss();
        this.loadImagesUrls();
      },
      error =>{
        loader.dismiss();
      });
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

  insertNewComponente(){
    this.navCtrl.push('NewComponentePage', {subconjunto: this.subConj});
  }

  loadImagesUrls(){
    for (var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.componenteService.getSmallImageFromBucket(item.codigoD)
        .subscribe(response =>{
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/${item.codigoD}-small.jpg`     
        },
        error =>{});
    }
  }

  controlador(componente_id: string){
    if(this.controle==false){
      this.showDetail(componente_id);
    }
  }

  delete(id: string){
    this.componenteService.delete(id).subscribe (response =>{
      console.log("Excluído com sucesso!")
    },
    error => {}); 
    this.controle= true
    this.navCtrl.push('SubcomponentesPage', {subconjunto: this.subConj});
  }
}
