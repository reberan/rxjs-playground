import {
  catchError, concatMap,
  debounceTime, EMPTY,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  Observable,
  of,
  tap,
  timer
} from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";



// 9. Observable, Subscription, Observer - Key Elements
// const someObservable$ = new Observable<string>((subscriber) => {
//   console.log("someObservable executed -> subscriber: ", subscriber);
//   subscriber.next("Alice");
//   subscriber.next("Ben");
//   subscriber.next("Charlie");
//   subscriber.complete();
// });
//
// someObservable$.subscribe((value) => console.log(value));


// 10. Warm-up Observables, Subscriptions, Observer - Key Elements
// const warmUCharsObservable$ = new Observable<string>((subscriber) => {
//   console.log("warmUCharsObservable executed -> subscriber: ", subscriber);
//   subscriber.next("a");
//   subscriber.next("b");
//   subscriber.next("c");
//   subscriber.next("d");
//   subscriber.complete();
// });
//
// const warmUpNumbersObservable$ = new Observable<Number>((subscriber) => {
//   console.log("warmUpNumbersObservable executed -> subscriber: ", subscriber);
//   [1, 2, 3, 4, 5, 6].forEach((value: Number) => subscriber.next(value));
//   subscriber.complete();
// });
//
const warmUpObserver = {
  next: (value: string | number) =>
    console.log("warmUpObserver.next value -> ", value),
  complete: () =>
    console.log("warmUpObserver.completed"),
  error: (error: any) =>
      console.log("warmupObserver.error -> ", error)
};
// const anotherObserver = {
//   next: (value: string | Number) =>
//     console.log("anotherObserver.next value -> ", value),
// };
//
// warmUCharsObservable$.subscribe(warmUpObserver);
// warmUpNumbersObservable$.subscribe(warmUpObserver);
//
// const anotherObservable$ = new Observable<string>((subscriber) => {
//   subscriber.next("anotherObservable - Alice");
//   setTimeout(() => subscriber.next("anotherObservable - Ben"), 2000);
//   setTimeout(() => subscriber.next("anotherObservable - Charlie"), 4000);
// });
//
// const anotherSubscription = anotherObservable$.subscribe(warmUpObserver);
// setTimeout(() => {
//   console.log("Unsubscribe anotherSubscription");
//   anotherSubscription.unsubscribe();
// }, 3000);


// 11. Warm-up Observable - Multiple Subscriptions
// console.log("Subscription 1 started");
// anotherObservable$.subscribe(warmUpObserver);
//
// setTimeout(() => {
//   console.log("Subscription 2 started");
//   anotherObservable$.subscribe(anotherObserver);
// }, 1000);


// 17. Marbles - Game
// console.log("-0-1-2-3-4-5----> time");
// const marbleObservable1$ = new Observable<number>((subscriber) => {
//   [0, 1, 2, 3, 4, 5].forEach((value) =>
//     setTimeout(() => subscriber.next(value), 1000)
//   );
// });
//
// const marbleSubscriber = {
//   next: (value: number | string) =>
//     console.log("marbleSubscriber.next value -> ", value),
//   error: (errorMessage: string) =>
//     console.error("marbleSubscriber.error -> ", errorMessage),
//   complete: () => console.log("marbleSubscriber completed"),
// };
// const marbleSubscription1 = marbleObservable1$.subscribe(marbleSubscriber);
//
// console.log("-AB-CDE-FGH----> time");
// const marbleObservable2$ = new Observable<string>((subscriber) => {
//   subscriber.next("marbleObservable2 - A");
//   subscriber.next("marbleObservable2 - B");
//   setTimeout(() => {
//     subscriber.next("marbleObservable2 - C");
//     subscriber.next("marbleObservable2 - D");
//     subscriber.next("marbleObservable2 - E");
//   }, 1000);
//   setTimeout(() => {
//     subscriber.next("marbleObservable2 - F");
//     subscriber.next("marbleObservable2 - G");
//     subscriber.next("marbleObservable2 - H");
//   }, 1000);
// });
// const marbleSubscription2 = marbleObservable2$.subscribe(marbleSubscriber);
//
// console.log("-----A|----> time");
// const marbleObservable3$ = new Observable<string>((subscriber) => {
//   setTimeout(() => {
//     subscriber.next("marbleObservable3 - A");
//     subscriber.complete();
//   }, 5000);
// });
// const marbleSubscription3 = marbleObservable3$.subscribe(marbleSubscriber);
//
// console.log("-----X----> time");
// const marbleObservable4$ = new Observable<string>((subscriber) => {
//   setTimeout(() => {
//     subscriber.error("marbleObservable4 error!!");
//   }, 5000);
// });
// const marbleSubscription4 = marbleObservable4$.subscribe(marbleSubscriber);


