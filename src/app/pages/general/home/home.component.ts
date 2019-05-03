import {Component, OnInit} from '@angular/core';
import {ToolsServices} from '../../../services/tools-services.service';
import {DBPublicService} from '../../../services/routes/d-b-public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public tools: ToolsServices, public pdb: DBPublicService) {
  }

  ngOnInit() {
    this.tools.tituloTopbar = 'Inicio';
  }

  probar() {
    // this.pdb.tst();
  }
}
