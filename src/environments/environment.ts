// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environments.ts` with `environments.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false
};
export const DEFAULT_CODE_LANG = 'es';
export const DEFAULT_SYMBOL_CURRENCY = 'US$';
export const SHOW_WINDOWS_BAR = true;
export const MAX_SIZE_IN_PX = 2500;
export const MAX_SIZE_IN_MB = 0.7;

export const designRoutes = [
  {
    category: 'Diseño de relojes', subCategories: [
      {
        icon: 'fa-watch',
        path: '/design/watches',
        name: 'Estructura de relojes',
        tabs: [
          {name: 'Modelos', path: '/design/watches/models'},
          {name: '|', path: '#'},
        ],
        dynamicTabsData: {
          path: 'design/watches/collections',
          dbParams: {iddb: 'main', typeProduct: 'watches', category: 'structures', itemType: 'models'},
          filterKey: 'metadata.id' // TODO: ESTA VARIABLE SOLO DEBE SER PARA FILTRAR LAS TABS...
        }
      }
    ]
  }
  // , {
  //   category: 'Desarrollo', subCategories: []
  // },
  // {
  //   category: 'Fotografía y edición', subCategories: []
  // }
];

export const manufactureRoute = [
  // {
  //   category: 'Producción', subCategories: [
  //     {
  //       icon: 'fa-cogs', path: '/watch/marketing', name: 'Fresado', tabs: [
  //         {name: 'Preforma', path: '/watch/marketing/strategies'},
  //         {name: 'Limpieza', path: '/watch/marketing/strategies'},
  //         {name: 'Lado A', path: '/watch/marketing/strategies'},
  //         {name: 'Lado B', path: '/watch/marketing/strategies'},
  //         {name: 'Perforación', path: '/watch/marketing/strategies'}
  //       ]
  //     },
  //     {
  //       icon: 'fa-cogs', path: '/watch/marketing', name: 'Corte CNC', tabs: [
  //         {name: 'Estrategias', path: '/watch/marketing/strategies'}
  //       ]
  //     },
  //     {
  //       icon: 'fa-cogs', path: '/watch/marketing', name: 'Canteadora', tabs: [
  //         {name: 'Estrategias', path: '/watch/marketing/strategies'}
  //       ]
  //     },
  //     {
  //       icon: 'fa-cogs', path: '/watch/marketing', name: 'Corte laser', tabs: [
  //         {name: 'Estrategias', path: '/watch/marketing/strategies'}
  //       ]
  //     },
  //     {
  //       icon: 'fa-cogs', path: '/watch/marketing', name: 'Impresión de rigidos', tabs: [
  //         {name: 'Estrategias', path: '/watch/marketing/strategies'}
  //       ]
  //     },
  //     {
  //       icon: 'fa-cogs', path: '/watch/marketing', name: 'Impresión 3D', tabs: [
  //         {name: 'Estrategias', path: '/watch/marketing/strategies'}
  //       ]
  //     }
  //   ]
  // },
  {
    category: 'Inventario', subCategories: [
      {
        icon: 'fa-inventory', path: '/manufacture/localWarehouse', name: 'Registro local', tabs: [
          {name: 'Ruedas', path: 'manufacture/localWarehouse/rounds'},
          {name: 'Cajas', path: 'manufacture/localWarehouse/cases'},
          {name: 'Armados', path: 'manufacture/localWarehouse/armed'},
          {name: 'Serializados', path: 'manufacture/localWarehouse/serialized'},
          {name: 'Completos', path: 'manufacture/localWarehouse/fullProducts'}
        ]
      }
    ]
  }
];

export const globalRoutes = [
  {
    category: 'Despacho', subCategories: [
      {
        icon: 'fa-file-edit', name: 'Pedidos', path: '/global/orders/',
        tabs: [
          {name: 'Por asignar', path: '/global/orders/actives'},
          {name: 'Por embalar', path: '/global/orders/packables'},
          {name: 'Por despachar', path: '/global/orders/distpachables'},
          {name: 'Finalizadas', path: '/global/orders/finished'}
        ]
      }
    ]
  }
];

