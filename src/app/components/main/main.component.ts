import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from '../../animations/Animation';
import {ToolsServices} from '../../services/tools-services.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeAnimation]
})

export class MainComponent implements OnInit {
  constructor(public tools: ToolsServices, route: ActivatedRoute) {
    route.queryParamMap.subscribe(params => {
      const productTypeCategory = params.get('typeCategoryProduct');
      console.log('LA categoria ES ::::', productTypeCategory);
    });
  }

  ngOnInit(): void {
  }
}
