import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
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
  annoncesSubscription : Subscription;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private annonceService:AnnoncesServices) {}

  ionViewWillEnter(){
    this.annoncesSubscription=this.annonceService.annoncesSubject.subscribe(
      (annonces:Annonce[])=>{
        this.annonces=annonces.slice();
      }
    );
    this.annonceService.emitAnnonces();

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
