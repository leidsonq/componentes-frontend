import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { StorageService } from '../../services/storage.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];
  fabMod: CategoriaDTO;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public storage: StorageService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let loader = this.presentLoading();
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
      loader.dismiss();

    },
    error => {
      loader.dismiss();
    });
  }

  //direciona para a pag de conjuntos passando o id o modelo selecionado
  showConjuntos (modelo_id: string) {
    this.navCtrl.push('ConjuntosPage', {modelo: modelo_id});
  }

  //envia a decomposicao por email em forma de string
  enviaDecomposicao (id: string){
    let localUser = this.storage.getLocalUser();
    this.categoriaService.sendDecomposicao(id, localUser.email).subscribe (response =>{
      console.log("Enviado com sucesso!")
    },
    error => {}); 
  }
   //envia as estratégicas por email em forma de string
  enviaEstrategicas (id: string){
    let localUser = this.storage.getLocalUser();
    this.categoriaService.sendEstrategicas(id, localUser.email).subscribe (response =>{
      console.log("Enviado com sucesso!")
    },
    error => {}); 
  }
  
  insertFabMod(){
    this.fabMod= {
      id: '',
       fabricante: 'OKUMA',
       modelo: "LVT400"
    }
    this.categoriaService.insertNewModelo (this.fabMod);
    console.log(this.fabMod);
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
