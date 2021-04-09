import { Utilisateur } from "./Utilisateur";



export class Annonce{

    constructor(
        public nom:string,
        public prix:number,
        public description:string,
        public photo:string,
        public utilisateur:Utilisateur){}
}