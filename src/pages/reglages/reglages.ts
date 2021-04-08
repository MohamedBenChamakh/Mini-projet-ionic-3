import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilisateurService } from '../../services/utilisateur.service';
import { MonProfilPage } from '../mon-profil/mon-profil';

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

  userForm:FormGroup;
  errorMessage:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder:FormBuilder,private userService:UtilisateurService) {
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
    this.userService.SignIn(user['email'],user['passwd']).then(
      (resolve)=>{
       this.navCtrl.parent.select(1); // redirection dans TabsPage vers le profil
      },(reject)=>{
        this.errorMessage="L'adresse email ou le mot de passe sont invalides";
      }
    )
   
  }




}
