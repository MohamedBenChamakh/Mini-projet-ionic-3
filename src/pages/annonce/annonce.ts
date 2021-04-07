import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnnoncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonce',
  templateUrl: 'annonce.html',
})
export class AnnoncePage implements OnInit{
  annonce :{
    nom:string,
    prix:number,
    description:string
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.annonce=this.navParams.get("annonce");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnoncePage');
  }

}
