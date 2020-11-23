import { Component, OnInit } from '@angular/core';
declare function require(moduleName: string): any;
const { version: appVersion } = require('../../../../package.json');

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent implements OnInit {

  public appversion: string;
  constructor() { }

  ngOnInit() {

    this.appversion = appVersion;
  }

}
