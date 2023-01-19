import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { switchMap } from "rxjs";
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe; 

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private _router: Router,
  ) { }


  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap( ({id}) => this._heroesService.getHeroeId(id) )
      )
      .subscribe( heroe => this.heroe = heroe );
      
  }

  goBack() {
    this._router.navigate(['heroes/listado']);
  }

}
