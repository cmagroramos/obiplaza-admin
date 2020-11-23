import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestorageService } from '../firestorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router,
              public firestorage: FirestorageService) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
