import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from '../../animations/Animation';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'], animations: [fadeAnimation]
})

export class MainComponent implements OnInit {
  constructor(public tools: SettingsService) {
  }

  ngOnInit(): void {
  }
}
