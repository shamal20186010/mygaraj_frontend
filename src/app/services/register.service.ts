import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/register';

  constructor(private http: HttpClient) { }

  registerUser(user: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/addUser`, user, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // errorMessage = `Server returned code: ${error.status}, body was: ${JSON.stringify(error.error)}`;
      errorMessage = "Username is already taken"
    }
    return throwError(errorMessage);
  }
}
