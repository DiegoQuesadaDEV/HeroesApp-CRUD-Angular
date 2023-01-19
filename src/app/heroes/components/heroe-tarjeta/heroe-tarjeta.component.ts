import { Component, Input, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent {

  @Input() heroe!: Heroe;



}
