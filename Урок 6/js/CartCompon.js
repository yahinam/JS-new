Vue.component('cart', {
    data() {
        return {
            cart: [],
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/50x100',
            show: false,
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBassket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cart.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cart.push(prod);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity > 1) {
                           item.quantity--;
                        } else {
                            this.cart.splice(this.cart.indexOf(item), 1)
                        }
                    }
                })
        },
    },

    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
              for (let el of data.contents) {
                this.cart.push(el);
              }
        });
    },

    
    template: 
        `<div>
            <button class="btn-cart" type="button" @click="show = !show">Корзина</button>
            <div class="cart-block" v-show="show">
                <p v-if="!cart.length">Корзина пуста</p>
                <cart-item class="cart-item" v-for="item of cart" :key="item.id_product" :item="item" :img="imgCart" @remove="remove">
                </cart-item>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['item', 'img'],
    template:
        `<div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Some image">
                <div class="product-desc">
                    <p class="product-name">{{item.product_name}}</p>
                    <p class="product-quantity">Количество: {{item.quantity}}</p>
                    <p class="product-single-price">{{item.price}}₽ за ед.</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price"> {{ item.quantity * item.price }}₽</p>
                <button class="del-btn" @click="$emit('remove', item)">&times;</button>
            </div>
        </div>`
});


