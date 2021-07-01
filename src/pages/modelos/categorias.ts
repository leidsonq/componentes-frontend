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
  controle: boolean = false;

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
    this.controle= true;
    this.navCtrl.push('CategoriasPage');
  }
  //envia as estratégicas por email em forma de string
  enviaEstrategicas (id: string){
    let localUser = this.storage.getLocalUser();
    this.categoriaService.sendEstrategicas(id, localUser.email).subscribe (response =>{
      console.log("Enviado com sucesso!")
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
  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  controlador(item_id: string){
    if(this.controle==false){
      this.showConjuntos(item_id);
    }
  }

  delete (id: string){
    this.categoriaService.delete(id).subscribe (response =>{
      console.log("Excluído com sucesso!")
    },
    error => {}); 
    this.controle= true;
    this.navCtrl.push('CategoriasPage');
  }

  editar(id: string){
    this.controle= true;
    this.navCtrl.push('NewModeloPage', {modelo: id, tipo: 2});
  }

  inicializarItens(){
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
    error => {});
  }
  //faz a busca conforme pesquisa da search-bar
  findModelo(ev: any) {
    this.inicializarItens();
    const val = ev.target.value;
  
    // se o valor for uma string vazia não filtre os itens
    if (val && val.trim() != '') {
        this.categoriaService.findBySubStartWith(val)
        .subscribe(response=>{
          this.items = response;
        },
        error=>{});
    }

  }


  
}
