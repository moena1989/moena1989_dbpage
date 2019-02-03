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

export class ModelCajasService {
  private piedras_preciosas: any = [
    {salt: 'EM', name: 'Esmeraldas'},
    {salt: 'RB', name: 'Rubí'},
    {salt: 'ZF', name: 'Zafiro'}];
  private piedras_semi_preciosas: any = [
    {salt: 'TS', name: 'Amatista'},
    {salt: 'AG', name: 'Ágata'},
    {salt: 'AM', name: 'Ámbar'},
    {salt: 'NX', name: 'Ónix'}];
  private metales_preciosos: any = [
    {salt: 'OR', id: 0, name: 'Oro'},
    {salt: 'PL', id: 1, name: 'Plata'}
  ];
  // .......materiales por categoria
  private metalicos: any = [
    {salt: 'AC', name: 'Acero'},
    {salt: 'AL', name: 'Aluminio'},
    {salt: 'CR', name: 'Cromo'},
    {salt: 'NQ', name: 'Níquel'},
    {salt: 'TT', name: 'Titanio'},
    {salt: 'PL', name: 'Platino'},
    {salt: 'AL', name: 'Alpaca'}];
  ceramicos: any = [{salt: 'MA', name: 'Marmol'}];
  maderas = [
    {salt: 'GD', name: 'Granadillo'},
    {salt: 'GD', name: 'Tagua'},
    {salt: 'GD', name: 'Ceramicos'},
    {salt: 'NR', name: 'Nazareno'},
    {salt: 'PM', name: 'Palo de Mora'},
    {salt: 'PS', name: 'Palo de Sangre'},
    {salt: 'NG', name: 'Nogal'},
    {salt: 'CD', name: 'Cedro'},
    {salt: 'AP', name: 'Achapo'},
    {salt: 'EB', name: 'Ébano'},
    {salt: 'FM', name: 'Flor Morado'},
    {salt: 'TK', name: 'Teca'},
    {salt: 'CM', name: 'Canelo Moena'},
    {salt: 'ZP', name: 'Zapan'},
    {salt: 'AM', name: 'Amargo'},
    {salt: 'CM', name: 'Comino Crespo'},
    {salt: 'PN', name: 'Pino'},
    {salt: 'AC', name: 'Abarco'},
    {salt: 'AR', name: 'algarrobo'},
    {salt: 'CM', name: 'Cumarú'}
  ];

  _maderas = {
    granadillo:
      {salt: 'GD', name: 'Granadillo'},
    tagua:
      {salt: 'GD', name: 'Tagua'},
    ceramico:
      {salt: 'GD', name: 'Ceramicos'},
    nazareno:
      {salt: 'NR', name: 'Nazareno'},
    palo_de_mora:
      {salt: 'PM', name: 'Palo de Mora'},
    palo_de_sangre:
      {salt: 'PS', name: 'Palo de Sangre'},
    nogal:
      {salt: 'NG', name: 'Nogal'},
    cedro:
      {salt: 'CD', name: 'Cedro'},
    achapo:
      {salt: 'AP', name: 'Achapo'},
    ebano:
      {salt: 'EB', name: 'Ébano'},
    flor_morado:
      {salt: 'FM', name: 'Flor Morado'},
    teca:
      {salt: 'TK', name: 'Teca'},
    canelo_moena:
      {salt: 'CM', name: 'Canelo Moena'},
    zapan:
      {salt: 'ZP', name: 'Zapan'},
    amargo:
      {salt: 'AM', name: 'Amargo'},
    comino_crespo:
      {salt: 'CM', name: 'Comino Crespo'},
    pino:
      {salt: 'PN', name: 'Pino'},
    abarco:
      {salt: 'AC', name: 'Abarco'},
    algarrobo:
      {salt: 'AR', name: 'algarrobo'},
    cumaru:
      {salt: 'CM', name: 'Cumarú'}
  };

