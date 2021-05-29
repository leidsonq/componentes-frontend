import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-new-modelo',
  templateUrl: 'new-modelo.html',
})
export class NewModeloPage {

  fabMod: CategoriaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
  }

  insertFabMod(fab: string, mod: string){
    this.fabMod= {
      id: '',
       fabricante: fab,
       modelo: mod
    }
    this.categoriaService.insert (this.fabMod)
      .subscribe(Response =>{
        console.log("Modelo Criado!")
      },
      error => ({}));
  }

}
