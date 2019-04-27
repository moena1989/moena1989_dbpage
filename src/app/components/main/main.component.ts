import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from '../../animations/Animation';
import {SettingsService} from '../../services/settings.service';
import {CurrentStorageService} from '../../services/current-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'], animations: [fadeAnimation]
})

export class MainComponent implements OnInit {
  constructor(private currentData: CurrentStorageService, public tools: SettingsService) {
    currentData.iniciar();
  }

  ngOnInit(): void {
  }
}
