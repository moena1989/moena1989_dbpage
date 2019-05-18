import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelRelojService {
  /*
   CLASE ENCARGGADA DE CONTENER LA ESTRUCTURA DE LOS DATOS NECESARIOS PARA LA DB.
   */
  constructor() {
  }
}
//   // estructuras_________
//   models: any[] = [
//     {
//       salt: 'G', id: 0, name: 'Origen',
//       bunckles: [
//         {
//           id_coleccion: 0,
//           itemConfig: [
//             {id_opc: 5, ids: [0, 1, 2]},
//             {id_opc: 6, ids: [0, 1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 9, ids: [0, 1, 2, 3, 4]},
//           ]
//         },
//         {
//           id_coleccion: 1,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [12]}]
//         },
//         {
//           id_coleccion: 2,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [12]}]
//         },
//         {
//           id_coleccion: 3,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [1, 4, 5, 6, 7, 9]}]
//         },
//         {
//           id_coleccion: 4,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [1]},
//             {id_opc: 7, ids: [2]},
//             {id_opc: 8, ids: [0, 1, 3]}
//           ]
//         },
//         {
//           id_coleccion: 5,
//           itemConfig: [
//             // {id_opc: 0, ids: [0, 5, 6, 8, 9, 10, 14]},
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [0, 1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [0, 3, 13, 14, 15, 16]}
//           ]
//         }
//       ]
//     },
//     {
//       salt: 'S', id: 1, name: 'Slim',
//       bunckles: [
//         {
//           id_coleccion: 0,
//           itemConfig: [
//             // {id_opc: 0, ids: [0, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17]},
//             {id_opc: 5, ids: [0, 1, 2]},
//             {id_opc: 6, ids: [0, 1]},
//             {id_opc: 7, ids: [0, 1]},
//             {id_opc: 8, ids: [0, 1, 2, 8, 10, 11, 17]}
//           ]
//         }
//       ]
//     },
//     {
//       salt: 'A', id: 2, name: 'Vira Aros',
//
//       bunckles: [
//         {
//           id_coleccion: 0,
//           itemConfig: [
//             // {id_opc: 0, ids: [0, 4, 5, 6, 7, 8, 9, 11, 12, 15, 16, 17]},
//             {id_opc: 5, ids: [0, 1, 2]},
//             {id_opc: 6, ids: [0, 1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [0, 1, 2, 8, 17]}
//           ]
//         }
//       ]
//     },
//     {
//       salt: 'I', id: 3, name: 'Inti',
//       bunckles: [
//         {
//           id_coleccion: 0,
//           itemConfig: [
//             {id_opc: 5, ids: [0, 1, 2]},
//             {id_opc: 6, ids: [0, 1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [0, 1, 2, 8, 17]}
//           ]
//         },
//         {
//           id_coleccion: 1,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [12]}
//           ]
//         },
//         {
//           id_coleccion: 2,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [12]}]
//         },
//         {
//           id_coleccion: 3,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [1, 4, 5, 6, 7, 9]}]
//         }, {
//           id_coleccion: 4,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [1]},
//             {id_opc: 7, ids: [2]},
//             {id_opc: 8, ids: [0, 1, 3]}
//           ]
//         }
//         , {
//           id_coleccion: 5,
//           itemConfig: [
//             {id_opc: 5, ids: [0]},
//             {id_opc: 6, ids: [0, 1]},
//             {id_opc: 7, ids: [1]},
//             {id_opc: 8, ids: [0, 3, 13, 14, 15, 16]}]
//         }]
//     },
//     {
//       salt: 'N', id: 5, name: 'One',
//       bunckles: [{
//         id_coleccion: 0,
//         itemConfig: [
//           {id_opc: 5, ids: [0, 1, 2]},
//           {id_opc: 6, ids: [0, 1]},
//           {id_opc: 7, ids: [0, 1]},
//           {id_opc: 8, ids: [0, 1, 2, 8, 10, 11, 17]}
//         ]
//       }]
//     }];
//
//   bunckles: any[] = [
//     {salt: 'X', id: 0, name: 'Luxury'},
//     {salt: 'H', id: 1, name: 'Hawaii'},
//     {salt: 'A', id: 2, name: 'Animal Print'},
//     {salt: 'F', id: 3, name: 'Frutas'},
//     {salt: 'T', id: 4, name: 'Telas'},
//     {salt: 'V', id: 5, name: 'Vintage'},
//     {salt: 'E', id: 6, name: 'Ed. Especial'}];
//   // fin de las estructuras_________
//
//   ///////////////////////////////////////////
//   manos: any[] = [{name: 'FCM', salt: 'FCM'}];
//
//   itemConfig: any[] = [{
//     id: 5, nombre: 'Tipo de maquinaria', ops: [
//       {salt: 'MY', id: 0, name: 'Miyota'},
//       {salt: 'SG', id: 1, name: 'Seagull'},
//       {salt: 'ET', id: 2, name: 'ETA'}]
//   }, {
//     id: 6, nombre: 'Color maquinaria', ops: [
//       {salt: 'OR', id: 0, name: 'Oro'},
//       {salt: 'PT', id: 1, name: 'Plata'}
//     ]
//   }, {
//     id: 7, nombre: 'Material pulso', ops: [
//       {salt: 'AI', id: 0, name: 'Acero inoxidable'},
//       {salt: 'CR', id: 1, name: 'Cuero'},
//       {salt: 'TL', id: 2, name: 'Tela'}
//     ]
//   }, {
//     id: 8, nombre: 'Color pulso', ops: [
//       {salt: 'NG', id: 0, name: 'Negro'},
//       {salt: 'AZ', id: 1, name: 'Azul'},
//       {salt: 'GS', id: 2, name: 'Gris'},
//       {salt: 'BL', id: 3, name: 'Blanco'},
//       {salt: 'AM', id: 4, name: 'Amarillo'},
//       {salt: 'RJ', id: 5, name: 'Rojo'},
//       {salt: 'VD', id: 6, name: 'Verde'},
//       {salt: 'NJ', id: 7, name: 'Naranja'},
//       {salt: 'CF', id: 8, name: 'Cafe'},
//       {salt: 'VT', id: 9, name: 'Violeta'},
//       {salt: 'OR', id: 10, name: 'Oro'},
//       {salt: 'PL', id: 11, name: 'Plata'},
//       {salt: 'MC', id: 12, name: 'Multicolor'},
//       {salt: 'SL', id: 13, name: 'Salmon'},
//       {salt: 'VM', id: 14, name: 'Verde menta'},
//       {salt: 'RS', id: 15, name: 'Rosadoo'},
//       {salt: 'BG', id: 16, name: 'Beige'},
//       {salt: 'VT', id: 17, name: 'Verde militar'}
//     ]
//   }
//   ];
// }
