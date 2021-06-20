import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
  itemsSub :ComponenteDTO[];
  exist: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public SubconjuntoService: SubConjuntoService,
    public componenteService: ComponenteService,
    public alertC: AlertController) {
  }

  ionViewDidLoad() {
   this.subConjunto = this.navParams.get('subconjunto');
   this.obterSubConjunto(this.subConjunto);
  }
  //insere um novo componente no subconjunto passado como parametro
  insertComponente(item: string){

    this.componenteService.findByCodigo(item)
    .subscribe(response => {
      this.items = response;
      if(this.items.length==0){
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
      
      let subconjunto_id = this.navParams.get('subconjunto');

      this.SubconjuntoService.findById (subconjunto_id)
        .subscribe (response => {
          this.itemsSub = response ['componentes'];
  
        this.exist = false;
  
        for (var i=0; i<this.itemsSub.length; i++ ){
          if(this.itemsSub[i].codigoD == item){
              this.exist = true;
              this.navCtrl.setRoot('SubcomponentesPage', {subconjunto: subconjunto_id});
              let alert = this.alertC.create({
                title: 'Já cadastrado!',
                message: 'Componente já cadastrado para este Subconjunto',
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
        }
        },
        error =>{});
    },
    error => {});
  }
    //faz uma busca no banco para obter o subconjunto referente ao id recebido como parâmetro na navegação
    obterSubConjunto(id: string){
      this.SubconjuntoService.findById(id)
        .subscribe (response=>{
          this.subConj = response;
        },
        error => ({}));
    }

}
