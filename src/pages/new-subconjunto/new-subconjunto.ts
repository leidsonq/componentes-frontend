import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
  itemsSub: SubConjuntoDTO[];
  itemsCom: ComponenteDTO[];
  itemsExiste: ComponenteDTO[];
  exist: boolean;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public subConjuntoService: SubConjuntoService,
     public conjuntoService: ConjuntoService,
     public componenteService: ComponenteService,
     public alertC: AlertController) {
  }

  ionViewDidLoad() {
    this.conjunto = this.navParams.get('conjunto');
    this.obterConjunto(this.conjunto);
  }

  //insere um novo subConjunto ou componente no conjunto recebido pelo parâmetro de navegação de página
  insertComponenteOuSubConjunto(codigoD: string, tipo: any){

    if(codigoD==null){
      let alert = this.alertC.create({
        title: 'Informe um item válido!',
        message: 'Não foi informado um item',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      alert.present();  
     } else if (tipo!=1 && tipo!=2){
      let alert = this.alertC.create({
        title: 'Selecione uma opção para o tipo do item!',
        message: 'Subconjunto ou Componente',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      alert.present();
     } else{
      this.componenteService.findByCodigo(codigoD)
      .subscribe(response=> {
        this.itemsExiste = response;
        if(this.itemsExiste.length==0){
          let alert = this.alertC.create({
            title: 'Informe um item válido!',
            message: 'O item não existe ou não está cadastrado no banco de dados',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'OK'
              }
            ]
          });
          alert.present();
        }
      })
     }

    this.findComponenteOuSubSConjunto(codigoD, tipo);
  }


  //Verifica se o subConjunto ou componente já está no conjunto 
  findComponenteOuSubSConjunto (codigoD: string, tipo: any){
    
    let conjunto_id = this.navParams.get('conjunto');

    this.subConjuntoService.findByConjunto (conjunto_id)
      .subscribe (response => {
        this.itemsSub = response ['subConjunto'];
        this.itemsCom = response ['componentes'];

      this.exist = false;

      for (var i=0; i<this.itemsSub.length; i++ ){
        if(this.itemsSub[i].codigoD == codigoD){
            this.exist = true;
            this.navCtrl.setRoot('ComponentesPage', {conjunto: conjunto_id});
            let alert = this.alertC.create({
              title: 'Já cadastrado!',
              message: 'SubConjunto já cadastrado para este conjunto',
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'OK'
                }
              ]
            });
            alert.present();  
        }
      }

      for (var j=0; j<this.itemsCom.length; j++ ){
        if(this.itemsCom[j].codigoD == codigoD){
            this.exist = true;
            this.navCtrl.setRoot('ComponentesPage', {conjunto: conjunto_id});
            let alert = this.alertC.create({
              title: 'Já cadastrado!',
              message: 'Componente já cadastrado para este conjunto',
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'OK'
                }
              ]
            });
            alert.present();  
        }
      }

      if(!this.exist){
        this.inserirNovoSubconjuntoOuComponente(codigoD, tipo);
      }
      },
      error =>{});

  }

  //insere um novo subconjunto ou componente no conjunto recebido pelo parâmetro de navegação de página
  inserirNovoSubconjuntoOuComponente(item: string, tipo: any){

    this.componenteService.findByCodigo(item)
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
