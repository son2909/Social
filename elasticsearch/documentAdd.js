const client = require('./connection.js');
mybody = {
  "constituencyname": "IpssaSAwich",
  "ConstituencyID": "E14000761",
  "ConstituencyType": "Borough",
  "Electorate": 74499,
  "ValidVotes": 48694,
  "son": "phuong"
}
client.index({
  index: 'gov',
  id: '2',
  type: 'constituencies',
  body: mybody
}, function (err, resp, status) {
  console.log(resp);
});