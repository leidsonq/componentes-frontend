import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConjuntoDTO } from '../../models/conjunto.dto';
import { ConjuntoService } from '../../services/domain/conjunto.service';

@IonicPage()
@Component({
  selector: 'page-conjuntos',
  templateUrl: 'conjuntos.html',
})
export class ConjuntosPage {

  items: ConjuntoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public conjuntoService: ConjuntoService) {
  }

  ionViewDidLoad() {
    let modelo_id = this.navParams.get('modelo');
    this.conjuntoService.findByModelo (modelo_id)
      .subscribe (response => {
        this.items = response ['conjuntos'];
      },
      error =>{});
  }

}
