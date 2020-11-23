import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchBox', { static: true }) public searchBox: NgModel;
  @Output() value: EventEmitter<string> = new EventEmitter();
  public text = '';
  constructor() { }

  ngOnInit() {
    this.searchBox.valueChanges.pipe(debounceTime(300))
    .subscribe(evt => this.value.emit(evt));
  }

}
