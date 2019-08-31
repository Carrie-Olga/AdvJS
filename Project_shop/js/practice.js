// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true); //true - асинхронный запрос
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) { // запрос выполнен
//       if (xhr.status !== 200) {
//         console.log(`Error ${xhr.status} ${xhr.statusText}`);
//       } else {
//         cb(xhr.responseText);
//         console.log(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };


// Changed as per homework - on fetch()



//       let getRequest = (url) =>  {
//             return new Promise((resolve, reject) => {
//               let xhr = new XMLHttpRequest();
//               xhr.open('GET', url, true); //true - асинхронный запрос
//               xhr.onreadystatechange = () => {
//                 if (xhr.readyState === 4) { // запрос выполнен
//                   if (xhr.status !== 200) {
//                     reject(`Error ${xhr.status} ${xhr.statusText}`);
//                   } else {
//                     resolve(xhr.responseText);
//                   }
//                 }
//               };
//               xhr.send();
//             });
//       };

//
//
// _getRequest() {
//   return fetch(`${API}/catalogData.json`)
//       .then(result => result.json())
//       .then(data => {
//         this.goods = [...data];
//         this._render();
//       })
// }

// Promise
// let num = (a) => {
//   return  new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (a) {
//
//         resolve(a + 10);
//       } else {
//         reject('Error!');
//       }
//     }, 2000);
//   });
// };

// _fetchProducts() {
//   getRequest(`${API}/catalogData.json`, (data) => {
//     this.goods = JSON.parse(data);
//     this._render();
//   })
// }