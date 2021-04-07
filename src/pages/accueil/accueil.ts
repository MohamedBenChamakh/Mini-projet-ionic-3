import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnnoncePage } from '../annonce/annonce';

/**
 * Generated class for the AccueilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})
export class AccueilPage {

  annonces=[
    {
      nom:"Vélo",
      prix:200,
      description:"lorem upsum"
    },
    {
      nom:"radio",
      prix:30,
      description:"lorem upsum"
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onLoadAd(annonce:{nom:string,prix:number,description:string}){
    this.navCtrl.push(AnnoncePage,{annonce:annonce});
  }

}
