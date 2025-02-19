import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_data } from 'src/data';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
    return sample_data
  }
  getAllBySearch(searchTerm:string){
    return this.getAll().filter(food=>food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
}
