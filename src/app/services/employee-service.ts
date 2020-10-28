import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders(environment.headers);
  }

  httpHeaders: HttpHeaders;
  apiUrl: string = environment.apiUrl;

  formExternalList: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    idBoss: new FormControl('', [Validators.required])
  });

  setForm(obj: Employee) {
    const form: any = {
      id: obj.id, name: obj.name, lastname: obj.lastname
      , phone: obj.phone, email: obj.email, idBoss: obj.idBoss
    };
    this.formExternalList.setValue(form);
  }

  iniForm() {
    this.formExternalList.setValue({
      id: '',
      name: '',
      lastname: '',
      phone: '',
      email: '',
      idBoss: ''
    });
  }

  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.apiUrl}/employee/getAll`, { headers: this.httpHeaders });
  }

  create(emp: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.apiUrl}/employee/save`, emp, { headers: this.httpHeaders });
  }

  update(emp: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.apiUrl}/employee/update`, emp, { headers: this.httpHeaders });
  }

  delete(emp: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.apiUrl}/employee/delete`, emp, { headers: this.httpHeaders });
  }

}
