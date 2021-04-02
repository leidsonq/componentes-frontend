import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';


@IonicPage()
@Component({
  selector: 'page-componentes',
  templateUrl: 'componentes.html',
})
export class ComponentesPage {

  items: ComponenteDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public componenteService: ComponenteService) {
  }

  ionViewDidLoad() {
    let conjunto_id = this.navParams.get('conjunto');
    this.componenteService.findByConjunto (conjunto_id)
      .subscribe (response => {
        this.items = response ['componentes'];
      },
      error =>{});
  }

}
