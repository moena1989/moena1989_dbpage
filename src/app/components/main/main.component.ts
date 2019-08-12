import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from '../../animations/Animation';
import {ToolsServices} from '../../services/tools-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeAnimation]
})

export class MainComponent implements OnInit {
  constructor(public tools: ToolsServices,
              private router: Router) {
  }

  ngOnInit(): void {
    // const url = this.activatedRoute.snapshot.firstChild.url;
  }

  selectTab(tab: any) {
    this.router.navigateByUrl(tab.path);
  }
}
