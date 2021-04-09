import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Annonce } from '../../models/Annonce';
import { AnnoncesServices } from '../../services/annonces.service';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the AjoutAnnoncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-annonce',
  templateUrl: 'ajout-annonce.html',
})
export class AjoutAnnoncePage implements OnInit {
  image:string;
  adForm:FormGroup;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private formBuilder:FormBuilder,
     private annoncesService:AnnoncesServices,
     private authService:AuthService,
     private alertCtrl:AlertController) {
  }

  ngOnInit(): void {
   this.image='data:image/jpeg;base64,' + this.navParams.get("image");
    this.initForm();
  }

  ionViewDidLoad() {}

  initForm(){
    this.adForm=this.formBuilder.group({
      nom:['',Validators.required],
      prix:[0,Validators.required],
      description:''
    })
  }

  onSubmit(){
    const form=this.adForm.value;
    this.annoncesService.ajouterAnnonce(new Annonce(form['nom'],form['prix'],form['description'],this.image,this.authService.utilisateur)).then(
      (resolve)=>{
        const alert = this.alertCtrl.create({
          title: 'Succés',
          subTitle: 'Votre annonce a été bien ajoutée !',
          buttons: ['D\'accord']
        });
        alert.present();
        this.navCtrl.pop();
      },(reject)=>{
        const alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: 'Une erreur est survenue lors de l\'ajout de l\'annonce',
          buttons: ['D\'accord']
        });
        alert.present();
      });

  }

  close(){
    this.navCtrl.pop();
  }
}
