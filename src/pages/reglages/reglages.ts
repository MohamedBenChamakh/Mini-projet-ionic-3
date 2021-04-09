import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
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
export class ReglagesPage implements OnInit{
  darkMode=false;
  userForm:FormGroup;
  errorMessage:string=null;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private loadingCtrl:LoadingController,
     private formBuilder:FormBuilder,
     private authService:AuthService,
     private alertCtrl:AlertController) {
    const loader = this.loadingCtrl.create({
      content: "chargement...",
      duration: 150
    });
    loader.present();
  }

  ngOnInit(): void {
    this.initForm();
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
      (resolve)=>{
       this.navCtrl.parent.select(1); // redirection dans TabsPage vers le profil
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
    this.authService.LogOut();
  }

  Authentificated(){
    return this.authService.Authentificated();
  }



}
