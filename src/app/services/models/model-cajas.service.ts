import {Injectable} from '@angular/core';
import {any} from 'codelyzer/util/function';

export class CajaM {
  materiales: any[];
  diametro_externo: any;
  diametro_interno: any;
}


export class Mss {

}

@Injectable({
  providedIn: 'root'
})

export class ModelsSevice {

  private piedras_preciosas: any = [
    {salt: 'EM', nombre: 'Esmeraldas'},
    {salt: 'RB', nombre: 'Rubí'},
    {salt: 'ZF', nombre: 'Zafiro'}];

  private piedras_semi_preciosas: any = [
    {salt: 'TS', nombre: 'Amatista'},
    {salt: 'AG', nombre: 'Ágata'},
    {salt: 'AM', nombre: 'Ámbar'},
    {salt: 'NX', nombre: 'Ónix'}];

  private metales_preciosos: any = [
    {salt: 'OR', id: 0, nombre: 'Oro'},
    {salt: 'PL', id: 1, nombre: 'Plata'}
  ];

  // .......materiales por categoria
  private metalicos: any = [
    {salt: 'AC', nombre: 'Acero', price: 10000},
    {salt: 'AL', nombre: 'Aluminio', price: 10000},
    {salt: 'CR', nombre: 'Cromo', price: 10000},
    {salt: 'NQ', nombre: 'Níquel', price: 10000},
    {salt: 'TT', nombre: 'Titanio', price: 10000},
    {salt: 'PL', nombre: 'Platino', price: 10000},
    {salt: 'AL', nombre: 'Alpaca', price: 10000}];

  ceramicos: any = [{salt: 'MA', nombre: 'Marmol', price: 10000}];

  maderas = [
    {salt: 'GD', nombre: 'Granadillo', price: 10000},
    {salt: 'GD', nombre: 'Tagua', price: 10000},
    {salt: 'GD', nombre: 'Ceramicos', price: 10000},
    {salt: 'NR', nombre: 'Nazareno', price: 10000},
    {salt: 'PM', nombre: 'Palo de Mora', price: 10000},
    {salt: 'PS', nombre: 'Palo de Sangre', price: 10000},
    {salt: 'NG', nombre: 'Nogal', price: 10000},
    {salt: 'CD', nombre: 'Cedro', price: 10000},
    {salt: 'AP', nombre: 'Achapo', price: 10000},
    {salt: 'EB', nombre: 'Ébano', price: 10000},
    {salt: 'FM', nombre: 'Flor Morado', price: 10000},
    {salt: 'TK', nombre: 'Teca', price: 10000},
    {salt: 'CM', nombre: 'Canelo Moena', price: 10000},
    {salt: 'ZP', nombre: 'Zapan', price: 10000},
    {salt: 'AM', nombre: 'Amargo', price: 10000},
    {salt: 'CM', nombre: 'Comino Crespo', price: 10000},
    {salt: 'PN', nombre: 'Pino', price: 10000},
    {salt: 'AC', nombre: 'Abarco', price: 10000},
    {salt: 'AR', nombre: 'algarrobo', price: 10000},
    {salt: 'CM', nombre: 'Cumarú', price: 10000}
  ];

