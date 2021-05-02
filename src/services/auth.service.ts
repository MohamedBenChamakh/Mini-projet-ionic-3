import { DatabaseService } from './database.service';
import { Subject } from "rxjs";
import { Utilisateur } from "../models/Utilisateur";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    isAuth=false;
    utilisateur:Utilisateur;
    utilisateurSubject=new Subject<Utilisateur>();
  

    
    constructor(public databaseService:DatabaseService){
      
    }



    SignIn(email:string,passwd:string){
        return new Promise(
            (resolve,reject)=>{
                       this.databaseService.db.executeSql('SELECT * FROM UTILISATEUR WHERE EMAIL=\''+email+'\' AND PASSWD=\''+passwd+'\'',{})
                       .then((data)=>{
                                if(data.rows.length==0) {
                                    reject(this.isAuth);}
                                else{
                                   
                                        this.utilisateur=new Utilisateur(+data.rows.item(0).ID,data.rows.item(0).NOM,data.rows.item(0).PRENOM,data.rows.item(0).EMAIL,data.rows.item(0).PASSWD,data.rows.item(0).TEL);
                            
                                        this.isAuth=true;
                                        this.emitUser();
                                        resolve(this.utilisateur.prenom);
                                    }
   
                        });
   
                  })
            
     }

    
     LogOut(){
         return new Promise(
             (resolve,reject)=>{
                this.utilisateur=null;
                this.isAuth=false;
                this.emitUser();
                resolve(true);
             }
         )

     }

     Authentificated(){
         return this.isAuth;
     }

     emitUser(){
         this.utilisateurSubject.next(this.utilisateur);
     }
}