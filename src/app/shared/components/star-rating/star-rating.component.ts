import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input('rating') rating = 0;
  @Input('fontSize') fontSize = 1.5;

  constructor() {}

  ngOnInit(): void {}

  get starArr() {
    const arr: string[] = Array.from({ length: 5 }).map((v, i) =>
      i <= this.rating - 1 ? 'star-fill' : 'star'
    );

    const floorRating = Math.floor(this.rating);

    if (this.rating !== null && this.rating !== floorRating && floorRating < 5)
      arr[floorRating] = 'star-half';

    return arr;
  }
}
