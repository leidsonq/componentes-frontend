import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { ConjuntoDTO } from '../../models/conjunto.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { ConjuntoService } from '../../services/domain/conjunto.service';


@IonicPage()
@Component({
  selector: 'page-new-conjunto',
  templateUrl: 'new-conjunto.html',
})
export class NewConjuntoPage {

  conj: ConjuntoDTO;
  fabMod: CategoriaDTO;
  mod: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeloService: CategoriaService,
    public conjuntoService: ConjuntoService) {
  }

  ionViewDidLoad() {
    this.mod = this.navParams.get('modelo');
    this.obterFabricante(this.mod);
  }
  //insere um novo conjunto no modelo recebido pelo parâmetro de navegação de página
  insertConjunto(descricao: string){
    this.conj= {
       id: '',
       descricao: descricao,
       fabricanteModelo: this.fabMod,
       codigoD: "531.01.3066"

    }
    this.conjuntoService.insert (this.conj)
      .subscribe(Response =>{
        console.log("Conjunto Criado!")
        this.navCtrl.setRoot('ConjuntosPage', {modelo: this.mod});
      },
      error => ({}));
  }
  //faz uma busca no banco para obter o modelo referente ao id recebido como parâmetro na navegação
  obterFabricante(id: string){
    this.modeloService.findById(id)
      .subscribe (response=>{
        this.fabMod = response;
      },
      error => ({}));
  }

}
