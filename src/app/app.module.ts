import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReglagesPage } from '../pages/reglages/reglages';
import { MonProfilPage } from '../pages/mon-profil/mon-profil';
import { AccueilPage } from '../pages/accueil/accueil';
import { TabsPage } from '../pages/tabs/tabs';
import { AnnoncePage } from '../pages/annonce/annonce';
import { AnnoncesServices } from '../services/annonces.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReglagesPage,
    MonProfilPage,
    AccueilPage,
    AnnoncePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReglagesPage,
    MonProfilPage,
    AccueilPage,
    AnnoncePage,
    TabsPage
  ],
  providers: [
    AnnoncesServices,
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
