# immutadot-benchmark

This is a benchmarking package for [immutadot](https://github.com/zenika-open-source/immutadot).

## Results

|  | ES2015 destructuring | immutable 4.0.0-rc.12 | seamless-immutable 7.1.4 | immer 8.0.3 | qim 0.0.52 | qim 0.0.52 curried | immutadot 1.0.0 | immutadot 2.0.0 | immutadot 2.0.0 curried | immutadot 3.0.0 | immutadot 3.0.0 curried |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Set a property | 100 <br> 1369863ops/s (730ns/op) | 28 <br> 387088ops/s (2.58µs/op) | 5 <br> 66687ops/s (15.0µs/op) | 4 <br> 60432ops/s (16.5µs/op) | 54 <br> 734480ops/s (1.36µs/op) | 53 <br> 720138ops/s (1.39µs/op) | 12 <br> 160226ops/s (6.24µs/op) | 46 <br> 628182ops/s (1.59µs/op) | 44 <br> 597549ops/s (1.67µs/op) | 49 <br> 672412ops/s (1.49µs/op) | 54 <br> 739196ops/s (1.35µs/op) |
| Set a deeply nested property | 100 <br> 545029ops/s (1.83µs/op) | 8 <br> 43274ops/s (23.1µs/op) | 1 <br> 5384ops/s (186µs/op) | 1 <br> 7225ops/s (138µs/op) | 17 <br> 91043ops/s (11.0µs/op) | 17 <br> 90288ops/s (11.1µs/op) | 3 <br> 14545ops/s (68.8µs/op) | 15 <br> 82142ops/s (12.2µs/op) | 15 <br> 79142ops/s (12.6µs/op) | 16 <br> 85800ops/s (11.7µs/op) | 15 <br> 80323ops/s (12.4µs/op) |
| Update small todos list (1000 items) | 100 <br> 19488ops/s (51.3µs/op) | 12 <br> 2423ops/s (413µs/op) | 3 <br> 637ops/s (1.57ms/op) | 1 <br> 186ops/s (5.37ms/op) | 23 <br> 4431ops/s (226µs/op) | 23 <br> 4551ops/s (220µs/op) | 12 <br> 2319ops/s (431µs/op) | 127 <br> 24817ops/s (40.3µs/op) | 125 <br> 24403ops/s (41.0µs/op) | 38 <br> 7368ops/s (136µs/op) | 38 <br> 7426ops/s (135µs/op) |
| Update medium todos list (10000 items) | 100 <br> 2366ops/s (423µs/op) | 11 <br> 271ops/s (3.70ms/op) | 3 <br> 73ops/s (13.6ms/op) | 1 <br> 22ops/s (45.2ms/op) | 22 <br> 530ops/s (1.89ms/op) | 23 <br> 534ops/s (1.87ms/op) | 11 <br> 257ops/s (3.89ms/op) | 144 <br> 3397ops/s (294µs/op) | 147 <br> 3468ops/s (288µs/op) | 35 <br> 827ops/s (1.21ms/op) | 35 <br> 836ops/s (1.20ms/op) |
| Update large todos list (100000 items) | 100 <br> 184ops/s (5.44ms/op) | 14 <br> 27ops/s (37.6ms/op) | 4 <br> 7ops/s (147ms/op) | 1 <br> 2ops/s (506ms/op) | 25 <br> 47ops/s (21.4ms/op) | 26 <br> 47ops/s (21.3ms/op) | 13 <br> 23ops/s (42.9ms/op) | 158 <br> 291ops/s (3.44ms/op) | 159 <br> 292ops/s (3.43ms/op) | 38 <br> 69ops/s (14.4ms/op) | 38 <br> 71ops/s (14.2ms/op) |
| Push values in array | 100 <br> 1018330ops/s (982ns/op) | 40 <br> 405516ops/s (2.47µs/op) | 4 <br> 39029ops/s (25.6µs/op) | 4 <br> 35742ops/s (28.0µs/op) | 52 <br> 530663ops/s (1.88µs/op) | 51 <br> 520089ops/s (1.92µs/op) | 13 <br> 131271ops/s (7.62µs/op) | 23 <br> 233492ops/s (4.28µs/op) | 17 <br> 173761ops/s (5.76µs/op) | 50 <br> 513089ops/s (1.95µs/op) | 53 <br> 543788ops/s (1.84µs/op) |
