import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Annonce } from '../../models/Annonce';
import { AnnoncePage } from '../annonce/annonce';
import { AnnoncesServices } from '../services/annonces.service';

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

  annonces : Annonce[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private annonceService:AnnoncesServices) {
  }

  ionViewWillEnter(){
    this.annonces=this.annonceService.annonces.slice();
  }

  onLoadAd(annonce:{nom:string,prix:number,description:string}){
    this.navCtrl.push(AnnoncePage,{annonce:annonce});
  }

}
