import { Component, OnInit } from '@angular/core';
import { Generics } from '../models/generics';
import { Router } from '@angular/router';
import { FireDbService } from '../fire-db.service';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent implements OnInit {

  cartas: Generics[] = [];
  constructor(public db: FireDbService, private router: Router) { }

  ngOnInit(): void {

    this.db.getAllGenerics().then( entries => {
      this.cartas = entries;
    });
  }

  verCarta(id: string) {
    this.router.navigate(['/carta/', id]);
  }

}
