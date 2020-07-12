const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve (xhr.responseText);
        } else {
            reject('Error!');
        }
    }
    xhr.onerror = () => {
        reject('Error!');
    }
    xhr.send();
    });  
}

  
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts().then(data => {
                this.goods = [...data];
                this.render();
            });
    }

    // fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 20000},
    //         {id: 2, title: 'Mouse', price: 1500},
    //         {id: 3, title: 'Keyboard', price: 5000},
    //         {id: 4, title: 'Gamepad', price: 4500},
    //     ]
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }

    // calcSum() {
    //     return this.goods.reduce((sum, good) => sum + good.price, 0);
    // }
    // getTotalSum() {
    //     let sum = 0;
    //     for(let key in this.goods) {
    //       return sum += this.goods[key].price; 
    //     }
    // }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn" >Купить</button>
                </div>
            </div>`;
    }
}

let list = new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
//   document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };

// renderProducts(products);

