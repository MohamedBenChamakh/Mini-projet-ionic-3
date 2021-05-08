
import { Injectable } from '@angular/core';
import {  SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController, Platform, ToastController } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { Annonce } from '../models/Annonce';

@Injectable()
export class DatabaseService{

    public db:SQLiteObject;
    public annonces:Annonce[];
    
    constructor(
        private sqlite:SQLite,
        private loadingCtrl:LoadingController,
        private toastCtrl:ToastController,
        private platform:Platform){
            let loader= this.loadingCtrl.create({
                content: 'Chargement...'
              });

            loader.present();
            this.platform.ready().then(()=>{
            
                this.createDatabase();
                loader.dismiss();
            
            });
     
    }

    createDatabase() {
        this.sqlite.create({
            name: 'data.db',
            location:'default'
        })
        .then((db:SQLiteObject)=>{
            
            this.db=db;
            this.createTables();
            this.insertClients();
  
            
         
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
     
    }
  
    createTables() {
        
        this.db.executeSql('create table IF NOT EXISTS ANNONCE  (ID_ANNONCE int not null,ID  int not null, NOM_ANNONCE   char(50) not null, PRIX  decimal not null,DESCRIPTION char(100),PHOTO long blob not null,primary key (ID_ANNONCE))' ,{})
        .then(()=>{
            this.db.executeSql('create table  IF NOT EXISTS UTILISATEUR (ID int not null,NOM char(50) not null,PRENOM char(50) not null,EMAIL char(50) not null,PASSWD char(50) not null,TEL char(50) not null,primary key (ID));',{})
            .then(()=>{
                this.db.executeSql('alter table  ANNONCE add constraint FK_POSTER foreign key (ID) references UTILISATEUR (ID) on delete restrict on update restrict',{})
                .then(()=>{
                    let toast= this.toastCtrl.create({
                        message:'Base de données générée !',
                        duration:3000,
                        position:'top'
                    });
                    toast.present();
                      
                    })
                .catch((error)=>{})

                })
            .catch((error)=>    {
                let toast= this.toastCtrl.create({
                    message:error.message,
                    duration:3000,
                    position:'top'
                         });
                    toast.present();
            });
        })
        .catch((error)=>    {
            let toast= this.toastCtrl.create({
                message:error.message,
                duration:3000,
                position:'top'
                     });
                toast.present();
        });
   
    }

    insertClients(){
        this.db.executeSql('INSERT INTO UTILISATEUR VALUES(1,\''+'Ben Chamakh'+'\',\''+'Mohamed'+'\',\''+'mohamed@gmail.com'+'\',\''+'mohamed123'+'\',\''+'12345678'+'\')',{})
        .then(()=>{
            let toast= this.toastCtrl.create({
                message:'Utilisateur généré !',
                duration:3000,
                position:'top'
            });
            toast.present();
        })     
        .catch((error)=>  { })

        this.db.executeSql('INSERT INTO UTILISATEUR VALUES(2,\''+'Ben Salah'+'\',\''+'Foulen'+'\',\''+'foulen@gmail.com'+'\',\''+'foulen123456'+'\',\''+'12345678'+'\')',{})
        .then(()=>{
            let toast= this.toastCtrl.create({
                message:'Utilisateur généré !',
                duration:3000,
                position:'top'
            });
            toast.present();
        })     
        .catch((error)=>  { })
    }



    
}