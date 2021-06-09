import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponenteDTO } from '../../models/componente.dto';
import { ConjuntoDTO } from '../../models/conjunto.dto';
import { SubConjuntoDTO } from '../../models/subconjunto.dto';
import { ComponenteService } from '../../services/domain/componente.service';
import { ConjuntoService } from '../../services/domain/conjunto.service';
import { SubConjuntoService } from '../../services/domain/subconjunto.service';

@IonicPage()
@Component({
  selector: 'page-new-subconjunto',
  templateUrl: 'new-subconjunto.html',
})
export class NewSubconjuntoPage {

  sub: SubConjuntoDTO;	
  conj: ConjuntoDTO;
  conjunto: string;
  componente: ComponenteDTO;
  obj: ComponenteDTO;
  items: ComponenteDTO[];

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public subConjuntoService: SubConjuntoService,
     public conjuntoService: ConjuntoService,
     public componenteService: ComponenteService) {
  }

  ionViewDidLoad() {
    this.conjunto = this.navParams.get('conjunto');
    this.obterConjunto(this.conjunto);
  }
  //insere um novo subconjunto ou componente no conjunto recebido pelo parâmetro de navegação de página
  inserirNovoSubconjuntoOuComponente(item: string, tipo: any){

    this.componenteService.findByChave(item)
      .subscribe(response => {
        this.items = response;
        for (var i=0; i<this.items.length; i++){
            this.obj = this.items[i];

            if(tipo == 1){
              this.componente= {
                id: '',
                descricao: this.obj.descricao,
                codigoD: this.obj.codigoD,
                conjunto: this.conj,
                subConjunto: null
                
              }
              this.componenteService.insert (this.componente)
               .subscribe(Response =>{
                 console.log("Componente Criado!");
                 this.navCtrl.setRoot('ComponentesPage', {conjunto: this.conjunto});
               },
              error => ({}));
            }    
        
            if (tipo == 2){
              this.sub= {
                id: '',
                descricao: this.obj.descricao,
                conjunto: this.conj,
                codigoD: this.obj.codigoD
              }
              this.subConjuntoService.insert (this.sub)
               .subscribe(Response =>{
                 console.log("Subconjunto Criado!");
                 this.navCtrl.setRoot('ComponentesPage', {conjunto: this.conjunto});
               },
              error => ({}));
            }
        } 
      },
      error => {
        
      });
  }
  //faz uma busca no banco para obter o conjunto referente ao id recebido como parâmetro na navegação
  obterConjunto(id: string){
    this.conjuntoService.findById(id)
      .subscribe (response=>{
        this.conj = response;
      },
      error => ({}));
  }

}