// 23. Synchronous Emission - Next Notification
// const synchObservable$ = new Observable<string>(subscriber => {
//   console.log("synchObservable executed");
//   subscriber.next("Alice");
// });
//
// console.log("Before subscribe");
// const synchSubscription = synchObservable$.subscribe(warmUpObserver);
// console.log("After subscribe");


// 24. Asynchronous Emission - More Next Notification
// const asynchObservable$ = new Observable<string>(subscriber => {
//   console.log("asynchObservable executed");
//   subscriber.next("Alice");
//   subscriber.next("Ben");
//   setTimeout(()=> subscriber.next("Charlie"), 2000);
// });
//
// console.log("Before subscribe");
// const asynchSubscription = synchObservable$.subscribe(warmUpObserver);
// console.log("After subscribe");


// 25. Teardown - Complete Notification
// const teardownObservable$ = new Observable<string>(subscriber => {
//   console.log("teardownObservable$ executed");
//   subscriber.next("Alice");
//   subscriber.next("Ben");
//   setTimeout(()=> {
//     subscriber.next("Charlie")
//     subscriber.complete();
//   }, 2000);
//   return () => {
//     console.log("teardownObservable$ teardown")
//   }
// });
//
// console.log("Before subscribe");
// const teardownSubscription = teardownObservable$.subscribe(warmUpObserver);
// console.log("After subscribe");


// 26. Error Notification
// const errorObservable$ = new Observable<string>(subscriber => {
//   console.log("errorObservable$ executed");
//   subscriber.next("Alice");
//   subscriber.next("Ben");
//   setTimeout(()=> {
//     subscriber.next("Charlie")
//   }, 2000);
//   setTimeout(()=> {
//     subscriber.error("Error!!!")
//   }, 2000);
//   return () => {
//     console.log("errorObservable$ teardown")
//   }
// });
//
// console.log("Before subscribe");
// const errorSubscription = errorObservable$.subscribe(warmUpObserver);
// console.log("After subscribe");


// 29. Cancellation - Unsubscribe
// const interval$ = new Observable<number>(subscriber => {
//   let counter = 1;
//   const intervalId = setInterval(()=> {
//     console.log("interval$ emitted counter -> ", counter);
//     subscriber.next(counter++);
//   }, 2000);
//   return () => {
//     clearInterval(intervalId);
//   }
// })
//
// const intervalSubscription = interval$.subscribe(warmUpObserver);
// setTimeout(() => {
//   intervalSubscription.unsubscribe();
// }, 7000);


// 32. Cold Observables
// const url: string = 'https://randomuser.me/api';
// const ajax$ = ajax(url);
// [1,2,3,4,5].forEach((index:number) => {
//   ajax$.subscribe((data: any) => console.log(`Subscription ${index}`, data.response?.results[0]?.email));
// });


// 33. Hot Observables
// const helloButton = document.querySelector('button#hello');
// const helloClick$ = new Observable<MouseEvent>(subscriber => {
//   helloButton.addEventListener('click', event => {
//     // @ts-ignore
//     subscriber.next(event);
//   });
// });
//
// const helloSubscription1 = helloClick$.subscribe(
//     event => console.log("Sub 1 :", event.type, event.x, event.y)
// );
// const helloSubscription2 = helloClick$.subscribe(
//     event => console.log("Sub 2 :", event.type, event.x, event.y)
// );
// setTimeout(()=> {
//   console.log('Subscription 3 starts');
//   const helloSubscription3 = helloClick$.subscribe(
//       event => console.log("Sub 3 :", event.type, event.x, event.y)
//   );
// },5000);


// 37. of - How Creation Functions work
// of('Alice', 'Ben', 'Charlie').subscribe(warmUpObserver);
//
// const names$ = new Observable<string>(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });
// names$.subscribe(warmUpObserver);
//
// const ourOwnOf: Function = (...args: string[]): Observable<string> => {
//   return new Observable<string>(subscriber => {
//     args.forEach(arg => {
//       subscriber.next(arg);
//     });
//     subscriber.complete();
//   })
// };
// ourOwnOf('Alice','Ben', 'Charlie').subscribe(warmUpObserver);


