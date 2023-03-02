import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44392/api/Payments/getall';

  constructor(private httpClient:HttpClient) { }

  getPayments():Observable<ListResponseModel<Payment>>{
    return this.httpClient.get<ListResponseModel<Payment>>(this.apiUrl)
  }
}
