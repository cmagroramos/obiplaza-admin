import { Component, OnInit } from '@angular/core';
import { FireDbService } from '../fire-db.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 

  constructor(public db: FireDbService) { }

  ngOnInit() {

    // this.db.getUsers().subscribe( snap => {
    //   this.users = [];
    //   snap.forEach( u => {

    //     const user: any = u.payload.val();
    //     user.key = u.key;

    //     this.users.push(user);
    //     console.log(u);
    //   });
    //   console.log('users: ', this.users);
    // });

  }

}
