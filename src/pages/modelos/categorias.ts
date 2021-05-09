import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;

    },
    error => {});
  }

  showConjuntos (modelo_id: string) {
    this.navCtrl.push('ConjuntosPage', {modelo: modelo_id});
  }

  enviaDecomposicao (id: string){
    let localUser = this.storage.getLocalUser();
    this.categoriaService.sendDecomposicao(id, localUser.email).subscribe (response =>{
      console.log("Enviado com sucesso!")
    },
    error => {}); 
  }

  enviaEstrategicas (id: string){
    let localUser = this.storage.getLocalUser();
    this.categoriaService.sendEstrategicas(id, localUser.email).subscribe (response =>{
      console.log("Enviado com sucesso!")
    },
    error => {}); 
  }
}
