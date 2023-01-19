import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 10px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]
  
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    if (this._router.url.includes('editar')) {
      this._activatedRoute.params
      .pipe(
        switchMap( ({id}) => this._heroesService.getHeroeId( id ) )
      )
      .subscribe( heroe => this.heroe = heroe );
    }    

  }

  save() {
    
    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if (this.heroe.id) {
      // update
      this._heroesService.updateHeroe( this.heroe )
        .subscribe( heroe => this.showSnackbar('Hero Updated'));
    } else {
      // create
      this._heroesService.createHeroe( this.heroe )
        .subscribe( heroe => {
          this._router.navigate(['/heroes/editar', heroe.id]);
          this.showSnackbar('Hero Created');
        } )
    }

  }

  deleteHeroe() {

    const dialog = this.dialog.open( ConfirmComponent, {
      width: '250px',
      data: {...this.heroe}
    });

    // esto hace lo mismo que lo de abajo pero utilizando un switchMap para no repetir 2 subscribe
    dialog.afterClosed().pipe(
      switchMap( result => {
        if (result) {
          return this._heroesService.deleteHeroe( this.heroe.id! );
        } else {
          return of(null);
        }
      } )
    ).subscribe( resp => {
      this._router.navigate(['/heroes']);
    } )
    

    // dialog.afterClosed().subscribe(
    //   ( result ) => {
    //     if (result) {
    //       this._heroesService.deleteHeroe( this.heroe.id! )
    //         .subscribe( resp => {
    //           this._router.navigate(['/heroes']);
    //         });
    //     }
    //   }
    // )


  }

  showSnackbar( mensaje: string ) {

    this._snackBar.open( mensaje, 'Close', {
      duration: 3000
    });

  }

}
