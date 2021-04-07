import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonProfilPage } from './mon-profil';

@NgModule({
  declarations: [
    MonProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(MonProfilPage),
  ],
})
export class MonProfilPageModule {}
