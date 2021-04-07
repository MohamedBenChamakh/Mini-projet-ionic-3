import { Utilisateur } from "../models/Utilisateur";


export class UtilisateurService{
    utilisateur:Utilisateur=null;
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

    constructor(){}


    SignIn(email:string,passwd:string){
       return new Promise(
           (resolve,reject)=>{
                this.utilisateur=this.utilisateurs.find(element=>{
                  if( element.email==email && element.passwd==passwd)  return element;
                } );
                if(this.utilisateur!=null) resolve(this.utilisateur);
                reject(null);
           }
       ) 
    }
}