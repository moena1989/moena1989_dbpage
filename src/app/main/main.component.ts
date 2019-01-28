import {Component, OnInit, ViewChild} from '@angular/core';
import {SnackbarComponent} from '../tools/snackbar/snackbar.component';
import {ToolsService} from '../_services/tools.service';
import {DbService} from '../_services/db.service';
import {fadeAnimation} from '../_animations/Animation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'], animations: [fadeAnimation]
})

export class MainComponent implements OnInit {
  constructor(public db: DbService, public tools: ToolsService) {
  }

  ngOnInit(): void {
  }
}
