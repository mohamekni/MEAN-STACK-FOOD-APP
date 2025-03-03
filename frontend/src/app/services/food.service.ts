import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_data , sample_tags } from 'src/data';
import { filter, Observable } from 'rxjs';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable <Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }
  getAllBySearch(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchTerm)
  }




getAllTags():Observable<Tag[]>{
  return this.http.get<Tag[]>(FOODS_TAGS_URL)
}


getAllFoodsByTags(tag:string):Observable<Food[]>{
  return tag =="All"?
  this.getAll():
  this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
}

  getAllById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL+foodId)
  }

}
