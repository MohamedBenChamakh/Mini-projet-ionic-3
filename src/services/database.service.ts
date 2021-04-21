
import { Injectable } from '@angular/core';
import { SQLite ,SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseService{

    private db:SQLiteObject;

    constructor(private sqlite:SQLite){
        this.createDatabase();
    }

    createDatabase() {
        this.sqlite.create({
            name: 'data.db',
            location:'default'
        })
        .then((db:SQLiteObject)=>{
            console.log('Base de données créée ');
            this.db=db;
            this.createTables();
        })
    }

    createTables() {
        this.db.executeSql('create table IF NOT EXISTS ANNONCE  (ID_ANNONCE int not null,ID  int not null, NOM   char(50) not null, PRIX  decimal not null,DESCRIPTION char(100),PHOTO longblob not null,primary key (ID_ANNONCE))',{})
        .then(()=>{
            console.log('table ANNONCE créée');
            this.db.executeSql('create table IF NOT EXISTS  UTILISATEUR (ID int not null,NOM char(50) not null,PRENOM char(50) not null,EMAIL char(50) not null,PASSWD char(50) not null,TEL char(50) not null,primary key (ID));',{})
            .then(()=>{
                console.log('table UTILISATEUR créée');
                this.db.executeSql('alter table ANNONCE add constraint FK_POSTER foreign key (ID) references UTILISATEUR (ID) on delete restrict on update restrict',{})
                .then(()=>{
                    console.log('relation créée');
                })
                .catch(error=> console.log(error));
            })
            .catch(error=> console.log(error));
        })
        .catch(error=> console.log(error));
    
    }
}