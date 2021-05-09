import { calcProjectFileAndBasePath } from '@angular/compiler-cli';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ComponenteDTO } from '../../models/componente.dto';
import { ComponenteService } from '../../services/domain/componente.service';

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
    public componenteService: ComponenteService) {
  }

  ionViewDidLoad() {
  }

  pesquisarPorPalavraChave (palavra: string, tipo: any){
    console.log(tipo);

    if(tipo==1){    
     if (palavra && palavra.trim() != ''){
       this.componenteService.findByChave(palavra)
       .subscribe (response => {
         this.items = response;
         this.loadImagesUrls();  
       },
       error =>{
         console.log(error);
       });
     }
    } 
    if(tipo == 2){
      if (palavra && palavra.trim() != ''){
        this.componenteService.findBySubStartWith(palavra)
        .subscribe (response => {
          this.items = response;
          this.loadImagesUrls();
        },
        error =>{
          console.log(error);
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

}
