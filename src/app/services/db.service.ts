import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  /*
  Servicio encargado de traer, y organizar los datos para la creación de cada reloj, contiene la estructura de cada uno de los registros.
   */
  manos: any[] = [{name: 'FCM', salt: 'FCM'}];
  lotes: any[] = [{name: '1', salt: '1'}];

  piezas: any[] = [{name: '1-100', salt: '95'}];
  modelos: any[] = [
    {name: 'Origen', salt: 'OG'},
    {name: 'Slim', salt: 'SL'},
    {name: 'Vira', salt: 'VR'},
    {name: 'Inti', salt: 'IT'},
    {name: 'Aros', salt: 'AR'},
    {name: 'One', salt: 'ON'}];
  colecciones: any[] = [
    {name: 'Luxury', salt: 'LX'},
    {name: 'Hawaii', salt: 'HW'},
    {name: 'Animal Print', salt: 'AP'},
    {name: 'Frutas', salt: 'FT'},
    {name: 'Telas', salt: 'TL'},
    {name: 'Vintage', salt: 'VT'},
    {name: 'Ed. Especial', salt: 'EE'}];
  materiales: any[] = [
    {name: 'Madera', salt: 'MD'},
    {name: 'Acero', salt: 'AC'},
    {name: 'Oro', salt: 'OR'},
    {name: 'Plata', salt: 'PL'},
    {name: 'Esmeraldas', salt: 'EM'},
    {name: 'Tagua', salt: 'TG'}];
  maquinarias: any[] = [
    {name: 'Miyota', salt: 'MY'},
    {name: 'Seagul', salt: 'SG'},
    {name: 'ETA', salt: 'ET'}
  ];
  color_maquinaria: any[] = [
    {name: 'Oro', salt: 'OR'},
    {name: 'Plata', salt: 'PT'}
  ];
  material_pulso: any[] = [
    {name: 'Acero inoxidable', salt: 'AI'},
    {name: 'Cuero', salt: 'CR'},
  ];
  color_pulsos: any[] = [
    {name: 'Negro', salt: 'NG'},
    {name: 'Azul', salt: 'AZ'},
    {name: 'Gris', salt: 'GS'},
    {name: 'Blanco', salt: 'BL'},
    {name: 'Amarillo', salt: 'AM'},
    {name: 'Rojo', salt: 'RJ'},
    {name: 'Verde', salt: 'VD'},
    {name: 'Naranja', salt: 'NJ'},
    {name: 'Cafe', salt: 'CF'},
    {name: 'Violeta', salt: 'VT'},
    {name: 'Oro', salt: 'OR'},
    {name: 'Plata', salt: 'PL'},
    {name: 'Multicolor', salt: 'MC'},
  ];
  maderas: any[] = [
    {name: 'Granadillo', salt: 'GD'},
    {name: 'Nazareno', salt: 'NR'},
    {name: 'Palo de Mora', salt: 'PM'},
    {name: 'Palo de Sangre', salt: 'PS'},
    {name: 'Nogal', salt: 'NG'},
    {name: 'Cedro', salt: 'CD'},
    {name: 'Achapo', salt: 'AP'},
    {name: 'Ébano', salt: 'EB'},
    {name: 'Flor Morado', salt: 'FM'},
    {name: 'Teka', salt: 'TK'},
    {name: 'Canelo Moena', salt: 'CM'},
    {name: 'Zapan', salt: 'ZP'},
    {name: 'Amargo', salt: 'AM'},
    {name: 'Pino', salt: 'PN'},
    {name: 'Abarco', salt: 'AC'},
    {name: 'algarrobo', salt: 'AR'},
    {name: 'Cumaru', salt: 'CM'}
  ];

  constructor() {
  }
}
