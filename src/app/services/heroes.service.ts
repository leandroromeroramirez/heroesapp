import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Heroe } from "../interfaces/heroe.interface";
import 'rxjs/add/operator/map';

@Injectable()
export class HeroesService {

 fireUrl:string="https://heroesapp-79e08.firebaseio.com/heroes.json";
 heroeUrl:string="https://heroesapp-79e08.firebaseio.com/heroes/";

  constructor(private _http:Http) { }

  nuevoHeroe(heroe:Heroe){
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this._http.post(this.fireUrl, body, {headers}).map( res =>{
      console.log(res.json());
      return res.json();
    });
  }

  actulizarHeroe(heroe:Heroe, key$:string){
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url = `${ this.heroeUrl }/${key$}.json`;

    return this._http.put(url, body, {headers}).map( res =>{
      console.log(res.json());
      return res.json();
    });
  }

  getHeroe(key$:string){
    let url = `${this.heroeUrl}/${key$}.json`;
    return this._http.get(url).map(res=>res.json());
  }

  getHeroes(){
    return this._http.get(this.fireUrl).map(res=>res.json());
  }

  borrarHeroe(key$:string){
    let url = `${this.heroeUrl}/${key$}.json`;
    return this._http.delete(url).map(res=>res.json());
  }

 }
