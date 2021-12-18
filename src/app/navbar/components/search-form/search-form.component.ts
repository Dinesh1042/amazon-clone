import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, of, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  formControlFocused = false;
  selectedCategory = 'All Categories';
  suggestionList: string[] = [];
  suggestionIndex = -1;
  suggestionListActive = false;

  private isKeyDown = false;
  private defaultCategory = 'All Categories';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.searchForm = this.fb.group({
      query: [null, [Validators.required]],
      category: [null],
    });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.route.queryParamMap.subscribe((param) => {
        const queries = {
          query: param.get('query') || '',
          category: param.get('category'),
        };
        this.selectedCategory = queries.category || this.defaultCategory;
        this.searchForm.setValue(queries);
      })
    );

    this.subscriptions.add(
      this.searchForm.valueChanges
        .pipe(
          map((v: SearchQuery) => (this.isKeyDown ? EMPTY : v.query)),
          debounceTime(350),
          distinctUntilChanged(),
          switchMap((query) =>
            typeof query === 'string'
              ? this.productService.searchSuggestion(query)
              : of(this.suggestionList)
          )
        )
        .subscribe((list) => (this.suggestionList = list))
    );

    document.addEventListener('click', (e: any) => {
      if (!e.target.closest('.form-group')) this.suggestionListActive = false;
    });

    document.addEventListener(
      'scroll',
      () => (this.suggestionListActive = false)
    );
  }

  onCategoryChange(control: HTMLSelectElement) {
    const value = control.value;
    this.selectedCategory = value ? value : this.defaultCategory;
  }

  onSearch() {
    if (this.searchForm.invalid) return;

    const searchQuery: SearchQuery = this.searchForm.value;

    if (!searchQuery.category || !searchQuery.category.trim())
      delete searchQuery.category;

    if (searchQuery.query && searchQuery.query.trim()) {
      this.router.navigate(['/products'], {
        queryParams: searchQuery,
      });
      this.suggestionListActive = false;
      this.suggestionIndex = -1;
    }
  }

  suggestionKeyDown(event: KeyboardEvent) {
    this.suggestionListActive = true;
    if (event.key.match(/[a-z0-9]/gi)) this.isKeyDown = false;

    if (event.code === 'ArrowDown') {
      this.suggestionIndex = this.nextSuggestionIndex;
      this.updateSuggestionQueryValue();
    }
    if (event.code === 'ArrowUp') {
      this.suggestionIndex = this.prevSuggestionIndex;
      this.updateSuggestionQueryValue();
    }
  }

  // Form Getters

  get searchQuery() {
    return this.searchForm.get('query');
  }

  get category() {
    return this.searchForm.get('category');
  }

  private updateSuggestionQueryValue() {
    this.isKeyDown = true;
    this.searchQuery?.setValue(this.suggestionList[this.suggestionIndex]);
  }

  private get nextSuggestionIndex() {
    return this.suggestionIndex >= this.suggestionList.length - 1
      ? 0
      : this.suggestionIndex + 1;
  }

  private get prevSuggestionIndex() {
    return this.suggestionIndex <= 0
      ? this.suggestionList.length - 1
      : this.suggestionIndex - 1;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

interface SearchQuery {
  query: string;
  category?: string;
}
