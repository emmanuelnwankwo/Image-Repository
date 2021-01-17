import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiRoutes } from '../shared/constant';
import { DataService } from '../shared/services/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  imageList: any;
  constructor(private _router: Router, private _http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.getPublicImages();
  }

  getPublicImages() {
    const url = apiRoutes.allPublicImages;
    const token = this.dataService.getToken();
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-control-allow-credentials': 'true',
      'access-control-allow-origin': '*',
      'Authorization': 'Bearer ' + token
    });
    const options = { headers: headers };
    this._http.get<any>(url, options).subscribe(
      response => {
        console.log('response', response);
        this._router.navigate(['/dashboard']);
        this.imageList = response.data;
      },
      error => {
        console.error(error);
        if (error.status === 401) {
          this._router.navigate(['/login']);
        }
        this.errorMessage = error.error.error;
      }
    );
  }
}