  _maderas = {
    granadillo:
      {salt: 'GD', nombre: 'Granadillo', price: 10000},
    tagua:
      {salt: 'GD', nombre: 'Tagua', price: 10000},
    ceramico:
      {salt: 'GD', nombre: 'Ceramicos', price: 10000},
    nazareno:
      {salt: 'NR', nombre: 'Nazareno', price: 10000},
    palo_de_mora:
      {salt: 'PM', nombre: 'Palo de Mora', price: 10000},
    palo_de_sangre:
      {salt: 'PS', nombre: 'Palo de Sangre', price: 10000},
    nogal:
      {salt: 'NG', nombre: 'Nogal', price: 10000},
    cedro:
      {salt: 'CD', nombre: 'Cedro', price: 10000},
    achapo:
      {salt: 'AP', nombre: 'Achapo', price: 10000},
    ebano:
      {salt: 'EB', nombre: 'Ébano', price: 10000},
    flor_morado:
      {salt: 'FM', nombre: 'Flor Morado', price: 10000},
    teca:
      {salt: 'TK', nombre: 'Teca', price: 10000},
    canelo_moena:
      {salt: 'CM', nombre: 'Canelo Moena', price: 10000},
    zapan:
      {salt: 'ZP', nombre: 'Zapan', price: 10000},
    amargo:
      {salt: 'AM', nombre: 'Amargo', price: 10000},
    comino_crespo:
      {salt: 'CM', nombre: 'Comino Crespo', price: 10000},
    pino:
      {salt: 'PN', nombre: 'Pino', price: 10000},
    abarco:
      {salt: 'AC', nombre: 'Abarco', price: 10000},
    algarrobo:
      {salt: 'AR', nombre: 'algarrobo', price: 10000},
    cumaru:
      {salt: 'CM', nombre: 'Cumarú', price: 10000}
  };

  diametros_externos: any[] = [
    {nombre: '36', price: 10000},
    {nombre: '38', price: 10000},
    {nombre: '40', price: 10000},
    {nombre: '42', price: 10000},
    {nombre: '43', price: 10000}];

  ESTADOS_CAJA = {
    DISPONIBLE: 'Disponible',
    ARMADO: 'Armado',
    DAÑADO: 'Dañado',
  };


  ESTADOS_RELOJ = {
    DISPONIBLE: 'Disponible',
    ARMADO: 'Armado',
    DAÑADO: 'Dañado',
  };

  BASE_DIAMETROS_EXTERNOS = {
    36: {salt: '36', nombre: '36 mm', price: 10000},
    38: {salt: '38', nombre: '38 mm', price: 10000},
    40: {salt: '40', nombre: '40 mm', price: 10000},
    '42,5': {salt: '42.5', nombre: '42.5 mm', price: 10000},
    42: {salt: '42', nombre: '42 mm', price: 10000},
    43: {salt: '43', nombre: '43 mm', price: 10000}
  };

  BASE_DIAMETROS_INTERNOS = {
    miyota_8n24:
      {salt: 'M24', nombre: '26.5mm | Miyota 8n24', price: 10000},
    miyota_8n40:
      {salt: 'M40', nombre: '27mm | Miyota 8n40', price: 10000},
    miyota_5n_27:
      {salt: 'M27', nombre: '27.5mm | Miyota 5n27', price: 10000},
    seagull:
      {salt: 'SGL', nombre: '28mm | Segull', price: 10000},
    eta:
      {salt: 'ETA', nombre: '37mm | Eta', price: 10000}
  };

  BASE_GENERALS = {
    NO_APLICA_PARENT: {nombre: 'No aplica', items: [{salt: 'N/A', nombre: 'No aplica'}]},
    NO_APLICA_ITEM: {salt: 'N/A', nombre: 'No aplica'}
  };

  BASE_MATERIALES = {
    MADERA: {nombre: 'madera', items: this.maderas},
    METALICO: {nombre: 'Métalico', items: this.metalicos},
    METAL_PRECIOSO: {nombre: 'Metales Preciosos', items: this.metales_preciosos},
    PIEDRA_PRECIOSA: {nombre: 'Piedras Preciosas', items: this.piedras_preciosas},
    PIEDRA_SEMI_PRECIOSA: {nombre: 'Piedras Semi-preciosas', items: this.piedras_semi_preciosas},
  };


  ALL_CAJAS = {
  };



  BASE_COLORES_MAQUINARIA = {
    DORADO: {nombre: 'Dorado'},
    PLATEADO: {nombre: 'Plateado'}
  };