// 38. from
// const fromSubscription = from(['Alice', 'Ben', 'Charlie']).subscribe(warmUpObserver);
//
// const somePromise = new Promise((resolve, reject) =>{
//   resolve('Resolved');
// });
// const observableFromPromise$ = from(somePromise);
// observableFromPromise$.subscribe(warmUpObserver);
//
// const somePromiseRejected = new Promise((resolve, reject) =>{
//   reject('Rejected');
// });
// const observableFromPromiseRejected$ = from(somePromiseRejected);
// observableFromPromiseRejected$.subscribe(warmUpObserver);


// 39. fromEvent
// const triggerButton = document.querySelector('button#trigger');
// const fromEventSubscription = fromEvent<MouseEvent>(triggerButton, 'click').subscribe(event =>{
//   console.log(event.type, event.x, event.y);
// });
//
// setTimeout(()=> {
//   console.log('Unsubscribe fromEventSubscription');
//   fromEventSubscription.unsubscribe();
// },5000);
//
// const triggerClick$ = new Observable<MouseEvent>(subscriber => {
//   const clickHandler: Function = (evt: MouseEvent) => {
//     subscriber.next(evt);
//   };
//   // @ts-ignore
//   triggerButton.addEventListener('click', clickHandler);
//
//   return () => {
//     // @ts-ignore
//     triggerButton.removeEventListener('click',clickHandler);
//   }
// });
// const triggerClickSubscription = triggerClick$.subscribe(event =>{
//   console.log(event.type, event.x, event.y);
// });
// setTimeout(()=>{
//   console.log('Unsubscribe triggerClickSubscription');
//   triggerClickSubscription.unsubscribe();
// },5000);


// 40. timer
// console.log('App started');
// const timerObservable$ = new Observable<number>(subscriber => {
//   const timeoutId = setTimeout(()=> {
//     console.log("Timeout!")
//     subscriber.next(0);
//     subscriber.complete();
//   }, 2000);
//
//   return () => {
//     clearTimeout(timeoutId);
//   }
// });
//
// const timerSubscription = timer(2000).subscribe(warmUpObserver);
// setTimeout(()=>{
//   timerSubscription.unsubscribe();
//   console.log('Unsubscribe');
// }, 1000);
//
// const timerObservableSubscription = timerObservable$.subscribe(warmUpObserver);
// setTimeout( () => {
//   timerObservableSubscription.unsubscribe();
//   console.log('Unsubscribe');
// }, 1000);


// 41. interval
// console.log('App started');
// const intervalObservable$ = new Observable<number>(subscriber => {
//   let counter = 0;
//   const intervalId = setInterval(() => {
//     subscriber.next(counter++);
//   }, 1000);
//
//   return () => {
//     clearInterval(intervalId);
//   }
// });
//
// const intervalSubscription = interval(1000).subscribe(warmUpObserver);
// setTimeout( () => {
//   intervalSubscription.unsubscribe();
//   console.log('Unsubscribe');
// }, 10000);
//
// const intervalObservableSubscription = intervalObservable$.subscribe(warmUpObserver);
// setTimeout(() => {
//   intervalObservableSubscription.unsubscribe();
//   console.log('Unsubscribe');
// }, 10000);


// 42. forkJoin
// const url: string = 'https://randomuser.me/api';
// const ajaxName$: Observable<AjaxResponse<any>> = ajax(url);
// const ajaxCity$: Observable<AjaxResponse<any>> = ajax(url);
// const ajaxEmail$: Observable<AjaxResponse<any>> = ajax(url);
// // ajaxName$.subscribe((data: any) => console.log(data.response?.results[0]?.name?.first));
// // ajaxCity$.subscribe((data: any) => console.log(data.response.results[0]?.location?.country));
// // ajaxEmail$.subscribe((data: any) => console.log(data.response.results[0]?.email));
//
// forkJoin([ajaxName$, ajaxCity$, ajaxEmail$]).subscribe(
//     ([ajaxName, ajaxCity, ajaxEmail]) => {
//       console.log(`${ajaxName.response.results[0]?.name?.first} is from ${ajaxCity.response.results[0]?.location?.country} and this is the email contact ${ajaxEmail.response.results[0]?.email}`);
//     }
// );


