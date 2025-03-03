import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  foods:Food[] = []
  constructor(private service : FoodService , activatedRoute:ActivatedRoute){
    let foodsObservable:Observable <Food[]>
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm)
        foodsObservable = this.service.getAllBySearch(params.searchTerm)
      else if(params.tag)
        foodsObservable = this.service.getAllFoodsByTags(params.tag);
      else
      foodsObservable = this.service.getAll();


      foodsObservable.subscribe((serverFoods)=>{
        this.foods = serverFoods
      })
    })
  }


  ngOnInit(): void {

  }

}
