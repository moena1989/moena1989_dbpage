import {Component} from '@angular/core';
import {ToolsServices} from '../../services/tools-services.service';

@Component({
  selector: 'app-visualizador-config-caja',
  templateUrl: './config-case-page.component.html',
  styleUrls: ['./config-case-page.component.scss']
})
export class ConfigCasePageComponent {

  iconStyle = ToolsServices.iconStyle;
  itemStructure: any = {
    iddbData: {iddb: 'main', path: 'departments/warehouse/watchInventory/structure/cases/'},
    faIcon: 'fa-inventory',
    itemTypeName: 'Modelo de Corona',
    labelVariable: 'name.es',
    multilangInputs: [
      {
        es: 'Nombre',
        en: 'Name',
        variableName: 'name'
      }
    ],
// son datos internos y no requieren que estén en otro idioma...
    filtersData: [{
      name: 'Colores',
      variableName: 'colors'
    }],
  };
}
