import { Subject } from "rxjs/Subject";
import { Annonce } from "../models/Annonce";
import { Utilisateur } from "../models/Utilisateur";




export class AnnoncesServices{
 annonces:Annonce[]=[]
 annoncesSubject = new Subject<Annonce[]>();

 constructor(){}

  emitAnnonces(){
    this.annoncesSubject.next(this.annonces);
  }
  
}