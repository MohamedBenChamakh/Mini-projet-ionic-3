import { Utilisateur } from "../models/Utilisateur";

export class AuthService{
    isAuth=false;
    utilisateur:Utilisateur;
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
                       this.utilisateur=this.utilisateurs.find(function(element){
                        return (element.email==email && element.passwd==passwd)
                       } );

                       if(this.utilisateur!=null) {
                           for(let key in this.utilisateur)
                               sessionStorage.setItem(key,this.utilisateur[key]);
                           this.isAuth=true;
                           resolve(this.isAuth);
                       }
                       else
                       reject(this.isAuth);
                  })

            
     }

     LogOut(){
         this.isAuth=false;
         sessionStorage.clear();
     }

     Authentificated(){
         return this.isAuth;
     }
}