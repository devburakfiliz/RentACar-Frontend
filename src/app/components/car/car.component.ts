import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars : Car[]=[];
  imageUrl = "https://localhost:44392/uploads/images/"
  carImages: CarImage[];

  dataLoaded = false ;
  currentCar:Car
  filterText ="";

  constructor(
    private carService : CarService,
    private activatedRouted:ActivatedRoute,
    private carImageService:CarImageService){}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"] ){
        this.getCarByColor(params["colorId"])
      }
      else{
        this.getCars();
      }
    });
  }

  getCars(){
    this.carService.getCars(). subscribe((response)=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarByColor(colorId:number){
    this.carService.getCarByColor(colorId)
    .subscribe((response)=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarImage(car:Car){
    if (car.imagePath == null) {
      let path = this.imageUrl + "a4f5208e-22e4-4fe2-8426-e61807a07393.jpg"
      return path;

    }
    else{
      let path = this.imageUrl + car.imagePath;
      return path;
    }
  }
 

  

}
