import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { PayComponent } from './components/pay/pay.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';

const routes: Routes = [
  {path:"", pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/car/:carId",component:CardetailComponent},
  {path:"rentals/add",component:RentalAddComponent},
  {path:"payment/pay",component:PayComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"cars/update",component:CarUpdateComponent}
  
  
  
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
