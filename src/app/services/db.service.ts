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

  modeloFile: any[] = [];

// Done
  maderas: any[] = [
    {salt: 'GD', id: '', name: 'Granadillo'},
    {salt: 'NR', id: '', name: 'Nazareno'},
    {salt: 'PM', id: '', name: 'Palo de Mora'},
    {salt: 'PS', id: '', name: 'Palo de Sangre'},
    {salt: 'NG', id: '', name: 'Nogal'},
    {salt: 'CD', id: '', name: 'Cedro'},
    {salt: 'AP', id: '', name: 'Achapo'},
    {salt: 'EB', id: '', name: 'Ébano'},
    {salt: 'FM', id: '', name: 'Flor Morado'},
    {salt: 'TK', id: '', name: 'Teca'},
    {salt: 'CM', id: '', name: 'Canelo Moena'},
    {salt: 'ZP', id: '', name: 'Zapan'},
    {salt: 'AM', id: '', name: 'Amargo'},
    {salt: 'CM', id: '', name: 'Comino Crespo'},
    {salt: 'PN', id: '', name: 'Pino'},
    {salt: 'AC', id: '', name: 'Abarco'},
    {salt: 'AR', id: '', name: 'algarrobo'},
    {salt: 'CM', id: '', name: 'Cumaru'}
  ];
  organicos: any[] = [
    {salt: 'MD', id: 0, name: 'Madera'},
    {salt: 'TG', id: 1, name: 'Tagua'},
    {salt: 'MA', id: 2, name: 'Mármol'}
  ];
  metales: any[] = [
    {salt: 'AC', id: 0, name: 'Acero'},
    {salt: 'AL', id: 1, name: 'Aluminio'},
    {salt: 'CR', id: 2, name: 'Cromo'},
    {salt: 'NQ', id: 3, name: 'Níquel'},
    {salt: 'TT', id: 4, name: 'Titanio'},
    {salt: 'PL', id: 5, name: 'Platino'},
    {salt: 'AL', id: 6, name: 'Alpaca'}
  ];
  preciosos: any[] = [
    {salt: 'OR', id: 0, name: 'Oro'},
    {salt: 'PL', id: 1, name: 'Plata'},
    {salt: 'EM', id: 2, name: 'Esmeraldas'}
  ];
  plasticos: any[] = [
    {salt: 'RS', id: 0, name: 'Resina '},
    {salt: 'CB', id: 1, name: 'Carbono'},
    {salt: 'FV', id: 2, name: 'Fibra de vidrio'}
  ];
  maquinarias: any[] = [
    {salt: 'MY', id: 0, name: 'Miyota'},
    {salt: 'SG', id: 1, name: 'Seagull'},
    {salt: 'ET', id: 2, name: 'ETA'}
  ];
  color_maquinaria: any[] = [
    {salt: 'OR', id: 1, name: 'Oro'},
    {salt: 'PT', id: 2, name: 'Plata'}
  ];
  material_pulso: any[] = [
    {salt: 'AI', id: 0, name: 'Acero inoxidable'},
    {salt: 'CR', id: 1, name: 'Cuero'},
    {salt: 'TL', id: 2, name: 'Tela'}
  ];
  color_pulsos: any[] = [
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
    {salt: 'BG', id: 16, name: 'Beige'}
  ];
  modelos: any[] = [
    {salt: 'OG', id: 0, name: 'Origen'},
    {salt: 'SL', id: 1, name: 'Slim'},
    {salt: 'VR', id: 2, name: 'Vira Aros'},
    {salt: 'IT', id: 3, name: 'Inti'},
    {salt: 'AR', id: 4, name: 'Aros'},
    {salt: 'ON', id: 5, name: 'One'}];
  colecciones: any[] = [
    {salt: 'LX', id: 0, name: 'Luxury'},
    {salt: 'HW', id: 1, name: 'Hawaii'},
    {salt: 'AP', id: 2, name: 'Animal Print'},
    {salt: 'FT', id: 3, name: 'Frutas'},
    {salt: 'TL', id: 4, name: 'Telas'},
    {salt: 'VT', id: 5, name: 'Vintage'},
    {salt: 'EE', id: 6, name: 'Ed. Especial'}];
  ///////////////////////////////////////////
  manos: any[] = [{name: 'FCM', salt: 'FCM'}];
  lotes: any[] = [{name: '1', salt: '1'}];


  // TODO buscar una manera mas organizada de manejar, los objetos de las páginas routiadas.
  relojBuscado: any;

  authState = null;
  userLogueado: any;

  constructor(public db: AngularFireDatabase, private firebaseAuth: AngularFireAuth, private router: Router) {

    this.firebaseAuth.authState.subscribe(value => {
      console.log('Comprobando auth fiirebase...');

      // const ob = localStorage.getItem('ob_login');
      //
      // if (ob != null) {
      //   console.log('Se encontró el ob_log y se cargo :D');
      //   this.authState = ob;
      // } else {
      //   console.log('no existe save guardado');
      // }
      this.authState = value;
    });
  }

  /*.
  TODO no REGRESAR any, buscar el objeto puntual
   */
  login(email: string, pass: string, result: (ho: any) => any) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(auth => {
          console.log('hooooooooo');
          console.log(auth.user.uid);
          this.traerDatosUsuario(auth.user.uid, value => {
            result(auth.user.uid);
          });
        }
      )
      .catch(err => {
        console.log(err);
        result(null);
      });
  }


  traerDatosUsuario(uid: string, ff: (d: boolean) => void) {
    console.log(uid);
    this.db.object('workers/' + uid).valueChanges().subscribe(value => {
      this.userLogueado = value;
      console.log('se trae la info del usuario');
      console.log(this.userLogueado);
      ff(true);
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

  registro_worker(usr: any, pass: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(usr.mail, pass)
      .then(value => {
        console.log('Registro exitoso');
        console.log(value);
        this.pushAllNewUserInfo(usr, value.user.uid);
        this.router.navigate(['login']);
      })
      .catch(err => {
        console.log('Something went wrong:');
      });
  }

  private pushAllNewUserInfo(user: any, uid: string) {
    const itemRef = this.db.object('workers/' + uid);
    itemRef.set({
      mail: 'testing too',
      nombres: 'tt',
      apellidos: 'tt',
      sexo: 'testing',
      cargo: 'Jefaso'
    });
    this.router.navigate(['/login']);
  }

  get authenticated(): boolean {
    return (this.authState !== null);
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.authState = null;
  }
}
