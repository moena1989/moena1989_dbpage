import {Component, OnInit, ViewChild} from '@angular/core';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {ToolsService} from './tools.service';
import {DbService} from './services/db.service';
import {ModelsService} from './models.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(SnackbarComponent)
  public snack: SnackbarComponent;

  /**
   * Esta clase se encarga de iniciar toods los sevicios apenas alguien entre a la pag.
   * Contiene el snakBar
   */

  constructor(private tools: ToolsService, private db: DbService, private models: ModelsService) {
  }

  ngOnInit() {
    console.log('se carga el snack');
    this.tools.snack = this.snack;
  }
}
