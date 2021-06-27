import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { SubConjuntoService } from '../../services/domain/subconjunto.service';


@IonicPage()
@Component({
  selector: 'page-componentes',
  templateUrl: 'componentes.html',
})
export class ComponentesPage {

  items: ComponenteDTO[];
  items2: ComponenteDTO[];
  conj: string;
  controle: boolean = false;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public componenteService: ComponenteService,
    public loadingCtrl: LoadingController,
    public subConjuntoService: SubConjuntoService) {
  }

  ionViewDidLoad() {
    this.loadData();
    this.conj = this.navParams.get('conjunto');
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

  insertNewComponente(){
    this.navCtrl.push('NewSubconjuntoPage', {conjunto: this.conj});
  }

  deleteComponente(id: string){
    this.componenteService.delete(id).subscribe (response =>{
      console.log("Excluído com sucesso!")
    },
    error => {}); 
    this.controle= true
    this.navCtrl.push('ComponentesPage', {conjunto: this.conj});
  }

  deleteSubConjunto(id: string){
    this.subConjuntoService.delete(id).subscribe (response =>{
      console.log("Excluído com sucesso!")
    },
    error => {}); 
    this.controle= true
    this.navCtrl.push('ComponentesPage', {conjunto: this.conj});
  }

  controlador(componente_id: string){
    if(this.controle==false){
      this.showDetail(componente_id);
    }
  }

  controladorSubConjunto(subconjunto_id: string){
    if(this.controle==false){
      this.showComponentesSubConjunto (subconjunto_id);
    }
  }

}
