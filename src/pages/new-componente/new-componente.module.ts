import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewComponentePage } from './new-componente';

@NgModule({
  declarations: [
    NewComponentePage,
  ],
  imports: [
    IonicPageModule.forChild(NewComponentePage),
  ],
})
export class NewComponentePageModule {}
