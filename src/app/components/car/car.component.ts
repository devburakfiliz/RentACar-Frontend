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
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars : Car[]=[];
  brands: Brand[]=[];
  colors : Color[]=[];

  imageUrl = "https://localhost:44392/uploads/images/"
  carImages: CarImage[];

  dataLoaded = false ;
  currentCar:Car | null;
  filterText ="";
  brandFilter: number = 0;
  colorFilter: number = 0;


  constructor(
    private carService : CarService,
    private activatedRouted:ActivatedRoute,
    private carImageService:CarImageService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private cartService:CartService){}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"] ){
        this.getCarByColor(params["colorId"])
      }
      else if (params["carId"]) {
        this.getCarById(params["carId"])
      }
      else{
        this.getCars();
        this.getBrands();
        this.getColors();
      }
    });
  }

  getCars(){
    this.carService.getCars(). subscribe((response)=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
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
  setCurrentCar(car:Car){
    this.currentCar=car;
  }
  
  getCarById(carId:number){
    this.carService.getCarsByBrand(carId).subscribe(response => {
      this.cars = response.data;
      
    })
  }
  getCarsByColorAndBrand(brandId:number, colorId:number){
    this.carService.getCarsByColorAndBrand(brandId, colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  
  reset(){
    this.currentCar = null;

  }

  addToCart(car:Car){ 
    this.toastrService.success("Sepete eklendi",car.modelName)
    this.cartService.addToCart(car);
  }
  

  


  

}