  diametros_externos: any[] = [
    {name: '36'},
    {name: '38'},
    {name: '40'},
    {name: '42'},
    {name: '43'}];

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
    36: {salt: '36', name: '36 mm'},
    38: {salt: '38', name: '38 mm'},
    40: {salt: '40', name: '40 mm'},
    '42,5': {salt: '42.5', name: '42.5 mm'},
    42: {salt: '42', name: '42 mm'},
    43: {salt: '43', name: '43 mm'}
  };

  BASE_DIAMETROS_INTERNOS = {
    miyota_8n24:
      {salt: 'M24', name: '26.5mm | Miyota 8n24'},
    miyota_8n40:
      {salt: 'M40', name: '27mm | Miyota 8n40'},
    miyota_5n_27:
      {salt: 'M27', name: '27.5mm | Miyota 5n27'},
    seagull:
      {salt: 'SGL', name: '28mm | Segull'},
    eta:
      {salt: 'ETA', name: '37mm | Eta'}
  };

  BASE_GENERALS = {
    NO_APLICA_PARENT: {name: 'No aplica', items: [{salt: 'N/A', name: 'No aplica'}]},
    NO_APLICA_ITEM: {salt: 'N/A', name: 'No aplica'}
  };

  BASE_MATERIALES = {
    MADERA: {name: 'madera', items: this.maderas},
    METALICO: {name: 'Métalico', items: this.metalicos},
    METAL_PRECIOSO: {name: 'Metales Preciosos', items: this.metales_preciosos},
    PIEDRA_PRECIOSA: {name: 'Piedras Preciosas', items: this.piedras_preciosas},
    PIEDRA_SEMI_PRECIOSA: {name: 'Piedras Semi-preciosas', items: this.piedras_semi_preciosas},
  };

  BASE_COLORES_MAQUINARIA = {
    DORADO: {name: 'Dorado'},
    PLATEADO: {name: 'Plateado'}
  };

  BASE_PULSOS = {
    //
    CUERO_NEGRO: {salt: '', name: 'Cuero Negro'},
    CUERO_AZUL: {salt: '', name: 'Cuero Azul'},
    CUERO_GRIS: {salt: '', name: 'Cuero Gris'},
    CUERO_BLANCO: {salt: '', name: 'Cuero Blanco'},
    CUERO_AMARILLO: {salt: '', name: 'Cuero Amarillo'},
    CUERO_ROJO: {salt: '', name: 'Cuero Rojo'},
    CUERO_VERDE: {salt: '', name: 'Cuero verde'},
    CUERO_NARANJA: {salt: '', name: 'Cuero Naranja'},
    CUERO_CAFE: {salt: '', name: 'Cuero Café'},
    CUERO_VIOLETA: {salt: '', name: 'Cuero Violeta'},
    CUERO_MULTICOLOR: {salt: '', name: 'Cuero Multicolor'},
    CUERO_VERDE_MILITAR: {salt: '', name: 'Cuero Verde militar'},
    CUERO_SALMON: {salt: '', name: 'Cuero Salmon'},
    CUERO_VERDE_MENTA: {salt: '', name: 'Cuero Verde Menta'},
    CUERO_BEIGE: {salt: '', name: 'Cuero Beige'},
    CUERO_ROSADO: {salt: '', name: 'Cuero Rosado'},
    //
    ACERO_ORO: {salt: '', name: 'Acero Oro'},
    ACERO_PLATA: {salt: '', name: 'Acero Plata'},
    //
    TELA_NEGRA: {salt: '', name: 'Tela Negra'},
    TELA_AZUL: {salt: '', name: 'Tela Azul'}
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
      {salt: 'X', id: 0, name: 'Luxury', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_LUXURY},
    ORIGEN_PACIFICO:
      {salt: 'H', id: 1, name: 'Pacifico', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_HAWAII},
    ORIGEN_ANIMAL_PRINT:
      {salt: 'A', id: 2, name: 'Animal Print', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_ANIMAL_PRINT},
    ORIGEN_FRUTAS:
      {salt: 'F', id: 3, name: 'Frutas', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_FRUTAS},
    ORIGEN_TELAS:
      {salt: 'T', id: 4, name: 'Telas', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_TELAS},
    ORIGEN_VINTAGE:
      {salt: 'V', id: 5, name: 'Vintage', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    // //////////////////////////////////////////////
    ONE_LUXURY:
      {salt: 'V', id: 6, name: 'Luxury', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    // /////////////////////////////////////////////
    INTI_LUXURY:
      {salt: 'V', id: 7, name: 'Luxury', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    INTI_PACIFICO:
      {salt: 'V', id: 8, name: 'Pacifico', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    // /////////////////////////////////////////////
    DYUS_VIRA:
      {salt: 'V', id: 9, name: 'Vira', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    SLIM_P:
      {salt: 'V', id: 10, name: 'P', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE},
    NAVIGATOR_A:
      {salt: 'V', id: 10, name: 'A', opciones_reloj: this.CONFIG_RELOJ_ORIGEN_VINTAGE}
  };

// LAS SALT, JAMAS DEBEN REPETIRSE, Y SE DEBEN AGREGAR A MANO, PUES ESTRUCTURAN EL SERIAL todo buscar como comprobar esto...
  _modelos: any = {
    ORIGEN: {
      salt: 'G',
      name: 'Origen',
      items: [
        this.COLECCIONES.ORIGEN_PACIFICO,
        this.COLECCIONES.ORIGEN_ANIMAL_PRINT,
        this.COLECCIONES.ORIGEN_TELAS,
        this.COLECCIONES.ORIGEN_VINTAGE],
      opciones_caja: this.CONFIG_CAJA_ORIGEN
    },
    INTI: {
      salt: 'I',
      name: 'Inti',
      items: [
        this.COLECCIONES.INTI_LUXURY,
        this.COLECCIONES.INTI_PACIFICO],
      opciones_caja: this.CONFIG_CAJA_INTI
    },
    ONE: {
      salt: 'N',
      name: 'One',
      items: [this.COLECCIONES.ONE_LUXURY],
      opciones_caja: this.CONFIG_CAJA_ONE
    },
    VIRA_AROS: {
      salt: 'A',
      name: 'Vira Aros',
      items: [this.COLECCIONES.DYUS_VIRA],
      opciones_caja: this.CONFIG_CAJA_VIRA_AROS
    },
    SLIM: {
      salt: 'S',
      name: 'Slim',
      items: [this.COLECCIONES.SLIM_P],
      opciones_caja: this.CONFIG_CAJA_SLIM
    },
    NAVIGATOR: {
      salt: 'V',
      name: 'Navigator',
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
