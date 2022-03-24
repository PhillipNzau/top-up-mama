import {BehaviorSubject, Observable, of} from 'rxjs';
import {delay, switchMap} from 'rxjs/operators';

export class LoadingHandler {
  private IsLoading$ = new BehaviorSubject(false);

  isLoading$: Observable<boolean> = this.IsLoading$.pipe(
    switchMap(isLoading => {
      if (!isLoading) {
        return of(false);
      }
      return of(true).pipe(delay(5));
    })
  );

  start(): any {
    this.IsLoading$.next(true);
  }

  finish(): any {
    this.IsLoading$.next(false);
  }
}