  BASE_PULSOS = {
    //
    CUERO_NEGRO: {salt: '', nombre: 'Cuero Negro', price: 10000},
    CUERO_AZUL: {salt: '', nombre: 'Cuero Azul', price: 10000},
    CUERO_GRIS: {salt: '', nombre: 'Cuero Gris', price: 10000},
    CUERO_BLANCO: {salt: '', nombre: 'Cuero Blanco', price: 10000},
    CUERO_AMARILLO: {salt: '', nombre: 'Cuero Amarillo', price: 10000},
    CUERO_ROJO: {salt: '', nombre: 'Cuero Rojo', price: 10000},
    CUERO_VERDE: {salt: '', nombre: 'Cuero verde', price: 10000},
    CUERO_NARANJA: {salt: '', nombre: 'Cuero Naranja', price: 10000},
    CUERO_CAFE: {salt: '', nombre: 'Cuero Café', price: 10000},
    CUERO_VIOLETA: {salt: '', nombre: 'Cuero Violeta', price: 10000},
    CUERO_MULTICOLOR: {salt: '', nombre: 'Cuero Multicolor', price: 10000},
    CUERO_VERDE_MILITAR: {salt: '', nombre: 'Cuero Verde militar', price: 10000},
    CUERO_SALMON: {salt: '', nombre: 'Cuero Salmon', price: 10000},
    CUERO_VERDE_MENTA: {salt: '', nombre: 'Cuero Verde Menta', price: 10000},
    CUERO_BEIGE: {salt: '', nombre: 'Cuero Beige', price: 10000},
    CUERO_ROSADO: {salt: '', nombre: 'Cuero Rosado', price: 10000},
    //
    ACERO_ORO: {salt: '', nombre: 'Acero Oro', price: 10000},
    ACERO_PLATA: {salt: '', nombre: 'Acero Plata', price: 10000},
    //
    TELA_NEGRA: {salt: '', nombre: 'Tela Negra', price: 10000},
    TELA_AZUL: {salt: '', nombre: 'Tela Azul', price: 10000}
    //
  };
  /////////////////////////////////////////    CONFIGS     ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////    CAJAS     ////////////////////////////////////////////////////////////////////////////////
  CONFIG_CAJA_SLIM: CajaM = {
    diametro_externo:
      [this.BASE_DIAMETROS_EXTERNOS['38'],
        this.BASE_DIAMETROS_EXTERNOS['42']],
    diametro_interno: [
      this.BASE_DIAMETROS_INTERNOS.miyota_8n24,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n40
    ],
    materiales: [
      this.maderas,
      this.metalicos
    ]
  };
  //
  CONFIG_CAJA_ONE: CajaM = {
    diametro_externo: [
      this.BASE_DIAMETROS_EXTERNOS['38'],
      this.BASE_DIAMETROS_EXTERNOS['42,5']
    ],
    diametro_interno: [
      this.BASE_DIAMETROS_INTERNOS.miyota_8n24,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n40
    ],
    materiales: [
      this.maderas,
      this.metalicos
    ]
  };
  //
  CONFIG_CAJA_ORIGEN: CajaM = {
    diametro_externo: [
      this.BASE_DIAMETROS_EXTERNOS['38'],
      this.BASE_DIAMETROS_EXTERNOS['42'],
      this.BASE_DIAMETROS_EXTERNOS['43']
    ],
    diametro_interno: [
      this.BASE_DIAMETROS_INTERNOS.miyota_8n40,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n24,
      this.BASE_DIAMETROS_INTERNOS.miyota_5n_27,
      this.BASE_DIAMETROS_INTERNOS.eta
    ],
    materiales: [this.maderas]
  };
  //
  CONFIG_CAJA_INTI: CajaM = {
    diametro_externo: [
      this.BASE_DIAMETROS_EXTERNOS['38'],
      this.BASE_DIAMETROS_EXTERNOS['42'],
      this.BASE_DIAMETROS_EXTERNOS['43']
    ],
    diametro_interno: [
      this.BASE_DIAMETROS_INTERNOS.miyota_5n_27,
      this.BASE_DIAMETROS_INTERNOS.eta,
      this.BASE_DIAMETROS_INTERNOS.seagull,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n40,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n24
    ],
    materiales: [
      this.maderas,
      this.metalicos]
  };
  CONFIG_CAJA_VIRA_AROS: CajaM = {
    diametro_externo: [
      this.BASE_DIAMETROS_EXTERNOS['38'],
      this.BASE_DIAMETROS_EXTERNOS['42'],
      this.BASE_DIAMETROS_EXTERNOS['43']
    ],
    diametro_interno: [
      this.BASE_DIAMETROS_INTERNOS.miyota_5n_27,
      this.BASE_DIAMETROS_INTERNOS.eta,
      this.BASE_DIAMETROS_INTERNOS.seagull,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n40,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n24],
    materiales: [this.maderas,
      this.metales_preciosos,
      [...this.piedras_preciosas, ...this.piedras_semi_preciosas]]
  };
  CONFIG_CAJA_NAVIGATOR: CajaM = {
    diametro_externo: [
      this.BASE_DIAMETROS_EXTERNOS['38'],
      this.BASE_DIAMETROS_EXTERNOS['42'],
      this.BASE_DIAMETROS_EXTERNOS['43']
    ],
    diametro_interno: [
      this.BASE_DIAMETROS_INTERNOS.miyota_5n_27,
      this.BASE_DIAMETROS_INTERNOS.eta,
      this.BASE_DIAMETROS_INTERNOS.seagull,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n40,
      this.BASE_DIAMETROS_INTERNOS.miyota_8n24],
    materiales: [this.maderas,
      this.metales_preciosos,
      [...this.piedras_preciosas, ...this.piedras_semi_preciosas]]
  };
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  CONFIG_RELOJ_ORIGEN_LUXURY = {
    COLOR_MAQUINARIA: [
      this.BASE_COLORES_MAQUINARIA.PLATEADO,
      this.BASE_COLORES_MAQUINARIA.DORADO],
    TIPO_PULSO: [
      ...Object.values(this.BASE_PULSOS)
    ]
  };

