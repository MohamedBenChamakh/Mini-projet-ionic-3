import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Annonce } from '../../models/Annonce';
import { Utilisateur } from '../../models/Utilisateur';
import { AnnoncesServices } from '../../services/annonces.service';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the MonProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mon-profil',
  templateUrl: 'mon-profil.html',
  providers: [Camera]
})
export class MonProfilPage {
  utilisateur:Utilisateur;
  annonces:Annonce[];
  annoncesSubscription:Subscription;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController,private camera:Camera,private annonceService:AnnoncesServices,private authService:AuthService) {
    const loader = this.loadingCtrl.create({
      content: "chargement...",
      duration: 150
    });
    loader.present();
    this.utilisateur=new Utilisateur(+sessionStorage.getItem('id'),sessionStorage.getItem('nom'),sessionStorage.getItem('prenom'),sessionStorage.getItem('email'),sessionStorage.getItem('passwd'),sessionStorage.getItem('tel'));
    this.annoncesSubscription=this.annonceService.annoncesSubject.subscribe(
      (annonces:Annonce[])=>{
        this.annonces=annonces.filter(element=> element.utilisateur==this.utilisateur );;
      }
    );
  }

  ionViewDidLoad(){
  }

  ionViewCanEnter() {
    return this.authService.Authentificated();
  }


  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    // this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    // this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }


}
