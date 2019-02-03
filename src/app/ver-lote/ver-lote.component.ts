import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ver-lote',
  templateUrl: './ver-lote.component.html',
  styleUrls: ['./ver-lote.component.scss']
})
export class VerLoteComponent implements OnInit {
  @Input() _lote: any;

  constructor() {
  }

  ngOnInit() {
    // console.log(this.lote);
  }

  @Input() set lote(lote: any) {
    this._lote = lote;
  }
}
