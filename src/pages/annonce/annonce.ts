import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Annonce } from '../../models/Annonce';
import { Utilisateur } from '../../models/Utilisateur';
import { AnnoncesServices } from '../../services/annonces.service';
import { AuthService } from '../../services/auth.service';
import { ModifierAnnoncePage } from '../modifier-annonce/modifier-annonce';

/**
 * Generated class for the AnnoncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonce',
  templateUrl: 'annonce.html',
})
export class AnnoncePage {
  annonce : Annonce;
  utilisateur:Utilisateur;
  utilisateurSubscription:Subscription;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private modalCtrl:ModalController,
     private authService:AuthService,
     private annoncesServices:AnnoncesServices,
     private alertCtrl:AlertController) {   

  }
  
  ionViewWillEnter(){

    this.annonce=this.navParams.get("annonce");  
    this.annonce.description=this.annonce.description.toString().split(',');
    this.utilisateurSubscription=this.authService.utilisateurSubject.subscribe(
      (utilisateur: Utilisateur)=>{
        this.utilisateur=utilisateur;
      }
    )
    this.authService.emitUser();
  
  }

  modifier(){
    let modal=this.modalCtrl.create(ModifierAnnoncePage,{annonce:this.annonce});
    modal.present();
  }

  close(){
    this.navCtrl.pop();
  }
  supprimer(){
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer cet article ? cette action est iréversible',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.annoncesServices.supprimer(this.annonce.id).then(
              (resolve)=>{
                const alert = this.alertCtrl.create({
                  title: 'Succés',
                  subTitle: 'Votre annonce a été supprimée !',
                  buttons: ['D\'accord']
              }
            );
            alert.present();
            this.navCtrl.pop();
          })
        }
      
    }]});
    confirm.present();
   
  }


  ngOnDestroy() {
    this.utilisateurSubscription.unsubscribe();
  }
}
