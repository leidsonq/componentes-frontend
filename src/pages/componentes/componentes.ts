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
         this.loadImagessSubUrls();
      },
      error =>{
        loader.dismiss();
      });
  }

  showComponentesSubConjunto (subconjunto_id: string) {
    this.navCtrl.push('SubcomponentesPage', {subconjunto: subconjunto_id});
  }

  //Carrega as imagens miniatura dos componentes
  loadImagesUrls(){
    for (var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.componenteService.getSmallImageFromBucket(item.codigoD)
        .subscribe(response =>{
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/${item.codigoD}.jpg`     
        },
        error =>{});
    }
  }

  //carrega as imagens minatura dos subconjuntos
  loadImagessSubUrls(){
    for (var i=0; i<this.items2.length; i++){
      let item = this.items2[i];
      this.componenteService.getSmallImageFromBucket(item.codigoD)
        .subscribe(response =>{
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/${item.codigoD}.jpg`     
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


  inicializarItens(){
    let conjunto_id = this.navParams.get('conjunto');
    this.componenteService.findByConjunto (conjunto_id)
      .subscribe (response => {
        this.items = response  ['componentes'];
        this.items2 = response  ['subConjunto'];
        this.loadImagesUrls();
        this.loadImagessSubUrls();
      },
      error =>{
      });

  }
  //faz a busca conforme pesquisa da search-bar de subConjuntos
  findSubConjunto(ev: any) {
    this.inicializarItens();
    const val = ev.target.value;
  
     // se o valor for uma string vazia não filtre os itens
     if (val && val.trim() != '') {
      this.subConjuntoService.findByPalavraChave(val, this.conj)
      .subscribe(response=>{
        this.items2 = response;
        this.loadImagessSubUrls();
      },
      error=>{});
  }

}

  //faz a busca conforme pesquisa da search-bar de Componentes
  findComponentes (ev: any) {
    this.inicializarItens();
    const val = ev.target.value;
  
     // se o valor for uma string vazia não filtre os itens
     if (val && val.trim() != '') {
      this.componenteService.findComInConj(val, this.conj)
      .subscribe(response=>{
        this.items = response;
        this.loadImagesUrls();
      },
      error=>{});
  }

}

}
