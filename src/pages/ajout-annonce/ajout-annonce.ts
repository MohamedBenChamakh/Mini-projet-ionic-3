import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams, normalizeURL, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Annonce } from '../../models/Annonce';
import { Utilisateur } from '../../models/Utilisateur';
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
  utilisateur:Utilisateur;
  utilisateurSubscription:Subscription;
  
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private formBuilder:FormBuilder,
     private annoncesService:AnnoncesServices,
     private toastCtrl:ToastController,
     private authService:AuthService,
     private alertCtrl:AlertController) {
  }

  ngOnInit(): void {
    this.utilisateurSubscription=this.authService.utilisateurSubject.subscribe(
      (utilisateur: Utilisateur)=>{
        this.utilisateur=utilisateur;
      }
    )
   this.authService.emitUser();
   this.initForm();
  }


  ionViewDidEnter(){
    this.image=this.navParams.get("image"); // 'data:image/jpeg;base64,' + 
 
  }


  initForm(){
    this.adForm=this.formBuilder.group({
      nom:['',Validators.required],
      prix:[,Validators.required],
      description: this.formBuilder.array([])
    })
  }

  getDescriptionArray(){
    return this.adForm.get('description') as FormArray;
  }

  onAddDescription(){
    let newControl=this.formBuilder.control('');
    this.getDescriptionArray().controls.push(newControl);
  }

  onRemoveDescription(index:number){
    this.getDescriptionArray().removeAt(index);
 
  }

  onSubmit(){
    const form=this.adForm.value;
    let description=[];
    for(let control of this.getDescriptionArray().controls){
      description.push(control.value);
    }
    this.annoncesService.ajouter(new Annonce(null,form['nom'],form['prix'],description,this.image,this.utilisateur)).then(
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
          subTitle: 'Une erreur est survenue lors de l\'ajout de l\'annonce'+reject,
          buttons: ['D\'accord']
        });
        alert.present();
      });

  }

  close(){
    this.navCtrl.pop();
  }

}
