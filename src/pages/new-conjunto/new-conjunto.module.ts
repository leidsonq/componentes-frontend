import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewConjuntoPage } from './new-conjunto';

@NgModule({
  declarations: [
    NewConjuntoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewConjuntoPage),
  ],
})
export class NewConjuntoPageModule {}
