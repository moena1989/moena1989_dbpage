import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from '../../animations/Animation';
import {ToolsServices} from '../../services/tools-services.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeAnimation]
})

export class MainComponent implements OnInit {
  constructor(public tools: ToolsServices) {
  }

  ngOnInit(): void {
  }
}
