import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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
  infiniteAnnonces:Annonce[];
  annonces : Annonce[];
  annoncesSubscription : Subscription;
  infiniteScroll:any;

  constructor(
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
     public navCtrl: NavController,
     public navParams: NavParams,
     private annonceService:AnnoncesServices) {

      this.annoncesSubscription=this.annonceService.annoncesSubject.subscribe(
        (annonces:Annonce[])=>{
          this.annonces=annonces.slice();
          this.infiniteAnnonces=annonces.slice(0,2);
        }
      );
      this.annonceService.emitAnnonces();
     }



  ionViewWillEnter(){
    setTimeout(()=>{this.annonceService.emitAnnonces()},1000)
  }

  doRefresh(event){
    setTimeout(()=>{
      this.annonceService.emitAnnonces();
      if(this.infiniteScroll!=null)
      this.infiniteScroll.enable(true);
      event.complete() ;
    },1000);
    
  }

  doInfinite(event){
    if(this.infiniteAnnonces.length==this.annonces.length){
      this.toastCtrl.create({
        message:'Liste terminée',
        position:'top',
        duration:2000
      }).present();
      this.infiniteScroll=event;
       event.enable(false);
      event.complete();
    }else{
      setTimeout(()=>{
        for(let i=this.infiniteAnnonces.length;i<this.annonces.length && i<i+2;i++){
          this.infiniteAnnonces.push(this.annonces[i]);
        }
        event.complete();},1000)
    }

  }

  onLoadAd(annonce:Annonce){
    let loading = this.loadingCtrl.create({
      content: 'Chargement...' 
    });
    loading.present();
      this.navCtrl.push(AnnoncePage,{annonce:annonce});
      loading.dismiss();
  
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
