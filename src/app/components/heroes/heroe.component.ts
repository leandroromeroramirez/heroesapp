import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Heroe } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  private heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:"Marvel"
  }

  nuevo:boolean = false;
  id:string;


  constructor(private _hs:HeroesService, private _router:Router,
              private _ar:ActivatedRoute) {
                this._ar.params.subscribe(parametros =>{
                  console.log(parametros);
                  this.id = parametros['id'];
                  if(this.id !== "nuevo"){
                    this._hs.getHeroe(this.id).subscribe(this.heroe =>);
                  }

                })
               }

  ngOnInit() {
  }

  guardar(){
    console.log(this.heroe);

    if (this.id == "nuevo") {
      this._hs.nuevoHeroe(this.heroe).subscribe(
        data => {
          this._router.navigate(['heroe', data.name])
        }, 
        error=> console.error(error)
      );
    }else{
      this._hs.actulizarHeroe(this.heroe,this.id).subscribe(
        data => {
          console.log(data);
        }, 
        error=> console.error(error)
      );
    }

  }
}
