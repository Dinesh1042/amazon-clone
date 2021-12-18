import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface EditComponentDeactivate {
  canDeactivate: () => Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EditComponentDeactivateGuard
  implements CanDeactivate<EditComponentDeactivate>
{
  canDeactivate(
    component: EditComponentDeactivate
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate();
  }
}
