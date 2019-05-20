import { Injectable } from '@angular/core';
import { dataArray } from '../shared/personal';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor() { }

    getDataArray() {
    return dataArray;
  }
}
