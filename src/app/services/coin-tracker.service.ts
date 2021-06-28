import { Injectable } from '@angular/core';

import { webSocket } from 'rxjs/webSocket';
import { of, Subscription } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoinTrackerService {
  coinType = '';
  constructor() {}

  getData(coinType = 'bitcoin') {
    this.coinType = coinType;
    this.subject = webSocket(
      `wss://ws.coincap.io/prices?assets=${this.coinType}`
    );
    return this.subject.pipe(concatMap((item) => of(item).pipe(delay(1000))));
  }

  subject = webSocket(`wss://ws.coincap.io/prices?assets=${this.coinType}`);
}
