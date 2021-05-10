import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponenteDTO } from '../../models/componente.dto';

@IonicPage()
@Component({
  selector: 'page-componente-detail',
  templateUrl: 'componente-detail.html',
})
export class ComponenteDetailPage {

  item: ComponenteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = {
      id: "1",
      descricao: "Motor Fanuc",
      codigoD: "531.02.3325"
    }
  }

}
