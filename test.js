// function solution(N) {
//   // write your code in JavaScript (Node.js 8.9.4)
//   var res = [];
//   for (let i = 1; i < N; i++) {
//       res.push(i);
//   }
//   var sum = res.reduce((a, b) => {
//       return a + b;
//   }, 0);
//   res.push(sum*-1);
//   return res;
// }

// console.log(solution(9));
function solution(A, K) {
  // write your code in JavaScript (Node.js 8.9.4)
  var max = 0;
  A.map(item => {
      if (item > max) {
          max = item;
      }
  })
  var width = max.toString().length;
  var b = [];
  var c = [];
  if (A.length > K) {
      var rows = Math.floor(A.length / K);
      console.log(rows);
      for (let i = 0; i < (rows * K); i++) {
          b.push((A[i]).toString());
      }
      for (let i = rows * K; i < A.length; i++) {
          c.push((A[i]).toString());
      }

  } else {
      c = A.map(item => {
          return item.toString();
      });
  }

  var w = '';
  var border = '';
  for (let i = 1; i <= width; i++) {
      w += '-';
  }
  for (let i = 0; i < K; i++) {
      border += '+' + w;
  }
  border += '+';
  var border2 = '';
  for (let i = 0; i < c.length; i++) {
      border2 += '+' + w;
  }
  border2 += '+';
  //console.log(border);
  var skip = '';
  var res = '';
  if (b.length != 0) {
      res += border + '\n';
  } else {
      res += border2 + '\n';
  }

  if (b.length != 0) {
      for (let i = 0; i < b.length; i++) {
          for (let j = 1; j <= (width - b[i].length); j++) {
              skip += ' ';
          }
          res += '|' + skip + b[i];
          if ((i + 1) % K == 0 && (i + 1) != b.length) {
              res += '|' + '\n' + border + '\n';
          } else if ((i + 1) % K == 0) {
              res += '|' + '\n' + border;
          }
          skip = '';
      }
  }

  if (c.length != 0) {
      if (b.length != 0 && c.length != 0) {
          res += '\n';
      }
      for (let i = 0; i < c.length; i++) {
          for (let j = 1; j <= (width - c[i].length); j++) {
              skip += ' ';
          }
          res += '|' + skip + c[i];
          if ((i + 1) == c.length) {
              res += '|' + '\n' + border2;
          }
          skip = '';
      }
  }
  console.log(res);
}
solution([4,5,456,4,7,8,32132139],4);