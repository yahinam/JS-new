const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        filtered: [],
        regexp: '',
        searchLine: '',
        cart: [],
        seen: true,
        quantity: 0,
        totalPrice: 0,
        show: false,
        cartCount: '',
        invisible: {display: 'none'},
        visible: true

    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product){                    
            if (this.cart.includes(product)) {
                product.quantity ++;
                product.totalPrice = product.quantity * product.price;
            } else {
                this.cart.push(product);
                Vue.set(product, 'quantity', 1);
                Vue.set(product, 'totalPrice', product.price);
            }
            this.cartCount++;
        },

        deleteProductFromCart(product) {
            if (product.quantity !== 1) {
                product.quantity --;
                product.totalPrice = product.quantity * product.price;
            } else {
                let index = this.cart.indexOf(product);
                this.cart.splice(index, 1);
            }
            this.cartCount--;
            if (this.cartCount === 0) {
                this.cartCount = '';
            }
        },

        searchProduct(value) {
            regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(good => regexp.test(good.product_name));
        },
    },

    computed: {
    },

    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
                this.filtered = this.products;
            });
    },
})