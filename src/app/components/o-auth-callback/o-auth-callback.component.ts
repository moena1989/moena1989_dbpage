import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-o-auth-callback',
  templateUrl: './o-auth-callback.component.html',
  styleUrls: ['./o-auth-callback.component.scss']
})
export class OAuthCallbackComponent implements OnInit {
  private code: any;
  private location: any;
  private server: any;
  peivate;
  infoToken: { access_token: string, expires_in_sec: number, token_type: string, expires_in: number };

  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(value => {
      this.code = value.code;
      this.location = value.location;
      this.server = value.server;
      console.log(this.code);
      // return this.http.post<Cat>('http://localhost:8000/api/cats/', cat);
      this.http.get('http://localhost:4200/api?code=' + this.code).subscribe((tokenData: any) => {
        this.infoToken = {
          access_token: tokenData.access_token,
          expires_in: tokenData.expires_in,
          expires_in_sec: tokenData.expires_in_sec,
          token_type: tokenData.token_type
        };
        /////
        console.log('se tiene el token de acceso ;)');
        console.log(this.infoToken);


        this.http.post('', '', {}).subscribe(value1 => {
        });
      });
    });
  }
}
