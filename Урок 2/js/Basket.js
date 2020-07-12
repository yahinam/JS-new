class Basket {
    consrtuctor() {
        this.goods = [];
    }
    //метод, добавляющий товар в массив goods или увеличивающий его количество
    addItemToBasket();

    //метод, удаляющий товар из массива goods
    removeItemFromBasket();

    //метод, подсчитывающий общую сумму товаров в корзине
    getTotalsum();
}

class ItemOfBasket {
    consrtuctor(name, img, price, amount, id) {
    this.name = name;
    this.img = img;
    this.price = price;
    this.amount = amount;
    this.id = id;
    }
 
    // метод для отображения товара в корзине (html-разметка)
    renderItemToBasket();
}



