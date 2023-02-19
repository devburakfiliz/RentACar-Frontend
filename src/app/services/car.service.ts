import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/brandResponseModel';
import { CarResponseModel } from '../models/carResponseModel';
import { ColorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44392/api/Cars/getdetail';
  apiUrl2 = 'https://localhost:44392/api/Colors/getall';
  apiUrl3 = 'https://localhost:44392/api/Brands/getall';

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<CarResponseModel>{
    return this.httpClient.get<CarResponseModel>(this.apiUrl)
  }

}
