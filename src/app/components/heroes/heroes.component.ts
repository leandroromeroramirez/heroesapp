import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes:any[] = [];

  //Para saber si esta cargando
  loading:boolean = true;

  constructor(private _hs:HeroesService) { 
    this._hs.getHeroes().subscribe(
      data =>{ 
             
       //Para lentizar la funcion para ver el warning
       setTimeout(()=>{
        this.heroes = data ;
        this.loading = false;
       }, 3000);
      }
    );
  }

  ngOnInit() {
  }

  borrarHeroe(key$:string){
    this._hs.borrarHeroe(key$).subscribe( 
      respuesta=>{
        if(respuesta){
          console.error(respuesta);
        }else{
          //Todo esta bien ya que en la documentacion de Firebase debe devolver un null
          delete this.heroes[key$];
        }
      }
    )
  }
}
