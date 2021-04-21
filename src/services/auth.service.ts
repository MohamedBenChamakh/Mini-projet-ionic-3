import { Subject } from "rxjs";
import { Utilisateur } from "../models/Utilisateur";

export class AuthService{
    isAuth=false;
    utilisateur:Utilisateur;
    utilisateurSubject=new Subject<Utilisateur>();
  
    utilisateurs:Utilisateur[]=[
        {
            id:0,
            nom:"Ben Chamakh",
            prenom:"Mohamed",
            email:"mohamed@gmail.com",
            passwd:"mohamed123",
            tel:"12345678"
        },
        {
            id:1,
            nom:"Ben Salah",
            prenom:"Ali",
            email:"Ali@gmail.com",
            passwd:"Ali987654",
            tel:"87654321"
           }
    ];
    
    constructor(){
      
    }



    SignIn(email:string,passwd:string){
        return new Promise(
            (resolve,reject)=>{
                       console.log("signIn");
                       this.utilisateur=this.utilisateurs.find(function(element){
                        return (element.email==email && element.passwd==passwd)
                       } );
                       if(this.utilisateur!=null) {
                           this.isAuth=true;
                           this.emitUser();
                           resolve(this.utilisateur.id);
                       }
                       else{
                        this.utilisateur=null;
                        reject(this.isAuth);
                       }
                      
                  })
            
     }

     loadUserContent(){
         this.emitUser();
     }

     LogOut(){
         this.utilisateur=null;
         this.isAuth=false;
         this.emitUser();
     }

     Authentificated(){
         return this.isAuth;
     }

     emitUser(){
         this.utilisateurSubject.next(this.utilisateur);
     }
}