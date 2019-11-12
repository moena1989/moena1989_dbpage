import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from '../../animations/Animation';
import {ToolsServices} from '../../services/tools-services.service';
import {Router} from '@angular/router';
import {CurrentDataService} from '../../current-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeAnimation]
})

export class MainComponent implements OnInit {
  first = true;

  constructor(public tools: ToolsServices,
              public globalData: CurrentDataService,
              private router: Router) {

  }

  ngOnInit(): void {
    if (this.first) {
      this.globalData.loadTabDataByUrl(this.router.url);
      this.first = false;
    }
  }
}
