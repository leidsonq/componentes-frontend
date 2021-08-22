import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPhotoPage } from './new-photo';

@NgModule({
  declarations: [
    NewPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPhotoPage),
  ],
})
export class NewPhotoPageModule {}
