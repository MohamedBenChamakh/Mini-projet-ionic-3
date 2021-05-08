import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { Annonce } from "../../models/Annonce";
import { AnnoncesServices } from "../../services/annonces.service";
import { AuthService } from "../../services/auth.service";
import { AccueilPage } from "../accueil/accueil";
import { MonProfilPage } from "../mon-profil/mon-profil";
import { ReglagesPage } from "../reglages/reglages";

@Component({
    selector:'page-tabs',
    templateUrl:'tabs.html'
})
export class TabsPage{
    accueilPage=AccueilPage;
    profilPage=MonProfilPage;
    reglagePage=ReglagesPage;
    annonces:number;
    annoncesSubscription:Subscription;
    constructor(private authService:AuthService,private annonceService:AnnoncesServices){
       this.annoncesSubscription=this.annonceService.annoncesSubject.subscribe(
           (annonces:Annonce[]) =>{
               this.annonces=annonces.length;
           }
       )
    }

    ionViewDidLoad(){
    }

    Authentificated(){
        return  this.authService.Authentificated();
    }
}