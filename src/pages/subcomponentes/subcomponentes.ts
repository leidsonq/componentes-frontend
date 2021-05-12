import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';


@IonicPage()
@Component({
  selector: 'page-subcomponentes',
  templateUrl: 'subcomponentes.html',
})
export class SubcomponentesPage {

  items: ComponenteDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public componenteService: ComponenteService) {
  }

  ionViewDidLoad() {
    let subconjunto_id = this.navParams.get('subconjunto');
    this.componenteService.findBySubConjunto (subconjunto_id)
      .subscribe (response => {
        this.items = response  ['componentes'];
      },
      error =>{});
  }

  showDetail(componente_id: string){
    this.navCtrl.push('ComponenteDetailPage', {componente_id: componente_id});
  }


}
