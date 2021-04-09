import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Annonce } from '../../models/Annonce';
import { AnnoncesServices } from '../../services/annonces.service';
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

  annonces : Annonce[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController ,private annonceService:AnnoncesServices) {
    const loader = this.loadingCtrl.create({
      content: "chargement...",
      duration: 150
    });
    loader.present();
  }

  ionViewWillEnter(){
    this.annonces=this.annonceService.annonces.slice();
  }

  onLoadAd(annonce:{nom:string,prix:number,description:string}){
    this.navCtrl.push(AnnoncePage,{annonce:annonce});
  }

  getItems(event:any){

    this.ionViewWillEnter();

    const valeur=event.target.value;

    if(valeur && valeur.trim()!= ''){
      this.annonces=this.annonces.filter((annonce)=>{
        return (annonce.nom.toLowerCase().indexOf(valeur.toLowerCase()))>-1;
      })
    }
  }

}
