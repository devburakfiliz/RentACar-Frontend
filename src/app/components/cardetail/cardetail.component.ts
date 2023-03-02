import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit{
  carsdetail:Car[]=[];
   imageUrl = "https://localhost:44392/uploads/images/"
   carImages:CarImage[] = [];
   currentCar:Car
   currentImage: CarImage;
   dataLoaded = false ;
   

  
   constructor(private carService: CarService,
    private activatedToute:ActivatedRoute,
    private carImageService:CarImageService,
    private cartService:CartService,
    private toastrService:ToastrService,
   ){}

    ngOnInit(): void {
      this.activatedToute.params.subscribe(params => {
        this.getCarById(params["carId"])
        this.getImageByCarId(params["carId"])
      })
    }
    getImageByCarId(carId:number){
      this.carImageService.getByCarId(carId).subscribe(response => {
        this.carImages = response.data;
        this.dataLoaded=true;

      })
    }

    getImagePath(carImage: CarImage) {
      let path = this.imageUrl + carImage.imagePath;
      return path;
    }

   
    getCarById(id:number) {
      this.carService.getCarById(id).subscribe(response => {
      this.carsdetail = response.data;
      this.dataLoaded = true;
      })
    
    } 
  
 

  

  addToCart(car:Car){ 
    this.toastrService.success("Sepete eklendi",car.modelName)
    this.cartService.addToCart(car);


  }

  
}
