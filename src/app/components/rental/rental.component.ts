import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit{
  rentals : Rental []=[];
  dataLoaded = false ;

  constructor(private rentalService : RentalService,
    private cartService:CartService,
    private toastrService:ToastrService
   ){}

  ngOnInit(): void {
    this.getRentals();
    
  }

  getRentals(){
    this.rentalService.getRentals().subscribe((response)=>{
      this.rentals=response.data
      this.dataLoaded = true;
    })
  }
  
  

}
