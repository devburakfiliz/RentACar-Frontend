import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44392/api/';


  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getdetail"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarByColor(colorId:number){
    let newPath = this.apiUrl+"Cars/getbycolorid/?id="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
 

  
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getbybrandid/?id="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "car/getcardetailsbyid?id=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
