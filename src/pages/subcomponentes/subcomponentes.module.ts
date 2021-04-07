import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubcomponentesPage } from './subcomponentes';

@NgModule({
  declarations: [
    SubcomponentesPage,
  ],
  imports: [
    IonicPageModule.forChild(SubcomponentesPage),
  ],
})
export class SubcomponentesPageModule {}