  CONFIG_RELOJ_ORIGEN_FRUTAS = {
    COLOR_MAQUINARIA: [
      this.BASE_COLORES_MAQUINARIA.PLATEADO
    ],
    TIPO_PULSO: [
      ...Object.values(this.BASE_PULSOS)
    ]
  };

  CONFIG_RELOJ_ORIGEN_HAWAII = {
    COLOR_MAQUINARIA: [
      this.BASE_COLORES_MAQUINARIA.PLATEADO
    ],
    TIPO_PULSO: [
      ...Object.values(this.BASE_PULSOS)
    ]
  };
  CONFIG_RELOJ_ORIGEN_VINTAGE = {
    COLOR_MAQUINARIA: [
      this.BASE_COLORES_MAQUINARIA.PLATEADO,
      this.BASE_COLORES_MAQUINARIA.DORADO],
    TIPO_PULSO: [
      ...Object.values(this.BASE_PULSOS)]
  };
  CONFIG_RELOJ_ORIGEN_TELAS = {
    COLOR_MAQUINARIA: [
      this.BASE_COLORES_MAQUINARIA.PLATEADO,
      this.BASE_COLORES_MAQUINARIA.DORADO],
    TIPO_PULSO: [
      ...Object.values(this.BASE_PULSOS)]
  };
  CONFIG_RELOJ_ORIGEN_ANIMAL_PRINT = {
    COLOR_MAQUINARIA: [
      this.BASE_COLORES_MAQUINARIA.PLATEADO,
      this.BASE_COLORES_MAQUINARIA.DORADO
    ],
    TIPO_PULSO: [
      ...Object.values(this.BASE_PULSOS)
    ]
  };

