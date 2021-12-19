import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from 'shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: Firestore) {}

  getCategories() {
    const collectionRefs = collection(this.firestore, 'categories');
    return collectionData(collectionRefs, {
      idField: 'categoryId',
    }) as Observable<Category[]>;
  }
}
