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
export const accoutingRoutes = [
  {
    category: 'Libros Contables',
    subCategories: [
      {
        icon: 'fa-books',
        name: 'Libros Contables',
        path: '/watch/structures/',
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
          {name: 'Recibos', path: '/accouting/payments/invoices'}
          // , {name: 'Facturas', path: '/accouting/payments/juridicPerson'}
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
  , {
    category: 'Desarrollo', subCategories: []
  },
  {
    category: 'Fotografía y edición', subCategories: []
  }
];
export const manufactureRoute = [
  {
    category: 'Producción', subCategories: [
      {
        icon: 'fa-cogs', path: '/watch/marketing', name: 'Fresado', tabs: [
          {name: 'Preforma', path: '/watch/marketing/strategies'},
          {name: 'Limpieza', path: '/watch/marketing/strategies'},
          {name: 'Lado A', path: '/watch/marketing/strategies'},
          {name: 'Lado B', path: '/watch/marketing/strategies'},
          {name: 'Perforación', path: '/watch/marketing/strategies'},
          {name: 'Pulido', path: '/watch/marketing/strategies'},
        ]
      },
      {
        icon: 'fa-cogs', path: '/watch/marketing', name: 'Corte CNC', tabs: [
          {name: 'Estrategias', path: '/watch/marketing/strategies'}
        ]
      },
      {
        icon: 'fa-cogs', path: '/watch/marketing', name: 'Canteadora', tabs: [
          {name: 'Estrategias', path: '/watch/marketing/strategies'}
        ]
      },
      {
        icon: 'fa-cogs', path: '/watch/marketing', name: 'Corte laser', tabs: [
          {name: 'Estrategias', path: '/watch/marketing/strategies'}
        ]
      },
      {
        icon: 'fa-cogs', path: '/watch/marketing', name: 'Impresión de rigidos', tabs: [
          {name: 'Estrategias', path: '/watch/marketing/strategies'}
        ]
      },
      {
        icon: 'fa-cogs', path: '/watch/marketing', name: 'Impresión 3D', tabs: [
          {name: 'Estrategias', path: '/watch/marketing/strategies'}
        ]
      }
    ]
  },
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
    category: 'Inventario de área', subCategories: [
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
  , {
    category: 'Inventario de área', subCategories: [
      {
        icon: 'fa-hammer', name: 'Producción', path: '/global/orders/',
        tabs: [
          {name: 'Áreas: ', path: '/globalsassd/orders/actives'},
          {name: 'Fresado', path: '/global/orders/actives'},
          {name: 'Corte CNC', path: '/global/orders/packables'},
          {name: 'Corte laser', path: '/global/orders/distpachables'},
          {name: 'Impresion de rigidos', path: '/global/orders/finished'},
          {name: 'Impresion 3D', path: '/global/orders/finished'}
        ]
      },
      {
        icon: 'fa-pencil-ruler', name: 'Diseño', path: '/global/ordgrwers/',
        tabs: [
          {name: 'Desarrollo', path: '/global/orders/actives'},
          {name: 'Desarrollo', path: '/global/orders/actives'},
          {name: 'Diseño de Producto', path: '/global/orders/packables'},
          {name: 'Edición y fotografía', path: '/global/orders/distpachables'}
        ]
      }
      ,
      {
        icon: 'fa-file-invoice-dollar', name: 'Financiero', path: '/global/ordgrwers/',
        tabs: [
          {name: 'Contabidad', path: '/global/orders/actives'},
          {name: 'Analisis y proyecciones', path: '/global/orders/packables'}
        ]
      }
      // ,
      // {
      //   icon: 'fa-megaphone', name: 'Mercadeo', path: '/global/ordgrwers/',
      //   tabs: [
      //     {name: 'Contabidad', path: '/global/orders/actives'},
      //     {name: 'Analisis y proyecciones', path: '/global/orders/packables'}
      //   ]
      // }
    ]
  }
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
      , {
        icon: 'fa-ring',
        path: '/watch/web',
        name: 'Anillos', tabs: [
          {name: 'Relojes', path: '/watch/web/strategies'},
          {name: 'Anillos', path: '/watch/web/strategies'}
        ]
      },
      {
        icon: 'fa-shopping-bag', path: '/watch/web', name: 'Sobres', tabs: [
          {name: 'Relojes', path: '/watch/web/strategies'},
          {name: 'Anillos', path: '/watch/web/strategies'}
        ]
      }
    ]
  },
];
export const SUPPORTED_LINES_PRODUCTS: any[] = [
  {name: 'Contabilidad', icon: 'fa-abacus', productId: 'ACCOUTING', routes: accoutingRoutes},
  {name: 'Almacén', icon: 'fa-warehouse', productId: 'WAREHOUSE', routes: warehouseRoutes},
  {name: 'Sistema', icon: 'fa-terminal', productId: 'WAREHOUSE', routes: systemRoutes},
  {name: 'Mercadeo', icon: 'fa-megaphone', productId: 'WEB', routes: marketingRoutes},
  {name: 'Diseño', icon: 'fa-pencil-ruler', productId: 'DESIGN', routes: designRoutes},
  {name: 'Producción', icon: 'fa-pallet-alt', productId: 'MANUFACTURE', routes: manufactureRoute},
  {name: 'Gerencia', icon: 'fa-user-tie', productId: 'GENERAL', routes: globalRoutes}
];

export class Routable {
  constructor(naame: string, faaIcon: string, miinimalPath: string, taabs: any[]) {
    return {
      name: naame,
      minimalPath: miinimalPath,
      icon: faaIcon,
      tabs: taabs
    };
  }
}


export const accountingRoutesV2 = [
  {
    name: 'Registros contables',
    minimalPath: 'records',
    activities: [
      new Routable(
        'Pagos', 'fa-cash-register', 'payments', [
          {name: 'Recibos', minimalPath: 'invoices'}
        ])
    ]
  }
];

export const developmentRoutesV2 = [
  {
    name: 'DATOS EMPRESARIALES',
    minimalPath: 'public',
    activities: []
  }
];

export const humanResourcesRoutesV2 = [
  {
    name: 'Administración de Personal',
    minimalPath: 'employeesAdmin',
    activities: [
      new Routable(
        'Usuarios internos', 'fa-users', 'internalUsers', [
          {name: 'Usuarios', minimalPath: 'employees'}
        ])
    ]
  }
];

export const managementRoutesV2 = [
  {
    name: 'Datos empresariales',
    minimalPath: 'employeesAdmin',
    activities: [
      new Routable(
        'Cerificados', 'fa-file-alt', 'settings', [
          {name: 'Web', minimalPath: 'web'},
          {name: 'Datos legales', minimalPath: 'web'}
        ]),
      new Routable(
        'Contratos', 'fa-file-alt', 'settings', [
          {name: 'Web', minimalPath: 'web'},
          {name: 'Datos legales', minimalPath: 'web'}
        ]),
      new Routable(
        'Acuerdos', 'fa-file-alt', 'settings', [
          {name: 'Web', minimalPath: 'web'},
          {name: 'Datos legales', minimalPath: 'web'}
        ])
    ]
  }
];

export const warehouseResourcesRoutesV2 = [
  {
    name: 'Insumos de Relojería',
    minimalPath: 'watchmakingInventory',
    activities: [
      new Routable(
        'Materia Prima', 'fa-cube', 'rawMaterial', [
          {name: 'Maquinarias', minimalPath: 'movements'},
          {name: 'Coronas', minimalPath: 'crowns'},
          {name: 'Cristales', minimalPath: 'crystals'},
          {name: 'Hebillas', minimalPath: 'bunckles'},
          {name: 'Tapas', minimalPath: 'bunckles'}
        ]),
      new Routable(
        'Materias en proceso', 'fa-conveyor-belt-alt', 'in-process', [
          {name: 'Cajas-A', minimalPath: 'cases-a'},
          {name: 'Cajas-B', minimalPath: 'cases-b'},
          {name: 'Cajas-C', minimalPath: 'cases-c'},
          {name: 'Cajas-D', minimalPath: 'cases-d'},
          {name: 'Cajas-E', minimalPath: 'cases-e'},
          {},
          {name: 'Pulsos-A', minimalPath: 'straps-a'},
          {name: 'Pulsos-B', minimalPath: 'straps-b'},
          {name: 'Pulsos-C', minimalPath: 'straps-c'},
          {},
          {name: 'Empaques-A', minimalPath: 'package-a'},
          {name: 'Empaques-B', minimalPath: 'package-b'},
          {name: 'Empaques-C', minimalPath: 'package-c'},
          {name: 'Empaques-D', minimalPath: 'package-d'}
        ])
      ,
      new Routable(
        'Materias transformadas', 'fa-boxes', 'transformed-items', [
          {name: 'Pulsos', minimalPath: 'casesd'},
          {name: 'Empaques', minimalPath: 'casesd'}
        ]),
      new Routable(
        'Productos Terminados', 'fa-boxes', 'watchmaking', [
          {name: 'Relojes', minimalPath: 'cases'}
        ])
    ]
  },
  {
    name: 'Inventario de general',
    minimalPath: 'employeesAdmin',
    activities: [
      new Routable(
        'Insumos generales', 'fa-boxes-alt', 'users', [
          {name: 'Insumos generales', minimalPath: 'internalUsers'}
        ]),
      new Routable(
        'Herramientas', 'fa-tools', 'users', [
          {name: 'Herramientas', minimalPath: 'internalUsers'}
        ]),
      new Routable(
        'Equipos', 'fa-phone-laptop', 'users', [
          {name: 'Equipos', minimalPath: 'internalUsers'}
        ]),
      new Routable(
        'Mobiliario', 'fa-couch', 'users', [
          {name: 'Mobiliario', minimalPath: 'internalUsers'}
        ])
    ]
  },

  {
    name: 'Dotación de Área',
    minimalPath: 'areaAllocation',
    activities: [
      new Routable(
        'Producción', 'fa-pallet-alt', 'users', [
          {name: 'Administrador de usuarios', minimalPath: 'productionInventory'}
        ]),
      new Routable(
        'Diseño', 'fa-pencil-ruler', 'users', [
          {name: 'Administrador de usuarios', minimalPath: 'internalUsers'}
        ])
    ]
  }
];

export const logisticRoutes = [
  {
    name: 'Administración de Personal',
    minimalPath: 'employeesAdmin',
    activities: [
      new Routable(
        'Usuarios internos', 'fa-global', 'users', [
          {name: 'Administrador de usuarios', minimalPath: 'internalUsers'}
        ])
    ]
  }
];
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
export const DEPARTMENT_ROUTES: any[] = [
  {
    name: 'Administración',
    icon: 'fa-user-tie',
    minimalPath: 'management',
    areas: managementRoutesV2
  },
  {
    name: 'Contabilidad y Finanzas',
    icon: 'fa-analytics',
    minimalPath: 'accounting',
    areas: accountingRoutesV2
  },
  {
    name: 'Recursos Humanos',
    icon: 'fa-handshake-alt',
    minimalPath: 'humanResources',
    areas: humanResourcesRoutesV2
  },
  {
    name: 'Legal',
    icon: 'fa-balance-scale',
    minimalPath: 'generalData',
    areas: developmentRoutesV2
  },
  {
    name: 'Almacén',
    icon: 'fa-warehouse',
    minimalPath: 'warehouse',
    areas: warehouseResourcesRoutesV2
  }
  // ,
  // {
  //   name: 'Producción',
  //   icon: 'fa-pallet-alt',
  //   minimalPath: 'production',
  //   areas: developmentRoutesV2
  // },
  // {
  //   name: 'Logística',
  //   icon: 'fa-running',
  //   minimalPath: 'logistic',
  //   areas: developmentRoutesV2
  // },
  // {
  //   name: 'Diseño',
  //   icon: 'fa-pencil-ruler',
  //   minimalPath: 'design',
  //   areas: developmentRoutesV2
  // }
];