export const warehouseRoutes = [
  // {
  //   category: 'Inventario general', subCategories: [
  //     {
  //       icon: 'fa-boxes-alt', name: 'Insumos generales', path: '/global/ordgers/',
  //       tabs: []
  //     },
  //     {
  //       icon: 'fa-tools', name: 'Herramientas', path: '/global/ordgers/',
  //       tabs: []
  //     },
  //     {
  //       icon: 'fa-phone-laptop', name: 'Equipos', path: '/global/ordgers/',
  //       tabs: [
  //         {name: 'Máquinas', path: 'watch/strsuctures/mosvements'},
  //         {name: 'Computadores', path: 'watch/structuress/movesments'},
  //         {name: 'Vehiculos', path: 'watch/strsuctures/mosvements'}
  //       ]
  //     },
  //     {
  //       icon: 'fa-couch', name: 'Mobiliario', path: '/global/ordgers/',
  //       tabs: [
  //         {name: 'Mesas', path: 'watch/strsuctures/mosvements'},
  //         {name: 'Decorativos', path: 'watch/strsuctures/mosvements'},
  //         {name: 'Sillas', path: 'watch/strsuctures/mosvements'}
  //         // {name: 'Máquinas', path: 'watch/strsuctures/mosvements'},
  //       ]
  //     },
  //     {
  //       icon: 'fa-parachute-box', name: 'Dotaciones', path: '/global/ordgers/',
  //       tabs: []
  //     }
  //   ]
  // },
  {
    category: 'Inventario de producción', subCategories: [
      {
        icon: 'fa-watch', name: 'Insumos de reloj', path: '/watch/structures/',
        tabs: [
          {name: 'Maquinarias', path: 'watch/structures/movements'},
          {name: 'Pulsos', path: 'watch/structures/straps'},
          {name: 'Coronas', path: 'watch/structures/crowns'},
          // {name: 'Hebillas', path: 'watch/structures/bunckles'},
          // {name: 'Herrajes', path: '/warehouse/inventory/furnishings'},
          {name: 'Cristales', path: 'watch/structures/crystals'}
          // {name: 'Tapas', path: 'watch/structures/casebacks'},
          // {name: 'Cueros', path: 'watch/structures/leather'},
          // {name: 'Maderas', path: '/warehouse/inventory/rawMaterial'}
        ]
      }
    ]
  }
  // ,  {
  //   category: 'Inventario de área', subCategories: [
  //     {
  //       icon: 'fa-hammer', name: 'Producción', path: '/global/orders/',
  //       tabs: [
  //         {name: 'Áreas: ', path: '/globalsassd/orders/actives'},
  //         {name: 'Fresado', path: '/global/orders/actives'},
  //         {name: 'Corte CNC', path: '/global/orders/packables'},
  //         {name: 'Corte laser', path: '/global/orders/distpachables'},
  //         {name: 'Impresion de rigidos', path: '/global/orders/finished'},
  //         {name: 'Impresion 3D', path: '/global/orders/finished'}
  //       ]
  //     },
  //     {
  //       icon: 'fa-pencil-ruler', name: 'Diseño', path: '/global/ordgrwers/',
  //       tabs: [
  //         {name: 'Desarrollo', path: '/global/orders/actives'},
  //         {name: 'Desarrollo', path: '/global/orders/actives'},
  //         {name: 'Diseño de Producto', path: '/global/orders/packables'},
  //         {name: 'Edición y fotografía', path: '/global/orders/distpachables'}
  //       ]
  //     }
  //     ,
  //     {
  //       icon: 'fa-file-invoice-dollar', name: 'Financiero', path: '/global/ordgrwers/',
  //       tabs: [
  //         {name: 'Contabidad', path: '/global/orders/actives'},
  //         {name: 'Analisis y proyecciones', path: '/global/orders/packables'}
  //       ]
  //     }
  //     // ,
  //     // {
  //     //   icon: 'fa-megaphone', name: 'Mercadeo', path: '/global/ordgrwers/',
  //     //   tabs: [
  //     //     {name: 'Contabidad', path: '/global/orders/actives'},
  //     //     {name: 'Analisis y proyecciones', path: '/global/orders/packables'}
  //     //   ]
  //     // }
  //   ]
  // }
];

