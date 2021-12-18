import { Component } from '@angular/core';

@Component({
  selector: 'popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.scss'],
})
export class PopularCategoriesComponent {
  categories = [
    {
      name: 'computerAndAccessories',
      icon: 'laptop',
      query: 'computer',
    },
    {
      name: 'phone',
      icon: 'phone',
      query: 'phone',
    },
    {
      name: 'book',
      icon: 'book',
      query: 'books',
    },
    {
      name: 'gift',
      icon: 'gift',
      query: 'gifts',
    },
    {
      name: 'house',
      icon: 'house',
      query: 'house',
    },
  ];

  constructor() {}
}