// 43. forkJoin - Error Scenario
// const a$ = new Observable(subscriber => {
//     setTimeout(() => {
//         subscriber.next('a');
//         subscriber.complete();
//     },5000); // this will get cancelled as the b$ fails before
//     return () => {
//         console.log("Teardown A");
//     }
// });
// const b$ = new Observable(subscriber => {
//     setTimeout(() => {
//         subscriber.error('Failure!');
//     },3000);
//     return () => {
//         console.log("Teardown B");
//     }
// });
//
// forkJoin([a$,b$]).subscribe({
//     next: value => console.log(value),
//     error: err => console.log('Error:', err)
// });


// 45. combineLatest - Reacting to multiple input changes
// A ->                     ----A------------B---------------------C-----|---->
// B ->                     ----------1----------------2--------|------------->
// combineLatest([A,B]) ->  ----------[A,1]--[B,1]-----[B,2]-------[C,2]-|---->

// A ->                     ----A------------B-------------------------------->
// B ->                     ----------1----------------2--------X------------->
// combineLatest([A,B]) ->  ----------[A,1]--[B,1]-----[B,2]----X------------->

// const temperatureInput = document.getElementById("temperature-input");
// const conversionInput = document.getElementById("conversion-dropdown");
// const resultText = document.getElementById("result-text");
//
// const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
// const conversionInputEvent$ = fromEvent(conversionInput, 'input');
//
// combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
//     ([temperatureInputEvent, conversionInputEvent]) => {
//       // @ts-ignore
//       const temperature: number = Number(temperatureInputEvent.target['value']);
//       // @ts-ignore
//       const conversion: string = conversionInputEvent.target['value'];
//       resultText.innerHTML = convert(temperature, conversion);
//     }
// );
//
// const fahrenheitToCelsius: Function = (f: number): number => (f - 32) * 5/9;
// const celsiusToFahrenheit: Function = (c: number): number => (c * 9/5) + 32;
// const convert: Function = (value: number, conversion: string): number => {
//   switch(conversion){
//     case 'f-to-c' :
//       return fahrenheitToCelsius(value);
//     case 'c-to-f' :
//       return celsiusToFahrenheit(value);
//   }
//   return value;
// }


// 50. filter operator
// news    -----A------1------B------2--------C------3---------D-------4------>
// where letters are a type of news (i.e., sport news) and numbers another (i.e., business news).
// and we want only to get sport news filtering only what we want to receive....
// filter( item => item.category === 'sport')
// result  -----A-------------B---------------C----------------D-------------->
// enum NewsType {
//     BUSINESS,
//     SPORT
// }
// interface NewsItem {
//     category: NewsType.SPORT | NewsType.BUSINESS
//     content: string;
// }
// const news: Array<NewsItem> = [
//     { category: NewsType.SPORT, content: 'A' },
//     { category: NewsType.SPORT, content: 'B' },
//     { category: NewsType.BUSINESS, content: '1' },
//     { category: NewsType.BUSINESS, content: '2' },
//     { category: NewsType.SPORT, content: 'C' },
//     { category: NewsType.SPORT, content: 'D' },
//     { category: NewsType.BUSINESS, content: '3' },
//     { category: NewsType.BUSINESS, content: '4' },
// ];
// const newsObservables$ = new Observable<NewsItem>(subscriber => {
//     news.forEach(newItem => setTimeout(() => subscriber.next(newItem), 1000));
// });
//
// const newsSubscription = newsObservables$.subscribe({ next: ({ content}) => console.log(content)});
//
// const sportSubscription = newsObservables$.pipe(
//     filter(newItem => newItem.category === NewsType.SPORT)
// ).subscribe({ next: (newItem) => console.log("This is a sport news -> ", newItem.content) });
//
// const businessSubscription = newsObservables$.pipe(
//     filter(newItem => newItem.category === NewsType.BUSINESS)
// ).subscribe({ next: (newItem) => console.log("This is a business news -> ", newItem.content) });