  COLECCIONES: any = {
    ORIGEN_LUXURY:
      {salt: 'X', id: 0, nombre: 'Luxury', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_LUXURY},
    ORIGEN_PACIFICO:
      {salt: 'H', id: 1, nombre: 'Pacifico', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_HAWAII},
    ORIGEN_ANIMAL_PRINT:
      {salt: 'A', id: 2, nombre: 'Animal Print', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_ANIMAL_PRINT},
    ORIGEN_FRUTAS:
      {salt: 'F', id: 3, nombre: 'Frutas', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_FRUTAS},
    ORIGEN_TELAS:
      {salt: 'T', id: 4, nombre: 'Telas', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_TELAS},
    ORIGEN_VINTAGE:
      {salt: 'V', id: 5, nombre: 'Vintage', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    // //////////////////////////////////////////////
    ONE_LUXURY:
      {salt: 'V', id: 6, nombre: 'Luxury', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    // /////////////////////////////////////////////
    INTI_LUXURY:
      {salt: 'V', id: 7, nombre: 'Luxury', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    INTI_PACIFICO:
      {salt: 'V', id: 8, nombre: 'Pacifico', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    // /////////////////////////////////////////////
    DYUS_VIRA:
      {salt: 'V', id: 9, nombre: 'Vira', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    SLIM_P:
      {salt: 'V', id: 10, nombre: 'P', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    NAVIGATOR_A:
      {salt: 'V', id: 10, nombre: 'A', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE}
  };

// LAS SALT, JAMAS DEBEN REPETIRSE, Y SE DEBEN AGREGAR A MANO, PUES ESTRUCTURAN EL SERIAL
  _modelos: any = {
    ORIGEN: {
      salt: 'G',
      nombre: 'Origen',
      items: [
        this.COLECCIONES.ORIGEN_PACIFICO,
        this.COLECCIONES.ORIGEN_ANIMAL_PRINT,
        this.COLECCIONES.ORIGEN_TELAS,
        this.COLECCIONES.ORIGEN_VINTAGE],
      opciones_caja: this.CONFIG_CAJA_ORIGEN
    },
    INTI: {
      salt: 'I',
      nombre: 'Inti',
      items: [
        this.COLECCIONES.INTI_LUXURY,
        this.COLECCIONES.INTI_PACIFICO],
      opciones_caja: this.CONFIG_CAJA_INTI
    },
    ONE: {
      salt: 'N',
      nombre: 'One',
      items: [this.COLECCIONES.ONE_LUXURY],
      opciones_caja: this.CONFIG_CAJA_ONE
    },
    VIRA_AROS: {
      salt: 'A',
      nombre: 'Vira Aros',
      items: [this.COLECCIONES.DYUS_VIRA],
      opciones_caja: this.CONFIG_CAJA_VIRA_AROS
    },
    SLIM: {
      salt: 'S',
      nombre: 'Slim',
      items: [this.COLECCIONES.SLIM_P],
      opciones_caja: this.CONFIG_CAJA_SLIM
    },
    NAVIGATOR: {
      salt: 'V',
      nombre: 'Navigator',
      items: [this.COLECCIONES.NAVIGATOR_A],
      opciones_caja: this.CONFIG_CAJA_NAVIGATOR
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  MODELOS = [
    this._modelos.ORIGEN,
    this._modelos.INTI,
    this._modelos.ONE,
    this._modelos.SLIM,
    this._modelos.VIRA_AROS,
    this._modelos.NAVIGATOR
  ];
/// .......materiales
  materiales: any = [
    this.BASE_MATERIALES.MADERA,
    this.BASE_MATERIALES.METAL_PRECIOSO,
    this.BASE_MATERIALES.PIEDRA_SEMI_PRECIOSA
  ];
  COLORES_MAQUINARIA = [
    this.BASE_COLORES_MAQUINARIA.DORADO,
    this.BASE_COLORES_MAQUINARIA.PLATEADO];
}
