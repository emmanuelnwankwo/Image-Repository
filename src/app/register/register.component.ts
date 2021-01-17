import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiRoutes } from '../shared/constant';
import { DataService } from '../shared/services/shared-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public submitted: boolean = false;
  public registrationForm: FormGroup;
  public errorMessage: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _http: HttpClient,
    private dataService: DataService) { }

  ngOnInit() {
    this.registrationForm = this._fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  validateUserData(): any {
    this.submitted = true;
    if (this.registrationForm.valid) {
      let { email, password, username } = this.registrationForm.value;
      return this.signup(email, username, password);
    }
    this.submitted = false;
    return this.errorMessage = 'Email and Password required';
  }

  private signup(email: string, username: string, password: string) {
    const url = apiRoutes.signup;
    const body = new HttpParams({
      fromObject: {
        email: email,
        username: username,
        password: password
      }
    });
    const headers: any = new Headers({
      'Content-Type': 'application/json',
      'access-control-allow-credentials': 'true',
      'access-control-allow-origin': '*'
    });

    const options = { headers: headers };
    this._http.post<any>(url, body, options).subscribe(
      response => {
        console.log('response', response);
        this.dataService.persistToken(response.data.access_token)
        localStorage.setItem('username', response.data.username);
        this.submitted = true;
        this._router.navigate(['/dashboard']);
      },
      error => {
        console.error(error);
        this.submitted = false;
        this.errorMessage = error.error.message;
      }
    );
  }
}
