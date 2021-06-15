import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { ConjuntoDTO } from '../../models/conjunto.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { ConjuntoService } from '../../services/domain/conjunto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-new-conjunto',
  templateUrl: 'new-conjunto.html',
})
export class NewConjuntoPage {

  conj: ConjuntoDTO;
  fabMod: CategoriaDTO;
  mod: string;
  items: ConjuntoDTO[];
  exist: boolean;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeloService: CategoriaService,
    public conjuntoService: ConjuntoService,
    public alertC: AlertController,
    public formBuilder: FormBuilder) {

      this.formGroup = formBuilder.group({
        conjunto: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
      })
  }

  ionViewDidLoad() {
    this.mod = this.navParams.get('modelo');
    this.obterFabricante(this.mod);
  }
  //insere um novo conjunto no modelo recebido pelo parâmetro de navegação de página
  insertConjunto(descricao: string){
      this.findConjunto(descricao);
  }
  //faz uma busca no banco para obter o modelo referente ao id recebido como parâmetro na navegação
  obterFabricante(id: string){
    this.modeloService.findById(id)
      .subscribe (response=>{
        this.fabMod = response;
      },
      error => ({}));
  }

  //Verifica se o conjunto já está cadastrado no modelo 
  findConjunto(conjunto: string){
    
    let modelo_id = this.navParams.get('modelo');

    this.conjuntoService.findByModelo (modelo_id)
      .subscribe (response => {
        this.items = response ['conjuntos'];
      this.exist = false;
      for (var i=0; i<this.items.length; i++ ){
        if(this.items[i].descricao.toUpperCase() == conjunto.toUpperCase()){
            this.exist = true;
            this.navCtrl.setRoot('ConjuntosPage', {modelo: this.mod});
            let alert = this.alertC.create({
              title: 'Já cadastrado!',
              message: 'Conjunto já cadastrado para este modelo',
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
        this.InsertConjCaseNotExist(conjunto);
      }
      },
      error =>{});

  }

  //Inserir o conjunto caso ele não exista
  InsertConjCaseNotExist(descricao: string){
    this.conj= {
      id: '',
      descricao: descricao.toUpperCase(),
      fabricanteModelo: this.fabMod,
      codigoD: ""

   }
   this.conjuntoService.insert (this.conj)
     .subscribe(Response =>{
       console.log("Conjunto Criado!")
       this.navCtrl.setRoot('ConjuntosPage', {modelo: this.mod});
     },
     error => {});
  }

}
