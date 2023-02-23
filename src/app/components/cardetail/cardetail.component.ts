import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit{
  carsdetail:Car[]=[];
   imageUrl = "https://localhost:44392/uploads/images/"
   carImages:CarImage[];
   currentCar:Car
  
   constructor(private carService: CarService,
    private activatedToute:ActivatedRoute,
    private carImageService:CarImageService){}

    ngOnInit(): void {
      this.activatedToute.params.subscribe(params=>{
        if (params["carId"]) {
          this.getCarById(params["carId"])
        }
        else{
          this.getCars();
        }
      });
    }
    getCars(){
      this.carService.getCars(). subscribe((response)=>{
        this.carsdetail=response.data
        
      })
    }
    getCarById(carId:number){
      this.carService.getCarsByBrand(carId).subscribe(response => {
        this.carsdetail = response.data;
        
      })
    }
}