// 51. map operator
// numbers -----1------2-------3------4------5-------6-------7------>
// map( x => x * x)
// result  -----1------4-------9------16-----25------36------49----->
//
// const numbersObservable$ = new Observable<number>(subscriber => {
//     setTimeout(() => { subscriber.next(1) }, 1000);
//     setTimeout(() => { subscriber.next(2) }, 2000);
//     setTimeout(() => { subscriber.next(3) }, 3000);
//     setTimeout(() => { subscriber.next(4) }, 1000);
//     setTimeout(() => { subscriber.next(5) }, 4000);
//     setTimeout(() => { subscriber.next(6) }, 6000);
//     setTimeout(() => { subscriber.next(7) }, 7000);
// });
//
// const powerSubscription = numbersObservable$.pipe(
//   map((x: number) => x * x)
// ).subscribe( { next: (x: number) => console.log(x) });
//
// // with forkJoin ....
// const url: string = 'https://randomuser.me/api';
// let ajaxName$ = ajax(url);
// let ajaxCountry$ = ajax(url);
// let ajaxEmail$ = ajax(url);
//
// ajaxName$ = ajaxName$.pipe(
//     map((data: AjaxResponse<any>) => data.response?.results[0]?.name?.first)
// );
// ajaxCountry$ = ajaxCountry$.pipe(
//     map((data: AjaxResponse<any>) => data.response.results[0]?.location?.country)
// );
// ajaxEmail$ = ajaxEmail$.pipe(
//     map((data: AjaxResponse<any>) => data.response.results[0]?.email)
// );
//
// forkJoin([ajaxName$, ajaxCountry$, ajaxEmail$]).subscribe(
//     ([name, country, email]) => {
//       console.log(`${name} is from ${country} and this is the email contact ${email}`);
//     }
// );


// 52. tap operator (https://jaywoz.medium.com/information-is-king-tap-how-to-console-log-in-rxjs-7fc09db0ad5a)
// of(13, 3, 9, 7, 1).pipe(
//     // tap(value => { console.log("Spy on the value -> ", value) }),
//     filter(value => value > 5),
//     // tap(value => { console.log("Spy on the value -> ", value) }),
//     map(value => value * 2),
//     tap(value => { console.log("Spy on the value -> ", value) })
// ).subscribe({
//     next: (value)=> console.log("Output value -> ", value)
// });


// 54. debounceTime
// values  ------A--------------------B------C------------------>
// debounceTime(2000)
// time    ------1------2------3------4------5------6------7----> (s)
// result  --------------------A---------------------------C---->
// const sliderInput = document.querySelector("input#slider");
// fromEvent(sliderInput, 'input').pipe(
//     debounceTime(2000),
//     // @ts-ignore
//     map(event => event.target['value']),
// ).subscribe({ next: (value) => console.log(value) });


// 55. catchError & EMPTY
// const failingHttpRequest$ = new Observable(subscriber => {
//   setTimeout(()=>{
//     subscriber.error(new Error('Timeout'));
//   }, 3000)
// });
// console.log('App Started');
// failingHttpRequest$.pipe(
//     catchError(_ => of('Fallback error'))
// ).subscribe(
//     { next: value => console.log(value) }
// );
//
// failingHttpRequest$.pipe(
//     catchError(_ => EMPTY)
// ).subscribe({
//       next: value => console.log(value),
//       complete: () => console.log("Completed")
//     }
// );


// 57. concatMap: static example
// ------------------A---------------B-------------->
// concatMap(() => newStream$)
// -------------------1-2-|->        -1-2-|->
// -------------------1-2-------------1-2------------->
// const source$ = new Observable(subscriber => {
//   setTimeout(()=> subscriber.next('A'),2000);
//   setTimeout(()=> subscriber.next('B'),5000);
// });
// console.log('App Started');
// source$.pipe(
//     concatMap(value => of(1,2))
// ).subscribe({
//   next: (value) => console.log(value)
// });


// 58. concatMap: dynamic example
// ------------------A---------------B-------------->
// concatMap(() => requestData(value))
// -------------------1|->          -----5-|->
// -------------------1------------------5---------->
// const endpointInput: HTMLInputElement = document.querySelector("input#endpoint");
// const fetchButton = document.querySelector("button#fetch");
//
// fromEvent(fetchButton, "click").pipe(
//     map(()=> endpointInput.value),
//     concatMap(value =>
//         ajax(`https://jsonplaceholder.typicode.com/${value}`).pipe(
//             catchError(error => of(`Could not fetch data: ${error}`))
//         )
//     )
// ).subscribe({
//   next: value => {
//     console.log(value)
//     document.querySelector("div#jsonPlaceholderResponse").innerHTML =
//         `${JSON.stringify(value)}`;
//   },
//   error: error => {
//     console.log(error);
//     document.querySelector("div#jsonPlaceholderResponse").innerHTML = `Error ${error}`;
//   },
//   complete: () => console.log("Completed")
// })