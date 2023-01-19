import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor( private _heroesService: HeroesService ) { }

  ngOnInit(): void {

    this._heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes);

  }

}
