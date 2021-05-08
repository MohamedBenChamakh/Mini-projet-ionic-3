import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierAnnoncePage } from './modifier-annonce';

@NgModule({
  declarations: [
    ModifierAnnoncePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifierAnnoncePage),
  ],
})
export class ModifierAnnoncePageModule {}
