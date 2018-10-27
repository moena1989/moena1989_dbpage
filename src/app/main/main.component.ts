import {Component, OnInit, ViewChild} from '@angular/core';
import {SnackbarComponent} from '../snackbar/snackbar.component';
import {ToolsService} from '../tools.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
