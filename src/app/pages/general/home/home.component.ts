import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';
import {DBPublicService} from '../../../services/routes/d-b-public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public tools: SettingsService, public pdb: DBPublicService) {
  }

  ngOnInit() {
    this.tools.tituloTopbar = 'Inicio';
  }

  probar() {
    // this.pdb.tst();
  }
}
