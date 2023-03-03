import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { RentalResponseModel } from '../models/rentalResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
apiUrl = 'https://localhost:44392/api/Renals';
  constructor(private httpClient : HttpClient) { }

  getRentals():Observable<RentalResponseModel>{ 
    let newUrl=this.apiUrl+ "/getrental"
    return this.httpClient.get<RentalResponseModel>(newUrl)
  }
  


  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/rulesforadding",rental)
  }
}
