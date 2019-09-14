import {Component, OnInit} from '@angular/core';
import {ToolsServices} from '../../services/tools-services.service';
import {AuthService} from '../../services/routes/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-worker-reg',
  templateUrl: './worker-reg.component.html',
  styleUrls: ['./worker-reg.component.css']
})
export class WorkerRegComponent implements OnInit {

  constructor(private db: AuthService, private tools: ToolsServices, private router: Router) {
  }

  ngOnInit() {
  }

  registrarDevUser(mail: string, pass: string) {
    this.db.createDevUser(mail, pass).then(value => {
      this.router.navigateByUrl('/login');
    });
  }
}


