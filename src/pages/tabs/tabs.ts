import { Component } from "@angular/core";
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
    constructor(private authService:AuthService){
       
    }

    ionViewDidLoad(){
    }

    Authentificated(){
        return  this.authService.Authentificated();
    }
}