export const marketingRoutes = [
  {
    category: 'Marketing Digital', subCategories: [
      {
        icon: 'fa-newspaper', path: '/watch/sfewtructures', name: 'Blog', tabs: [
          {name: 'Maquinarias', path: 'watch/structures/movements'},
        ]
      },
      {
        icon: 'fa-inbox-out', path: '/watch/strucqrgtures', name: 'Newsletters', tabs: [
          {name: 'Maquinarias', path: 'watch/structures/movements'},
        ]
      }
    ]
  },
  {
    category: 'Catalogo de productos', subCategories: [
      {
        icon: 'fa-watch', path: '/marketing/catalog', name: 'Relojes', tabs: [
          {name: 'Modelos: ', path: ''}
        ],
        dynamicTabsData: {
          path: '/marketing/catalog/watches',
          dbParams: {iddb: 'main', typeProduct: 'watches', category: 'structures', itemType: 'models'},
          filterKey: 'metadata.id'
        }
      }
      // ,{
      //   icon: 'fa-ring', path: '/watch/web', name: 'Anillos', tabs: [
      //     {name: 'Relojes', path: '/watch/web/strategies'},
      //     {name: 'Anillos', path: '/watch/web/strategies'}
      //   ]
      // },
      // {
      //   icon: 'fa-shopping-bag', path: '/watch/web', name: 'Sobres', tabs: [
      //     {name: 'Relojes', path: '/watch/web/strategies'},
      //     {name: 'Anillos', path: '/watch/web/strategies'}
      //   ]
      // }
    ]
  },
];

export const availablesRoutes = [
  {category: 'global', tab: '', icon: '', path: ''},
  {category: 'ring', tab: '', icon: '', path: ''},
  {category: '', tab: '', icon: '', path: ''}
];

export const jewelryRoutes = [
  {
    category: 'Producción', subCategories: [
      {icon: 'fa-boxes-alt', name: 'Lots', path: '/watch/manufacture/lots'},
      {icon: 'fa-box-alt', name: 'Unidades', path: '/watch/manufacture/units'},
      {icon: 'fa-puzzle-piece', name: 'Estructuras', path: '/watch/development/structures'},
      {icon: 'fa-users', name: 'Equipos de trabajo', path: '/watch/development/users'}
    ]
  },
  {
    category: 'Mercadeo', subCategories: [
      {icon: 'fa-chess-knight', name: 'Estrategias', path: '/watch/marketing/strategies'}
    ]
  },
  {
    category: 'Despacho', subCategories: [
      {icon: 'fa-chess-knight', name: 'Estrategias', path: '/watch/marketing/strategies'}
    ]
  },
  {
    category: 'Finanzas', subCategories: [
      {icon: 'fa-file-chart-pie', name: 'Estados financieros', path: '/watch/financies/financialState'}
      // {icon: 'fa-file-invoice-dollar', name: 'Proyeciones', path: ''},
      // {icon: 'fa-analytics', name: 'Analiticas', path: ''}
    ]
  },
  {
    category: 'Contabilidad', subCategories: [
      {icon: 'fa-users', name: 'Proveedores', path: '/watch/accounting/providers'},
      {icon: 'fa-hand-holding-box', name: 'Reportes', path: '/watch/accounting/reports'}
    ]
  }
];
export const systemRoutes = [
  {
    category: 'Inventario de producción', subCategories: [
      {
        icon: 'fa-watch', name: 'Inicio', path: '/watch/structures/',
        tabs: [
          {name: 'Inicio', path: ''}
        ]
      }
    ]
  }
];

