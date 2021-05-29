import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewModeloPage } from './new-modelo';

@NgModule({
  declarations: [
    NewModeloPage,
  ],
  imports: [
    IonicPageModule.forChild(NewModeloPage),
  ],
})
export class NewModeloPageModule {}
