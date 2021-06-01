import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConjuntoDTO } from '../../models/conjunto.dto';
import { ConjuntoService } from '../../services/domain/conjunto.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-conjuntos',
  templateUrl: 'conjuntos.html',
})
export class ConjuntosPage {

  items: ConjuntoDTO[];
  mod: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public conjuntoService: ConjuntoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
    this.mod = this.navParams.get('modelo');
    
  }

  loadData(){
    let modelo_id = this.navParams.get('modelo');
    let loader = this.presentLoading()
    this.conjuntoService.findByModelo (modelo_id)
      .subscribe (response => {
        this.items = response ['conjuntos'];
        loader.dismiss();
      },
      error =>{
        loader.dismiss();
      });
  }

  showComponentes (conjunto_id: string) {
    this.navCtrl.push('ComponentesPage', {conjunto: conjunto_id});
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  insertNewConjunto(){
    this.navCtrl.push('NewConjuntoPage', {modelo: this.mod});
  }

}
