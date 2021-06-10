import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponenteDTO } from '../../models/componente.dto';
import { SubConjuntoDTO } from '../../models/subconjunto.dto';
import { ComponenteService } from '../../services/domain/componente.service';
import { SubConjuntoService } from '../../services/domain/subconjunto.service';

@IonicPage()
@Component({
  selector: 'page-new-componente',
  templateUrl: 'new-componente.html',
})
export class NewComponentePage {

  subConj: SubConjuntoDTO;
  subConjunto: string;
  componente: ComponenteDTO;
  items: ComponenteDTO[];
  obj: ComponenteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public SubconjuntoService: SubConjuntoService,
    public componenteService: ComponenteService) {
  }

  ionViewDidLoad() {
   this.subConjunto = this.navParams.get('subconjunto');
   this.obterSubConjunto(this.subConjunto);
  }
  //insere um novo componente no subconjunto passaso como parametro
  insertComponente(item: string){

    this.componenteService.findByChave(item)
    .subscribe(response => {
      this.items = response;
      for (var i=0; i<this.items.length; i++){
          this.obj = this.items[i];

        this.componente= {
          id: '',
          descricao: this.obj.descricao,
          codigoD: this.obj.codigoD,
          conjunto: null,
          subConjunto: this.subConj  
        }
        this.componenteService.insert (this.componente)
        .subscribe(Response =>{
          console.log("Componente Criado!");
          this.navCtrl.setRoot('SubcomponentesPage', {subconjunto: this.subConjunto});
        },
        error => ({}));
      }
    },
    error => {});
  }
    //faz uma busca no banco para obter o conjunto referente ao id recebido como parâmetro na navegação
    obterSubConjunto(id: string){
      this.SubconjuntoService.findById(id)
        .subscribe (response=>{
          this.subConj = response;
        },
        error => ({}));
    }

}
