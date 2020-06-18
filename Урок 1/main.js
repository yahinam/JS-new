'use strict';
const products = [
    { id: 1, title: 'Notebook', img: "https://avatars.mds.yandex.net/get-zen_doc/246252/pub_5d08c7838b264500b0ea19b4_5d08c992af2dd900aef1b3e8/scale_1200", price: 20000 },
    { id: 2, title: 'Mouse', img: "https://avatars.mds.yandex.net/get-zen_doc/246252/pub_5d08c7838b264500b0ea19b4_5d08c992af2dd900aef1b3e8/scale_1200", price: 1500 },
    { id: 3, title: 'Keyboard', img: "https://avatars.mds.yandex.net/get-zen_doc/246252/pub_5d08c7838b264500b0ea19b4_5d08c992af2dd900aef1b3e8/scale_1200", price: 5000 },
    { id: 4, title: 'Gamepad', img: "https://avatars.mds.yandex.net/get-zen_doc/246252/pub_5d08c7838b264500b0ea19b4_5d08c992af2dd900aef1b3e8/scale_1200", price: 4500 },
];

// ПЕРВОНАЧАЛЬНЫЙ ВАРИАНТ

// const renderProduct = (title, price, img) => {
//     return `<div class="product-item">
//                 <h3>${title}</h3>
//                 <img src=${img} />
//                 <p>${price}</p>
//                 <button class="by-btn">Добавить в корзину</button>
//               </div>`;
// };
// const renderProducts = (list) => {
//     // const productList = list.map(item => renderProduct(item.title, item.price));
//     const productList = list.map((item) => {
//         return renderProduct(item.title, item.price, item.img);
//     });
// document.querySelector('.products').innerHTML = renderProducts;
// };   


//  ЧУТЬ ПОКОРОЧЕ, НО ЗАПЯТЫЕ ВСЕ РАВНО ЕСТЬ, Т.К. МАР ВОЗВРАЩАЕТ МАССИВ, ЭЛЕМЕНТЫ КОТОРОГО РАЗДЕЛЯЮТСЯ ЗАПЯТОЙ

// let renderProducts = products.map(item => {
//     return `<div class="product-item">
//             <h3>${item.title}</h3>
//             <img src=${item.img} />
//             <p>${item.price}</p>
//             <button class="by-btn" type="button">Добавить в корзину</button>
//         </div>`;
// });
// document.querySelector('.products').innerHTML = renderProducts;


// С ПОМОЩЬЮ МЕТОДА ForEach. Без запятой, но как-то не очень лаконично...

const renderProducts = products.forEach((item) => {
    const productItem = document.createElement('div');
    productItem.innerHTML = `<h3>${item.title}</h3>
        <img src=${item.img} />
        <p>${item.price}</p>
        <button class="by-btn type="button"">Добавить в корзину</button>`;
    document.querySelector('.products').prepend(productItem);
    productItem.classList.add('product-item');
});

// СТИЛИ
document.querySelector('.products').setAttribute("style", "width: 1000px; display: flex; justify-content: space-between; flex-wrap: wrap;");
document.querySelectorAll('.product-item').forEach(item => {item.style.width = "45%";});
document.querySelectorAll('img').forEach(item => item.setAttribute("style", "width: 100%; height: 60%;"));
document.querySelectorAll('button').forEach(item => item.setAttribute("style", "background-color: blue; color: white; width: 150px; height: 45px; border: 1px solid blue; font-size: 14px;"));
