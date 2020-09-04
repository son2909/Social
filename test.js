// // // function solution(N) {
// // //   // write your code in JavaScript (Node.js 8.9.4)
// // //   var res = [];
// // //   for (let i = 1; i < N; i++) {
// // //       res.push(i);
// // //   }
// // //   var sum = res.reduce((a, b) => {
// // //       return a + b;
// // //   }, 0);
// // //   res.push(sum*-1);
// // //   return res;
// // // }

// // // console.log(solution(9));
// // function solution(A, K) {
// //   // write your code in JavaScript (Node.js 8.9.4)
// //   var max = 0;
// //   A.map(item => {
// //       if (item > max) {
// //           max = item;
// //       }
// //   })
// //   var width = max.toString().length;
// //   var b = [];
// //   var c = [];
// //   if (A.length > K) {
// //       var rows = Math.floor(A.length / K);
// //       console.log(rows);
// //       for (let i = 0; i < (rows * K); i++) {
// //           b.push((A[i]).toString());
// //       }
// //       for (let i = rows * K; i < A.length; i++) {
// //           c.push((A[i]).toString());
// //       }

// //   } else {
// //       c = A.map(item => {
// //           return item.toString();
// //       });
// //   }

// //   var w = '';
// //   var border = '';
// //   for (let i = 1; i <= width; i++) {
// //       w += '-';
// //   }
// //   for (let i = 0; i < K; i++) {
// //       border += '+' + w;
// //   }
// //   border += '+';
// //   var border2 = '';
// //   for (let i = 0; i < c.length; i++) {
// //       border2 += '+' + w;
// //   }
// //   border2 += '+';
// //   //console.log(border);
// //   var skip = '';
// //   var res = '';
// //   if (b.length != 0) {
// //       res += border + '\n';
// //   } else {
// //       res += border2 + '\n';
// //   }

// //   if (b.length != 0) {
// //       for (let i = 0; i < b.length; i++) {
// //           for (let j = 1; j <= (width - b[i].length); j++) {
// //               skip += ' ';
// //           }
// //           res += '|' + skip + b[i];
// //           if ((i + 1) % K == 0 && (i + 1) != b.length) {
// //               res += '|' + '\n' + border + '\n';
// //           } else if ((i + 1) % K == 0) {
// //               res += '|' + '\n' + border;
// //           }
// //           skip = '';
// //       }
// //   }

// //   if (c.length != 0) {
// //       if (b.length != 0 && c.length != 0) {
// //           res += '\n';
// //       }
// //       for (let i = 0; i < c.length; i++) {
// //           for (let j = 1; j <= (width - c[i].length); j++) {
// //               skip += ' ';
// //           }
// //           res += '|' + skip + c[i];
// //           if ((i + 1) == c.length) {
// //               res += '|' + '\n' + border2;
// //           }
// //           skip = '';
// //       }
// //   }
// //   console.log(res);
// // }
// // solution([4,5,456,4,7,8,32132139],4);

// // let obj = {
// //     "123456": 'abc',
// //     '111111': 'def'
// // }

// // for (const [key, value] of Object.entries(obj)) {
// //     if (value === 'def') {
// //         console.log(key);
// //         delete obj[key];
// //         console.log(obj);
// //         return;
// //     }
// // }

// const moment = require('moment');

