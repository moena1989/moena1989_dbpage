import {Component, OnInit} from '@angular/core';
import {ToolsService} from '../../../_services/tools.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public tools: ToolsService) {
  }

  ngOnInit() {
    this.tools.top_tittle = 'Inicio';
  }

}
