import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = 'https://localhost:44392/api/auth/';
  constructor(private httpClient:HttpClient) { }

  register(register:Register){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"register",register)
  }
}