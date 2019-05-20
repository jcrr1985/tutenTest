import { Injectable } from '@angular/core';
import { avatarArray } from '../shared/avatars';

@Injectable({
  providedIn: 'root'
})
export class FetchImgService {

  constructor() { }

  getImages() {
    return avatarArray;
  }
}
