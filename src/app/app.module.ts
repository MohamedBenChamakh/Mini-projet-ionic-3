
import { DatabaseService } from './../services/database.service';

import { Camera } from '@ionic-native/camera';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ReglagesPage } from '../pages/reglages/reglages';
import { MonProfilPage } from '../pages/mon-profil/mon-profil';
import { AccueilPage } from '../pages/accueil/accueil';
import { TabsPage } from '../pages/tabs/tabs';
import { AnnoncePage } from '../pages/annonce/annonce';
import { AnnoncesServices } from '../services/annonces.service';
import { AuthService } from '../services/auth.service';
import { AjoutAnnoncePage } from '../pages/ajout-annonce/ajout-annonce';
import { SQLite } from '@ionic-native/sqlite';


@NgModule({
  declarations: [
    MyApp,
    ReglagesPage,
    MonProfilPage,
    AccueilPage,
    AnnoncePage,
    TabsPage,
    AjoutAnnoncePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReglagesPage,
    MonProfilPage,
    AccueilPage,
    AnnoncePage,
    TabsPage,
    AjoutAnnoncePage
  ],
  providers: [
    AuthService,
    AnnoncesServices,
    StatusBar,
    SplashScreen,
    Camera,
    SQLite,
    DatabaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
