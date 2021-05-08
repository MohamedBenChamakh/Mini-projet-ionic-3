import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular';
import {  IonicPage, NavController, NavParams, ModalController, ToastController  } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';
import { Annonce } from '../../models/Annonce';
import { Utilisateur } from '../../models/Utilisateur';
import { AnnoncesServices } from '../../services/annonces.service';
import { AuthService } from '../../services/auth.service';
import { AjoutAnnoncePage } from '../ajout-annonce/ajout-annonce';
import { AnnoncePage } from '../annonce/annonce';

/**
 * Generated class for the MonProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mon-profil',
  templateUrl: 'mon-profil.html'
})
export class MonProfilPage {

  utilisateur:Utilisateur;
  utilisateurSubscription:Subscription;

  annonces:Annonce[];
  annoncesSubscription:Subscription;

  buttonDisabled:boolean=false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera:Camera,
    private annonceService:AnnoncesServices,
    private authService:AuthService,
    private toastCtrl:ToastController,
    private modalCtrl:ModalController) {

        this.utilisateurSubscription=this.authService.utilisateurSubject.subscribe(
          (utilisateur: Utilisateur)=>{
            this.utilisateur=utilisateur;
          }
        )
        this.authService.emitUser();
      

    }

    ionViewWillEnter(){
      this.annonceService.loadMesAnnonces(+this.utilisateur.id).then((annonces:Annonce[])=>{
        this.annonces=annonces;
      })  
    }

 

  ionViewCanEnter() {
    return this.authService.Authentificated();
  }


  doRefresh(event){
    setTimeout(()=>{
      this.annonceService.loadMesAnnonces(+this.utilisateur.id).then((annonces:Annonce[])=>{
        this.annonces=annonces;
      })  
      event.complete() ;
    },1000);
    
  }

  openCamera(){
    this.buttonDisabled=!this.buttonDisabled;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {  

      if(imageData){
        this.buttonDisabled=!this.buttonDisabled;
        let toast= this.toastCtrl.create({
          message:'L\'image a été bien importée',
          duration:2000,
          position:'top'
        });
        toast.present();
        let imageURL = (<any>window).Ionic.WebView.convertFileSrc(imageData);
        let modal =this.modalCtrl.create(AjoutAnnoncePage,{image: imageURL});
        modal.onDidDismiss(()=>{
          this.ionViewWillEnter();
        })
        modal.present();
      }

    }).catch((error) => {

      this.toastCtrl.create({
        message: error.message,
        duration:3000,
        position:'bottom'
      }).present();

    });
  }

  openGallery(){ 
    this.buttonDisabled=!this.buttonDisabled;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
    
      if(imageData){
        this.buttonDisabled=!this.buttonDisabled;
        let toast= this.toastCtrl.create({
          message:'L\'image a été bien importée',
          duration:2000, 
          position:'top'
        });
        toast.present();
      let imageURL = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      let modal =this.modalCtrl.create(AjoutAnnoncePage,{image: imageURL});
      modal.onDidDismiss(()=>{
        this.ionViewWillEnter();
      })
      modal.present();
      }

    }).catch(
      (error) => {
  
      this.toastCtrl.create({
        message: error.message,
        duration:3000,
        position:'bottom'
      }).present();
      

    });
  }
  
  onLoadAd(annonce:Annonce){ 
    let modal=this.modalCtrl.create(AnnoncePage,{annonce:annonce});
    modal.onDidDismiss(()=>{
      this.ionViewWillEnter()
    })
    modal.present();    
  }

  ngOnDestroy() {
    this.utilisateurSubscription.unsubscribe();
    this.annoncesSubscription.unsubscribe();
  }

}
