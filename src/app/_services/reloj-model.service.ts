import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelojModelService {
  /*
   CLASE ENCARGGADA DE CONTENER LA ESTRUCTURA DE LOS DATOS NECESARIOS PARA LA DB.
   */
  constructor() {
  }

  // estructuras_________
  modelos: any[] = [
    {
      salt: 'G', id: 0, name: 'Origen',
      colecciones: [
        {
          id_coleccion: 0,
          opciones: [
            {id_opc: 0, ids: [0, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 3, ids: [-1, 2]},
            {id_opc: 5, ids: [0, 1, 2]},
            {id_opc: 6, ids: [0, 1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [0, 1, 2, 8, 17]}
          ]
        },
        {
          id_coleccion: 1,
          opciones: [
            {id_opc: 0, ids: [0, 5, 6, 14]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [12]}
          ]
        },
        {
          id_coleccion: 2,
          opciones: [
            {id_opc: 0, ids: [0, 3, 5, 6, 8, 10]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [12]}]
        },
        {
          id_coleccion: 3,
          opciones: [
            {id_opc: 0, ids: [0, 5, 6, 7, 8, 9, 14]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [1, 4, 5, 6, 7, 9]}]
        }, {
          id_coleccion: 4,
          opciones: [
            {id_opc: 0, ids: [0, 5, 6, 7, 8, 9]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [1]},
            {id_opc: 7, ids: [2]},
            {id_opc: 8, ids: [0, 1, 3]}
          ]
        }
        , {
          id_coleccion: 5,
          opciones: [
            {id_opc: 0, ids: [0, 5, 6, 8, 9, 10, 14]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [0, 1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [0, 3, 13, 14, 15, 16]}
          ]
        }
      ]
    },
    {
      salt: 'S', id: 1, name: 'Slim',
      colecciones: [
        {
          id_coleccion: 0,
          opciones: [
            {id_opc: 0, ids: [0, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 2, ids: [0, 1, 5, 4]},
            {id_opc: 5, ids: [0, 1, 2]},
            {id_opc: 6, ids: [0, 1]},
            {id_opc: 7, ids: [0, 1]},
            {id_opc: 8, ids: [0, 1, 2, 8, 10, 11, 17]}
          ]
        }
      ]
    },
    {
      salt: 'A', id: 2, name: 'Vira Aros',

      colecciones: [
        {
          id_coleccion: 0,
          opciones: [
            {id_opc: 0, ids: [0, 4, 5, 6, 7, 8, 9, 11, 12, 15, 16, 17]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 2, ids: [6]},
            {id_opc: 5, ids: [0, 1, 2]},
            {id_opc: 6, ids: [0, 1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [0, 1, 2, 8, 17]}
          ]
        }
      ]
    },
    {
      salt: 'I', id: 3, name: 'Inti',
      colecciones: [
        {
          id_coleccion: 0,
          opciones: [
            {id_opc: 0, ids: [0, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 3, ids: [-1, 2]},
            {id_opc: 5, ids: [0, 1, 2]},
            {id_opc: 6, ids: [0, 1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [0, 1, 2, 8, 17]}
          ]
        },
        {
          id_coleccion: 1,
          opciones: [
            {id_opc: 0, ids: [0, 5, 6, 14]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 2, ids: [6]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [12]}
          ]
        },
        {
          id_coleccion: 2,
          opciones: [
            {id_opc: 0, ids: [0, 3, 5, 6, 8, 10]},
            {id_opc: 1, ids: [0]}, {id_opc: 2, ids: [6]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [12]}]
        },
        {
          id_coleccion: 3,
          opciones: [
            {id_opc: 0, ids: [0, 5, 6, 7, 8, 9]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 2, ids: [6]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [1, 4, 5, 6, 7, 9]}]
        }, {
          id_coleccion: 4,
          opciones: [
            {id_opc: 0, ids: [0, 5, 6, 7, 8, 9]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 2, ids: [6]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [1]},
            {id_opc: 7, ids: [2]},
            {id_opc: 8, ids: [0, 1, 3]}
          ]
        }
        , {
          id_coleccion: 5,
          opciones: [
            {id_opc: 0, ids: [0, 5, 6, 8, 9, 10, 14]},
            {id_opc: 1, ids: [0]},
            {id_opc: 9, ids: [0, 1, 2, 3, 4]},
            {id_opc: 2, ids: [6]},
            {id_opc: 5, ids: [0]},
            {id_opc: 6, ids: [0, 1]},
            {id_opc: 7, ids: [1]},
            {id_opc: 8, ids: [0, 3, 13, 14, 15, 16]}]
        }]
    },
    {
      salt: 'N', id: 5, name: 'One',
      colecciones: [{
        id_coleccion: 0,
        opciones: [
          {id_opc: 0, ids: [0, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17]},
          {id_opc: 1, ids: [0]},
          {id_opc: 9, ids: [0, 1, 2, 3, 4]},
          {id_opc: 2, ids: [0, 1, 4, 5]},
          {id_opc: 3, ids: [-1, 2]},
          {id_opc: 5, ids: [0, 1, 2]},
          {id_opc: 6, ids: [0, 1]},
          {id_opc: 7, ids: [0, 1]},
          {id_opc: 8, ids: [0, 1, 2, 8, 10, 11, 17]}
        ]
      }]
    }];

  colecciones: any[] = [
    {salt: 'X', id: 0, name: 'Luxury'},
    {salt: 'H', id: 1, name: 'Hawaii'},
    {salt: 'A', id: 2, name: 'Animal Print'},
    {salt: 'F', id: 3, name: 'Frutas'},
    {salt: 'T', id: 4, name: 'Telas'},
    {salt: 'V', id: 5, name: 'Vintage'},
    {salt: 'E', id: 6, name: 'Ed. Especial'}];
  // fin de las estructuras_________

  ///////////////////////////////////////////
  manos: any[] = [{name: 'FCM', salt: 'FCM'}];

  opciones: any[] = [
    {
      id: 0, nombre: 'Material principal', ops: [   {salt: 'GD', id: 0, name: 'Granadillo'},
        {salt: 'NR', id: 1, name: 'Nazareno'},
        {salt: 'PM', id: 2, name: 'Palo de Mora'},
        {salt: 'PS', id: 3, name: 'Palo de Sangre'},
        {salt: 'NG', id: 4, name: 'Nogal'},
        {salt: 'CD', id: 5, name: 'Cedro'},
        {salt: 'AP', id: 6, name: 'Achapo'},
        {salt: 'EB', id: 7, name: 'Ébano'},
        {salt: 'FM', id: 8, name: 'Flor Morado'},
        {salt: 'TK', id: 9, name: 'Teca'},
        {salt: 'CM', id: 10, name: 'Canelo Moena'},
        {salt: 'ZP', id: 11, name: 'Zapan'},
        {salt: 'AM', id: 12, name: 'Amargo'},
        {salt: 'CM', id: 13, name: 'Comino Crespo'},
        {salt: 'PN', id: 14, name: 'Pino'},
        {salt: 'AC', id: 15, name: 'Abarco'},
        {salt: 'AR', id: 16, name: 'algarrobo'},
        {salt: 'CM', id: 17, name: 'Cumaru'}]
    },
    {
      id: 1, nombre: 'Material orgánico', ops: [

          {salt: 'MA', id: 2, name: 'Mármol'},
      ]
    }, {
      id: 2, nombre: 'Material metálico', ops: [
        {salt: 'AC', id: 0, name: 'Acero'},
        {salt: 'AL', id: 1, name: 'Aluminio'},
        {salt: 'CR', id: 2, name: 'Cromo'},
        {salt: 'NQ', id: 3, name: 'Níquel'},
        {salt: 'TT', id: 4, name: 'Titanio'},
        {salt: 'PL', id: 5, name: 'Platino'},
        {salt: 'AL', id: 6, name: 'Alpaca'}
      ]
    }, {
      id: 3, nombre: 'Material precioso', ops: [
        {salt: 'NG', id: -1, name: 'Ninguno'},
        {salt: 'OR', id: 0, name: 'Oro'},
        {salt: 'PL', id: 1, name: 'Plata'},
        {salt: 'EM', id: 2, name: 'Esmeraldas'}
      ]
    }, {
      id: 4, nombre: 'Material plástico', ops: [
        {salt: 'RS', id: 0, name: 'Resina '},
        {salt: 'CB', id: 1, name: 'Carbono'},
        {salt: 'FV', id: 2, name: 'Fibra de vidrio'}
      ]
    }, {
      id: 5, nombre: 'Tipo de maquinaria', ops: [
        {salt: 'MY', id: 0, name: 'Miyota'},
        {salt: 'SG', id: 1, name: 'Seagull'},
        {salt: 'ET', id: 2, name: 'ETA'}]
    }, {
      id: 6, nombre: 'Color maquinaria', ops: [
        {salt: 'OR', id: 0, name: 'Oro'},
        {salt: 'PT', id: 1, name: 'Plata'}
      ]
    }, {
      id: 7, nombre: 'Material pulso', ops: [
        {salt: 'AI', id: 0, name: 'Acero inoxidable'},
        {salt: 'CR', id: 1, name: 'Cuero'},
        {salt: 'TL', id: 2, name: 'Tela'}
      ]
    }, {
      id: 8, nombre: 'Color pulso', ops: [
        {salt: 'NG', id: 0, name: 'Negro'},
        {salt: 'AZ', id: 1, name: 'Azul'},
        {salt: 'GS', id: 2, name: 'Gris'},
        {salt: 'BL', id: 3, name: 'Blanco'},
        {salt: 'AM', id: 4, name: 'Amarillo'},
        {salt: 'RJ', id: 5, name: 'Rojo'},
        {salt: 'VD', id: 6, name: 'Verde'},
        {salt: 'NJ', id: 7, name: 'Naranja'},
        {salt: 'CF', id: 8, name: 'Cafe'},
        {salt: 'VT', id: 9, name: 'Violeta'},
        {salt: 'OR', id: 10, name: 'Oro'},
        {salt: 'PL', id: 11, name: 'Plata'},
        {salt: 'MC', id: 12, name: 'Multicolor'},
        {salt: 'SL', id: 13, name: 'Salomo'},
        {salt: 'VM', id: 14, name: 'Verde menta'},
        {salt: 'RS', id: 15, name: 'Rosadoo'},
        {salt: 'BG', id: 16, name: 'Beige'},
        {salt: 'VT', id: 17, name: 'Verde militar'}

      ]
    }, {
      id: 9, nombre: 'Diámetro', ops: [
        {salt: '36', id: 0, name: '36'},
        {salt: '38', id: 1, name: '38'},
        {salt: '40', id: 2, name: '40'},
        {salt: '42', id: 3, name: '42'},
        {salt: '43', id: 4, name: '43'}
      ]
    },
  ];
}
