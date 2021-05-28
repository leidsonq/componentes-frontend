import { calcProjectFileAndBasePath } from '@angular/compiler-cli';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-pesquisacomchave',
  templateUrl: 'pesquisacomchave.html',
})
export class PesquisacomchavePage {

  items: ComponenteDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public componenteService: ComponenteService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  }

  pesquisarPorPalavraChave (palavra: string, tipo: any){
    if(tipo==1){    
     if (palavra && palavra.trim() != ''){
      let loader = this.presentLoading();
       this.componenteService.findByChave(palavra)
       .subscribe (response => {
         this.items = response;
         loader.dismiss();
         this.loadImagesUrls();  
       },
       error =>{
        loader.dismiss();
       });
     }
    } 
    if(tipo == 2){
      if (palavra && palavra.trim() != ''){
        let loader = this.presentLoading();
        this.componenteService.findBySubStartWith(palavra)
        .subscribe (response => {
          this.items = response;
          loader.dismiss();
          this.loadImagesUrls();
        },
        error =>{
          loader.dismiss();
        });
      }
    }
  }

  loadImagesUrls(){
    for (var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.componenteService.getSmallImageFromBucket(item.codigoD)
        .subscribe(response =>{
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/${item.codigoD}-small.jpg`;
        },
        error =>{});
    }
  }

  showDetail(componente_id: string){
    this.navCtrl.push('ComponenteDetailPage', {componente_id: componente_id});
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    return loader;
  }
}
