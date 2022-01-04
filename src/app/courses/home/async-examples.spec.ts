import { fakeAsync, flush, tick, flushMicrotasks } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe("Async Testing Examples", () => {

  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {

    let test = false;
    setTimeout(() => {

      console.log('running assertions');

      test = true;

      expect(test).toBe(true);

      done();
    }, 1000);
  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => {

      console.log('running assertions');

      test = true;

    }, 1000);

    flush();

    expect(test).toBeTruthy(true);

  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {

    let test = false;

    console.log('Creating promise');

    Promise.resolve().then(() => {
        
        console.log('Promise evaluated successfully');
  
        test = true;
  
    });

    flushMicrotasks();

    console.log('Running test assertions');

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example - plain Promises + setTimeout', fakeAsync(() => {

    let counter = 0;

    Promise.resolve().then(() => {
        
      counter+=10;
      
      setTimeout(() => {

        counter+=1;

      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);
    
    tick(500);

    expect(counter).toBe(11);

  }));

  it('Asynchronous test example - observable', fakeAsync(() => {

    let test = false;

    console.log('Creating observable');

    const test$ = of(true).pipe(delay(1000));

    test$.subscribe(() => {

      test = true;

    });

    tick(1000);

    expect(test).toBeTruthy();

  }));

});