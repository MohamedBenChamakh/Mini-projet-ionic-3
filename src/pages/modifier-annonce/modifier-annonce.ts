import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Annonce } from '../../models/Annonce';
import { AnnoncesServices } from '../../services/annonces.service';

/**
 * Generated class for the ModifierAnnoncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifier-annonce',
  templateUrl: 'modifier-annonce.html',
})
export class ModifierAnnoncePage {
  formGroup:FormGroup;
  annonce:Annonce;
  image;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private formBuilder: FormBuilder,
      private camera:Camera,
      private view:ViewController,
      private toastCtrl:ToastController,
      private annoncesService:AnnoncesServices,
      private alertCtrl:AlertController,
      private actionSheetCtrl:ActionSheetController
    ) {
    this.initForm();
  }

  ionViewDidEnter(){
    this.annonce=this.navParams.get("annonce"); // 'data:image/jpeg;base64,' + 
    this.image=this.annonce.photo; 
    this.annonce.description.forEach(element=>{
      let newControl=this.formBuilder.control(element);
      this.getDescriptionArray().controls.push(newControl);
    } )
  }

  initForm(){
    this.formGroup=this.formBuilder.group({
      nom:['',Validators.required],
      prix:[,Validators.required],
      description: this.formBuilder.array([])
    })
  }

  getDescriptionArray(){
    return this.formGroup.get('description') as FormArray;
  }

  onAddDescription(){
    let newControl=this.formBuilder.control('');
    this.getDescriptionArray().controls.push(newControl);
  }

  onRemoveDescription(index:number){
    this.getDescriptionArray().removeAt(index);
 
  }

  async onChoice(){
    const actionSheet= await this.actionSheetCtrl.create({
      title: 'Importer une photo',
      buttons: [{
        text:'Galerie',
        icon:'photos',
        handler:()=>this.openGallery()
      },{
        text:'Appareil photo',
        icon: 'camera',
        handler: () =>this.openCamera()
      }]
    })
    actionSheet.present();
  }

  openGallery(){ 
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
        let toast= this.toastCtrl.create({
          message:'L\'image a été bien importée',
          duration:2000, 
          position:'top'
        });
        toast.present();
      let imageURL = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.image=imageURL;
      
      }

    }).catch(
      (error) => {
  
      this.toastCtrl.create({
        message: error.message,
        duration:3000,
        position:'top'
      }).present();
      

     this.camera.cleanup();
    });
  }

  close(){
    this.navCtrl.pop();
  }

  onSubmit(){
    const form=this.formGroup.value;
    let description=[];
    for(let control of this.getDescriptionArray().controls){
      description.push(control.value);
    }
    const annonce=new Annonce(this.annonce.id,form['nom'],form['prix'],description,this.image,this.annonce.utilisateur);
    this.annoncesService.modifier(annonce).then(
      (resolve)=>{
        const alert = this.alertCtrl.create({
          title: 'Succés',
          subTitle: 'Votre annonce a été bien modifiée !',
          buttons: ['D\'accord']
        });
        alert.present();
        this.view.dismiss(annonce);
      },(reject)=>{
        const alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: 'Une erreur est survenue lors de la modification de l\'annonce'+reject,
          buttons: ['D\'accord']
        });
        alert.present();
      });
  }


  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {  

      if(imageData){
        let toast= this.toastCtrl.create({
          message:'L\'image a été bien importée',
          duration:2000,
          position:'top'
        });
        toast.present();
        let imageURL = (<any>window).Ionic.WebView.convertFileSrc(imageData);
        this.image=imageURL;
      }

    }).catch((error) => {

      this.toastCtrl.create({
        message: error.message,
        duration:3000,
        position:'top'
      }).present();

      this.camera.cleanup();
    });
  }


}
