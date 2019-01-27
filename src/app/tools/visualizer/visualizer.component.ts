import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message = 'Seleccionar Imagen';

  @Output() alSeleccionar: EventEmitter<any> = new EventEmitter();
  @Input() ttl = 'titulin';

  onChange(files) {
    if (files.length === 0) {
      return;
    }
    console.log(files[0]);
    this.comprimir(files[0]);
  }

  constructor(private ng2ImgMax: Ng2ImgMaxService, public sanitizer: DomSanitizer) {

  }

  comprimir(file) {
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.message = 'Cambiar Imagen';
    this.imagePath = file;
    this.message = 'Escalando...';

    this.ng2ImgMax.resizeImage(file, 10000, 2500).subscribe(
      result => {
        console.log('probando resize');
        this.message = 'Comprimiendo...';
        this.ng2ImgMax.compressImage(result, 0.700).subscribe(
          _result => {
            console.log('probando compress');
            this.getImagePreview(new File([_result], _result.name));
            this.alSeleccionar.emit(new File([_result], _result.name));
            this.message = 'Seleccionar otra imagen';
          },
          error => {
            this.message = 'un error :/';

            console.log('😢 Oh no!', error);
          }
        );
      },
      error => {
        console.log('😢 Oh no! error al comprimir', error);
      }
    );
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log('construyendo url...');
      this.imgURL = this.sanitizer.bypassSecurityTrustUrl(reader.result.toString());
    };
  }

  ngOnInit(): void {

  }
}