export const accoutingRoutes = [
  {
    category: 'Libros Contables', subCategories: [
      {
        icon: 'fa-books', name: 'Libros Contables', path: '/watch/structures/',
        tabs: [
          {name: 'Mayor', path: ''},
          {name: 'Diario', path: ''},
          {name: 'Inventario y cuentas', path: ''}
        ]
      }
    ]
  },
  {
    category: 'Registros', subCategories: [
      {
        icon: 'fa-hands-usd', name: 'Pagos', path: '/accouting',
        tabs: [
          {name: 'Recibos', path: '/accouting/payments/naturalPerson'}
          , {name: 'Facturas', path: '/accouting/payments/juridicPerson'}
        ]
      }
      // ,
      // {
      //   icon: 'fa-abacus', name: 'Inicio', path: '/watch/structures/',
      //   tabs: [
      //     {name: 'Inicio', path: ''}
      //   ]
      // },
      // {
      //   icon: 'fa-abacus', name: 'Inicio', path: '/watch/structures/',
      //   tabs: [
      //     {name: 'Inicio', path: ''}
      //   ]
      // }
    ]
  }

];
export const SUPPORTED_LINES_PRODUCTS: any[] = [
  {name: 'Contabilidad', icon: 'fa-abacus', productId: 'ACCOUTING', routes: accoutingRoutes},
  {name: 'Almacén', icon: 'fa-warehouse', productId: 'WAREHOUSE', routes: warehouseRoutes},
  {name: 'Sistema', icon: 'fa-terminal', productId: 'WAREdsHOUSE', routes: systemRoutes},
  {name: 'Mercadeo', icon: 'fa-megaphone', productId: 'WEB', routes: marketingRoutes},
  {name: 'Diseño', icon: 'fa-pencil-ruler', productId: 'DESIGN', routes: designRoutes},
  {name: 'Producción', icon: 'fa-pallet-alt', productId: 'MANUFACTURE', routes: manufactureRoute},
  {name: 'Gerencia', icon: 'fa-arrow-from-left', productId: 'GENERAL', routes: globalRoutes}
];

export const PRODUCT_TYPES = {
  WATCH: 'watches',
};

export const WATCH_PARTS = {
  MOVEMENT: {
    name: 'Maquinaria',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'movements',
    typeId: 'movement'
  },
  CASE: {
    name: 'Caja',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'cases',
    typeId: 'case'
  },
  MODEL: {
    name: 'Modelo',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'models',
    typeId: 'model'
  },
  COLLECTION: {
    name: 'Colección',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'bunckles',
    typeId: 'collection'
  },
  WATCH_CONFIG: {
    name: 'Configuración de reloj',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'watchConfigs',
    typeId: 'watchConfig'
  },
  STRAP: {
    name: 'Pulso',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'straps',
    typeId: 'strap'
  },
  BUNCKLE: {
    name: 'Hebilla',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'bunckles',
    typeId: 'bunckle'
  },
  CROWN: {
    name: 'Corona',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'crowns',
    typeId: 'crown'
  },
  CASEBACK: {
    name: 'Tapa',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'casebacks',
    typeId: 'caseback'
  },
  CRYSTAL: {
    name: 'Cristal',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'crystals',
    typeId: 'crystal'
  }
};

export const CATEGORIES = {
  INVENTORY: 'inventory',
  STRUCTURE: 'structures',
  COUNTER: 'counters',
  LOTS: 'lots'
};

export const DBS = {
  public: {
    apiKey: 'AIzaSyAZcu9JauJIWtaGQnDgLnJ3ZFg7RcEweAo',
    authDomain: 'publicpage-5b145-68fbf.firebaseapp.com',
    databaseURL: 'https://publicpage-5b145-68fbf.firebaseio.com',
    projectId: 'publicpage-5b145',
    storageBucket: 'publicpage-5b145.appspot.com',
    messagingSenderId: '610932498989'
  },
  main: {
    apiKey: 'AIzaSyC2yKQPYRZeTnF1rqFNtWkAC8JVBAXEMTI',
    authDomain: 'moena-1989.firebaseapp.com',
    databaseURL: 'https://moena-1989.firebaseio.com',
    projectId: 'moena-1989',
    storageBucket: 'moena-1989.appspot.com',
    messagingSenderId: '641564036734'
  },
  main_test: { /// remplzar por main para hacer pruebas con datos ficticios
    apiKey: 'AIzaSyC2yKQPYRZeTnF1rqFNtWkAC8JVBAXEMTI',
    authDomain: 'moena-1989.firebaseapp.com',
    databaseURL: 'https://moena-1989.firebaseio.com',
    projectId: 'moena-1989',
    storageBucket: 'moena-1989.appspot.com',
    messagingSenderId: '641564036734'
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
