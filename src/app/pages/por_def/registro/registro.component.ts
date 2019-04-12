import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  seleccionarOpcionRegistro(opcion_selected: any) {
    console.log('sas');
    console.log(opcion_selected.route);
    this.router.navigate(['/registro/' + opcion_selected.route]);
  }
}
