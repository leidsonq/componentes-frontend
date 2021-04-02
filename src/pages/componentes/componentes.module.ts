import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentesPage } from './componentes';

@NgModule({
  declarations: [
    ComponentesPage,
  ],
  imports: [
    IonicPageModule.forChild(ComponentesPage),
  ],
})
export class ComponentesPageModule {}
