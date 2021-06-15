import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-new-modelo',
  templateUrl: 'new-modelo.html',
})
export class NewModeloPage {

  fabMod: CategoriaDTO;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public alertC: AlertController,
    public formBuilder: FormBuilder) {

      this.formGroup = formBuilder.group({
        fab: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
        mod: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
      })
  }

  ionViewDidLoad() {
  }

  insertFabMod(fab: string, mod: string){
    this.fabMod= {
      id: '',
       fabricante: fab.toUpperCase(),
       modelo: mod.toUpperCase()
    }
    this.categoriaService.insert (this.fabMod)
      .subscribe(Response =>{
        this.navCtrl.setRoot('CategoriasPage');
        console.log("Modelo Criado!")
      },
      error => {
        if (error.status == 500) {
          this.navCtrl.setRoot('CategoriasPage');
        }
      });
  }

}
