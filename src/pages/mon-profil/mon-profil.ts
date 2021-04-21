import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
export class MonProfilPage implements OnInit{

  utilisateur:Utilisateur;
  utilisateurSubscription:Subscription;

  annonces:Annonce[];
  annoncesSubscription:Subscription;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera:Camera,
    private annonceService:AnnoncesServices,
    private authService:AuthService,
    private toastCtrl:ToastController,
    private modalCtrl:ModalController) {}

  ngOnInit():void{

    this.utilisateurSubscription=this.authService.utilisateurSubject.subscribe(
      (utilisateur: Utilisateur)=>{
        this.utilisateur=utilisateur;
      }
    )
    this.authService.loadUserContent();
    
    this.annoncesSubscription=this.annonceService.mesAnnoncesSubject.subscribe(
          (annonces:Annonce[])=>{
            this.annonces=annonces;
          }
    );
    
    this.annonceService.loadMesAnnonces(this.utilisateur.id);
  
  }

  ionViewCanEnter() {
    return this.authService.Authentificated();
  }


  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {  

      if(imageData){
        this.modalCtrl.create(AjoutAnnoncePage,{image: imageData}).present();
      }
    this.camera.cleanup();
    }).catch((error) => {

      this.toastCtrl.create({
        message: error.message,
        duration:3000,
        position:'bottom'
      }).present();

      this.camera.cleanup();
    });
  }

  openGallery(){ 
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
    
      if(imageData){
       this.modalCtrl.create(AjoutAnnoncePage,{image: imageData}).present();
        
      }

     this.camera.cleanup();
    }).catch(
      (error) => {
  
      this.toastCtrl.create({
        message: error.message,
        duration:3000,
        position:'bottom'
      }).present();
      

     this.camera.cleanup();
    });
  }
  
  onLoadAd(annonce:Annonce){ 
    this.navCtrl.push(AnnoncePage,{annonce:annonce});
  }

  ngOnDestroy() {
    this.utilisateurSubscription.unsubscribe();
    this.annoncesSubscription.unsubscribe();
  }

}
