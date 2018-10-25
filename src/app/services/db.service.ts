import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseAuth} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

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


  opciones: any[] = [];

  modelosFile: any[] = [
    {
      name: 'Origen', salt: 'OG',
      colecciones: [
        {id: 1, name: 'Luxury'},
        {id: 2, name: 'Hawaii'},
        {id: 3, name: 'Animal Print'},
        {id: 4, name: 'Frutas'},
        {id: 5, name: 'Telas'},
        {id: 6, name: 'Vintaje'},
        {id: 6, name: 'Edición Especial'},
      ]
    },
    {
      name: 'Inti', salt: 'OG',
      colecciones: [
        {id: 1, name: 'Luxury'},
        {id: 2, name: 'Hawaii'},
        {id: 3, name: 'Animal Print'},
        {id: 4, name: 'Frutas'},
        {id: 5, name: 'Telas'},
        {id: 6, name: 'Vintaje'},
        {id: 6, name: 'Edición Especial'},
      ]
    },
  ];

  modelos: any[] = [
    {
      name: 'Origen', salt: 'OG'
    },
    {
      name: 'Slim', salt: 'SL',
      options: {}
    },
    {
      name: 'Vira', salt: 'VR',
      options: {}
    },
    {
      name: 'Inti', salt: 'IT',
      options: {}
    },
    {
      name: 'Aros', salt: 'AR',
      options: {}
    },
    {
      name: 'One', salt: 'ON',
      options: {}
    }];

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

// TODO buscar una manera mas organizada de manejar, los objetos de las páginas routiadas.
  relojBuscado: any;
  private authState = null;

  constructor(public db: AngularFireDatabase, private firebaseAuth: AngularFireAuth, private router: Router) {

    // console.log('holi holi');
    this.firebaseAuth.authState.subscribe(value => {
      // console.log('probando auth');
      // console.log(value);
      this.authState = value;
    });
  }

  /*.
  TODO no REGRESAR any, buscar el objeto puntual
   */
  login(email: string, pass: string, result: (ho: any) => any) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(auth => {
          result(auth);
        }
      )
      .catch(err => {
        console.log(err);
        result(null);
      });
  }


  subirNuevoRegistroReloj(reloj: any): void {
    const key = this.db.list('relojes').push(reloj).key;
    this.db.object('seriales/' + reloj.serial).set(key);
    console.log('se intenta subir datos');
  }

  buscarReloj(serial: string, callback: (result: any) => any) {
    this.db.object('seriales/' + serial).valueChanges().subscribe(value => {
      console.log('SI EXISTE SERIAL');

      this.db.object('relojes/' + value).valueChanges().subscribe(datosReloj => {
        // significa que el serial si existe en la base, ahora se busca la info de ese puntualmente
        callback(datosReloj);
      });
    });
  }

  registro_worker(email: string, pass: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, pass)
      .then(value => {
        console.log('Success!');
        this.router.navigate(['login']);
      })
      .catch(err => {
        console.log('Something went wrong:');
      });
  }

  private pushAllNewUserInfo(user: any) {
    const itemRef = this.db.object('workers/' + user.uid);
    itemRef.set({
      email: 'testing too',
      nombres: 'tt',
      apellidos: 'tt',
      sexo: 'testing',
      cargo: 'Jefaso'
    });
    this.router.navigate(['/login']);
  }


  get authenticated(): boolean {
    return this.authState !== null;
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.authState = null;
  }
}
