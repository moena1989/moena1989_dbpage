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
  selectedItemTab: any = undefined;

  constructor(public tools: ToolsServices,
              private router: Router) {
  }

  ngOnInit(): void {
    this.selectedItemTab = this.tools.currentSelectedTab;
  }

  selectTab(tab: any) {
    this.tools.currentSelectedTab = tab;
    this.router.navigateByUrl(tab.path);
  }

  selectDtab(dynamicTab: any) {
    if (dynamicTab !== this.tools.currentSelectedTab) {
      this.tools.currentSelectedTab = dynamicTab;
      this.router.navigate([dynamicTab.path], {queryParams: dynamicTab.queryParams});
    }
  }
}
