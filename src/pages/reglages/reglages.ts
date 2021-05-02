import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AnnoncesServices } from '../../services/annonces.service';
import { AuthService } from '../../services/auth.service';
/**
 * Generated class for the ReglagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reglages',
  templateUrl: 'reglages.html',
})
export class ReglagesPage{
  userForm:FormGroup;
  errorMessage:string=null;
  isAuth:boolean;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private formBuilder:FormBuilder,
     private authService:AuthService,
     private annoncesService:AnnoncesServices,
     private toastCtrl:ToastController,
     private alertCtrl:AlertController) {
      this.initForm();
     }



  ionViewWillEnter(){
    this.isAuth=this.authService.Authentificated();
  }

  initForm(){
    this.userForm=this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      passwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{8,}')]]
    })
  }

  onSubmitSignIn(){

    let user=this.userForm.value;
    this.authService.SignIn(user['email'],user['passwd']).then(
      (prenom:string)=>{
        let toast= this.toastCtrl.create({
          message:'Bienvenue '+prenom,
          duration:2000,
          position:'top'
        });
        toast.present();
       this.navCtrl.parent.select(1)  ; // redirection dans TabsPage vers le profil
      },(reject)=>{
        
        const alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: 'L\'adresse email ou le mot de passe sont invalides',
          buttons: ['D\'accord']
        });
        alert.present();
      }
      
    )
  }

  LogOut(){
    this.authService.LogOut().then(
      ()=>{
        let toast= this.toastCtrl.create({
          message:'A la prochaine !',
          duration:2000,
          position:'top'
        });
        toast.present();
      }
    );
    this.ionViewWillEnter();
  }

    



}
