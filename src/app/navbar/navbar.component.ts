import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public db: DbService, public router: Router) {
  }

  ngOnInit() {
  }

  cerrarCuenta() {
    this.db.logout();
    this.router.navigate(['/login']);

  }
}
