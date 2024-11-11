import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashbordComponent } from '../page/dashbord/dashbord.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  currentSearchQuery = this.searchQuerySubject.asObservable();

  constructor() { }

  updateSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

}
