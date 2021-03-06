# immutadot-benchmark

This is a benchmarking package for [immutadot](https://github.com/zenika-open-source/immutadot).

## Running

```sh
# Install dependencies
yarn

# Run the benchmarks
yarn start

# Or if you're in a hurry...
yarn start:fast
```

## Results

|  | ES2015 destructuring | immutable 4.0.0-rc.12 | seamless-immutable 7.1.4 | immer 9.0.1 | qim 0.0.52 | qim 0.0.52 curried | immutadot 1.0.0 | immutadot 2.0.0 | immutadot 2.0.0 curried | immutadot 3.0.0 | immutadot 3.0.0 curried |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Set a property | 100 <br> 25637386ops/s (39.0ns/op) | 7 <br> 1698637ops/s (589ns/op) | 1 <br> 147219ops/s (6.79µs/op) | 0 <br> 54978ops/s (18.2µs/op) | 12 <br> 3180375ops/s (314ns/op) | 8 <br> 2091654ops/s (478ns/op) | 4 <br> 898503ops/s (1.11µs/op) | 10 <br> 2526636ops/s (396ns/op) | 8 <br> 2038789ops/s (490ns/op) | 9 <br> 2200603ops/s (454ns/op) | 12 <br> 3107952ops/s (322ns/op) |
| Set a deeply nested property | 100 <br> 3286858ops/s (304ns/op) | 7 <br> 223998ops/s (4.46µs/op) | 0 <br> 10452ops/s (95.7µs/op) | 0 <br> 6202ops/s (161µs/op) | 12 <br> 383181ops/s (2.61µs/op) | 12 <br> 383691ops/s (2.61µs/op) | 3 <br> 106098ops/s (9.43µs/op) | 8 <br> 265919ops/s (3.76µs/op) | 8 <br> 246919ops/s (4.05µs/op) | 6 <br> 197339ops/s (5.07µs/op) | 6 <br> 202848ops/s (4.93µs/op) |
| Update todos list (100 items out of 1000) | 100 <br> 20970ops/s (47.7µs/op) | 69 <br> 14566ops/s (68.7µs/op) | 10 <br> 2093ops/s (478µs/op) | 1 <br> 151ops/s (6.62ms/op) | 178 <br> 37377ops/s (26.8µs/op) | 200 <br> 42038ops/s (23.8µs/op) | 45 <br> 9419ops/s (106µs/op) | 127 <br> 26636ops/s (37.5µs/op) | 136 <br> 28549ops/s (35.0µs/op) | 68 <br> 14303ops/s (69.9µs/op) | 73 <br> 15374ops/s (65.0µs/op) |
| Update todos list (1000 items out of 10000) | 100 <br> 2214ops/s (452µs/op) | 64 <br> 1419ops/s (704µs/op) | 10 <br> 231ops/s (4.34ms/op) | 1 <br> 15ops/s (66.9ms/op) | 204 <br> 4515ops/s (221µs/op) | 202 <br> 4464ops/s (224µs/op) | 46 <br> 1025ops/s (976µs/op) | 159 <br> 3522ops/s (284µs/op) | 162 <br> 3596ops/s (278µs/op) | 70 <br> 1550ops/s (645µs/op) | 69 <br> 1523ops/s (657µs/op) |
| Update todos list (10000 items out of 100000) | 100 <br> 186ops/s (5.36ms/op) | 64 <br> 120ops/s (8.36ms/op) | 11 <br> 20ops/s (49.5ms/op) | 1 <br> 2ops/s (543ms/op) | 154 <br> 286ops/s (3.49ms/op) | 181 <br> 337ops/s (2.97ms/op) | 42 <br> 78ops/s (12.8ms/op) | 137 <br> 255ops/s (3.93ms/op) | 152 <br> 284ops/s (3.53ms/op) | 63 <br> 117ops/s (8.55ms/op) | 66 <br> 123ops/s (8.12ms/op) |
| Push values in array | 100 <br> 3347088ops/s (299ns/op) | 29 <br> 981441ops/s (1.02µs/op) | 2 <br> 65575ops/s (15.2µs/op) | 1 <br> 33449ops/s (29.9µs/op) | 49 <br> 1637578ops/s (611ns/op) | 46 <br> 1553623ops/s (644ns/op) | 17 <br> 576462ops/s (1.73µs/op) | 28 <br> 922585ops/s (1.08µs/op) | 18 <br> 602937ops/s (1.66µs/op) | 37 <br> 1249241ops/s (800ns/op) | 44 <br> 1485242ops/s (673ns/op) |