// let objto = {};
// let array = [
//     {
//         "_id": "YpivhXffeFJ2Qv7Cm",
//         "_updatedAt": "2020-08-25T03:03:45.316Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T03:03:45.316Z",
//         "desc": "create event",
//         "end": "2020-08-29T16:59:59.999Z",
//         "guests": [
//             "6MKt5GtFXPiXiWEix"
//         ],
//         "location": "Hà Nội",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T03:03:03.899Z",
//         "t": "e",
//         "title": "Test create event"
//     },
//     {
//         "_id": "TvES9zDnAQEaPMir6",
//         "_updatedAt": "2020-08-25T03:29:00.581Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T03:29:00.581Z",
//         "desc": "test",
//         "end": "2020-08-05T16:59:59.999Z",
//         "guests": [],
//         "location": "hanoi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-03T15:08:17.248Z",
//         "t": "e",
//         "title": "test"
//     },
//     {
//         "_id": "qQv9zAGfF3eeY24qd",
//         "_updatedAt": "2020-08-25T08:37:20.631Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T08:37:20.631Z",
//         "desc": "dghhj",
//         "end": "2020-08-15T00:00:00.000Z",
//         "guests": [],
//         "location": "dghj",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T15:35:00.000Z",
//         "t": "e",
//         "title": "dghk"
//     },
//     {
//         "_id": "CbRitXcRMJGKvKPHT",
//         "_updatedAt": "2020-08-25T08:40:14.986Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T08:40:14.986Z",
//         "desc": "ghikk",
//         "end": "2020-08-02T00:00:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-11T15:35:00.000Z",
//         "t": "e",
//         "title": "ghjk"
//     },
//     {
//         "_id": "Wq2oxETx4c92ix5EW",
//         "_updatedAt": "2020-08-25T08:43:53.821Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T08:43:53.821Z",
//         "desc": "ghikk",
//         "end": "2020-08-02T00:00:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-11T15:35:00.000Z",
//         "t": "e",
//         "title": "ghjk"
//     },
//     {
//         "_id": "AJpzayAgxzayxRZtD",
//         "_updatedAt": "2020-08-25T08:49:07.334Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T08:49:07.334Z",
//         "desc": "ghikk",
//         "end": "2020-08-25T16:00:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-27T15:35:00.000Z",
//         "t": "e",
//         "title": "ghjk"
//     },
//     {
//         "_id": "qu2ty6dRPq7Eug3fh",
//         "_updatedAt": "2020-08-25T08:51:00.536Z",
//         "allDay": false,
//         "createdAt": "2020-08-25T08:51:00.536Z",
//         "desc": "ghikk",
//         "end": "2020-08-25T16:00:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-27T15:35:00.000Z",
//         "t": "e",
//         "title": "test in posst man"
//     },
//     {
//         "_id": "ChTPnrnMvuiPbLb8N",
//         "_updatedAt": "2020-08-25T09:03:07.049Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:03:07.049Z",
//         "desc": "testnghe",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "nghe an",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-28T16:02:00.000Z",
//         "t": "e",
//         "title": "test app"
//     },
//     {
//         "_id": "c8eJBPPcEp7dLJEG9",
//         "_updatedAt": "2020-08-25T09:05:33.147Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:05:33.146Z",
//         "desc": "test",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-30T16:02:00.000Z",
//         "t": "e",
//         "title": "test app"
//     },
//     {
//         "_id": "jPSK5LmdrHAh5i9BQ",
//         "_updatedAt": "2020-08-25T09:08:53.069Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:08:53.069Z",
//         "desc": "asdgng",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "nghe an",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-30T16:08:00.000Z",
//         "t": "e",
//         "title": "test app"
//     },
//     {
//         "_id": "QFSiAjzjX22rnSq6h",
//         "_updatedAt": "2020-08-25T09:13:59.484Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:13:59.484Z",
//         "desc": "alo",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T16:08:00.000Z",
//         "t": "e",
//         "title": "test"
//     },
//     {
//         "_id": "5RnRfS5okp4A92CDN",
//         "_updatedAt": "2020-08-25T09:14:01.102Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:14:01.102Z",
//         "desc": "alo",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T16:08:00.000Z",
//         "t": "e",
//         "title": "test"
//     },
//     {
//         "_id": "Gx8Rdk3LgNHp3Dx5q",
//         "_updatedAt": "2020-08-25T09:21:56.425Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:21:56.425Z",
//         "desc": "dghj",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "gghk",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T16:08:00.000Z",
//         "t": "e",
//         "title": "fghj"
//     },
//     {
//         "_id": "7iZwgPkkT8MSALDd3",
//         "_updatedAt": "2020-08-25T09:22:42.160Z",
//         "allDay": false,
//         "createdAt": "2020-08-25T09:22:42.160Z",
//         "desc": "ghikk",
//         "end": "2020-08-25T16:00:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-27T15:35:00.000Z",
//         "t": "e",
//         "title": "test in posst man 2"
//     },
//     {
//         "_id": "nBSm4xc3eogR6wcYi",
//         "_updatedAt": "2020-08-25T09:24:33.715Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:24:33.715Z",
//         "desc": "ghik",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "fgh",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T16:08:00.000Z",
//         "t": "e",
//         "title": "dghkk"
//     },
//     {
//         "_id": "Xd5GSaeFtxtk86Qnk",
//         "_updatedAt": "2020-08-25T09:25:27.530Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:25:27.530Z",
//         "desc": "ghik",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "fgh",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T16:08:00.000Z",
//         "t": "e",
//         "title": "dghkk"
//     },
//     {
//         "_id": "isSh6AnrbXMq3Acya",
//         "_updatedAt": "2020-08-25T09:26:10.486Z",
//         "allDay": false,
//         "createdAt": "2020-08-25T09:26:10.486Z",
//         "desc": "ghik",
//         "end": "2020-08-16T00:00:00.000Z",
//         "guests": [],
//         "location": "fgh",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T16:08:00.000Z",
//         "t": "e",
//         "title": "test-3333833"
//     },
//     {
//         "_id": "RtyBJZv6kbqZngYbF",
//         "_updatedAt": "2020-08-25T09:27:48.145Z",
//         "allDay": false,
//         "createdAt": "2020-08-25T09:27:48.145Z",
//         "desc": "ghik",
//         "end": "2020-08-27T00:00:00.000Z",
//         "guests": [],
//         "location": "fgh",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-25T16:08:00.000Z",
//         "t": "e",
//         "title": "test-3333833"
//     },
//     {
//         "_id": "NnzbugNXuHuCS4DN9",
//         "_updatedAt": "2020-08-25T09:37:57.421Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T09:37:57.421Z",
//         "desc": "test",
//         "end": "2020-08-31T16:33:00.000Z",
//         "guests": [],
//         "location": "ha noi",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-30T07:33:00.000Z",
//         "t": "e",
//         "title": "test app"
//     },
//     {
//         "_id": "s7Z7AdYqiKKh3JphS",
//         "_updatedAt": "2020-08-25T10:03:20.918Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T10:03:20.918Z",
//         "desc": "dfhjk",
//         "end": "2020-08-31T17:01:00.000Z",
//         "guests": [],
//         "location": "chhj",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-30T17:01:00.000Z",
//         "t": "e",
//         "title": "dghko"
//     },
//     {
//         "_id": "PdmA9LpAtADNcbSnw",
//         "_updatedAt": "2020-08-25T10:03:25.916Z",
//         "allDay": true,
//         "createdAt": "2020-08-25T10:03:25.916Z",
//         "desc": "dfhjk",
//         "end": "2020-08-31T17:01:00.000Z",
//         "guests": [],
//         "location": "chhj",
//         "owner": "qNB8Y6PpGxsZbJx4W",
//         "start": "2020-08-30T17:01:00.000Z",
//         "t": "e",
//         "title": "dghko"
//     }
// ]
// function pushEvent(obj, date, event) {
//     if (obj[date]) {
//         let a = [...obj[date], event];
//         obj[date] = a;
//     } else {
//         obj[date] = [event]
//     }
// }
// function incDay(date, number) {
//     let today = moment(new Date(date)).format("YYYY-MM-DD");
//     return moment(moment(today).add(number, 'days')).format("YYYY-MM-DD");
// }
// function changeObject(array, objto) {
//     for (let i = 0; i < array.length; i++) {
//         let obj = array[i];
//         let start = moment(new Date(obj.start)).format('YYYY-MM-DD');
//         let end = moment(new Date(obj.end)).format('YYYY-MM-DD');
//         let distane = moment(obj.end).diff(moment(obj.start), 'days')
//         let event = { name: obj.title }
//         let arrayDay = [start];
//         for (let i = 1; i <= distane; i++) {
//             let day = incDay(obj.start, i);
//             arrayDay.push(day);
//         }
//         for (let i = 0; i < distane + 1; i++) {
//             pushEvent(objto, arrayDay[i], event);
//         }
//     }
//     return objto;
// }
// console.log(changeObject(array, objto));
