import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController, ToastController, Platform, normalizeURL } from 'ionic-angular';
import { Utilisateur } from './../models/Utilisateur';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Annonce } from "../models/Annonce";



@Injectable()
export class AnnoncesServices {

  annonces:Annonce[]=[];
  annoncesSubject = new Subject<Annonce[]>();
  
  db:SQLiteObject;

 constructor(
   private platform:Platform,
   private sqlite:SQLite,
   private loadingCtrl:LoadingController,
   private toastCtrl:ToastController){

  const loading = this.loadingCtrl.create({
    content: 'Chargement des annonces...',
  });
  loading.present();
  this.platform.ready().then(()=>{
        this.sqlite.create({
          name: 'data.db',
          location:'default'
        })
        .then((db:SQLiteObject)=>{
          this.db=db;
          this.loadAnnonces();
        })       
        .catch((error)=>
        {
            let toast= this.toastCtrl.create({
                message:error.message,
                duration:3000,
                position:'top'
                    });
                toast.present();
        }        
        )
      })

  this.emitAnnonces();
  loading.dismiss();  
 }
 
 loadAnnonces(){
  this.db.executeSql('SELECT * FROM ANNONCE,UTILISATEUR WHERE UTILISATEUR.ID=ANNONCE.ID',{})
    .then((data)=>{
     let annonces=[];
     for (let i = 0; i < data.rows.length; i++) {
       const utilisateur=new Utilisateur(+data.rows.item(i).ID,data.rows.item(i).NOM,data.rows.item(i).PRENOM,data.rows.item(i).EMAIL,data.rows.item(i).PASSWD,data.rows.item(i).TEL);
       const annonce=new Annonce(+data.rows.item(i).ID_ANNONCE,data.rows.item(i).NOM_ANNONCE,+data.rows.item(i).PRIX,data.rows.item(i).DESCRIPTION,normalizeURL(data.rows.item(i).PHOTO),utilisateur);
       annonces.push(annonce);
    
       this.annonces=annonces;
      };
   
    })
    .catch(error=>{})
 
}


  ajouter(annonce:Annonce){
    return new Promise(
      (resolve,reject)=>{
        if(annonce==null) reject(false); 
        let maxIndex=0;
        this.annonces.forEach(element => {
          if(element.id>maxIndex) maxIndex=element.id;
        });
        annonce.id=maxIndex+1;
        this.db.executeSql("INSERT INTO ANNONCE VALUES('"+annonce.id+"','"+annonce.utilisateur.id+"','"+annonce.nom+"','"+annonce.prix+"','"+annonce.description+"','"+annonce.photo+"') ",{})
        .then(()=>{
            this.annonces.push(annonce);
            this.emitAnnonces();
            resolve(true);
        })
        .catch(error=>{ reject(error.message)})

      }
    )
      
  }

  supprimer(id:number){
    return new Promise(
      (resolve,reject)=>{

        this.db.executeSql("DELETE FROM ANNONCE WHERE ID_ANNONCE='"+id+"' ",{})
        .then(()=>{
          let index= this.annonces.findIndex(element=>element.id==id);
          this.annonces.splice(index,1);
          this.emitAnnonces();
            resolve(true);
        })
        .catch(error=>{ reject(error.message)})




        resolve(true);
      }
    )

  }

  loadMesAnnonces(id:number){
    return new Promise(
      (resolve,reject)=>{
         let mesAnnonces=this.annonces.filter(element=>element.utilisateur.id==id);
         resolve(mesAnnonces);
      
      });


  }

  modifier(annonce: Annonce) {
    return new Promise(
      (resolve,reject)=>{

        this.db.executeSql("UPDATE ANNONCE SET NOM_ANNONCE='"+annonce.nom+"' , PRIX='"+annonce.prix+"' , DESCRIPTION='"+annonce.description+"' , PHOTO='"+annonce.photo+"' WHERE ID_ANNONCE='"+annonce.id+"' ",{})
        .then(()=>{
          let index= this.annonces.findIndex(element=>element.id==annonce.id);
          this.annonces[index]=annonce;
          this.emitAnnonces();
            resolve(true);
        })
        .catch(error=>{ reject(error.message)})




        resolve(true);
      })
  }
  

  emitAnnonces(){
    this.annoncesSubject.next(this.annonces);
  }
  
}