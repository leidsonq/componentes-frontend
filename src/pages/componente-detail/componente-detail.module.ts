import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponenteDetailPage } from './componente-detail';

@NgModule({
  declarations: [
    ComponenteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ComponenteDetailPage),
  ],
})
export class ComponenteDetailPageModule {}
