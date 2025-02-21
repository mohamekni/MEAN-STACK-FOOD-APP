import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_data , sample_tags } from 'src/data';
import { filter } from 'rxjs';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return sample_data
  }
  getAllBySearch(searchTerm:string){
    return this.getAll()
    .filter(food=>food.name.toLowerCase()
    .includes(searchTerm.toLowerCase()))
  }

getAllTags():Tag[]{
  return sample_tags
}


getAllFoodsByTags(tag:string):Food[]{
  return tag =="All"?
  this.getAll():
  this.getAll().filter(food => food.tags?.includes(tag))
}

  getAllById(foodId:string):Food{
    return this.getAll().find(food=>food.id) ?? new Food()
  }

}
