const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
        filtered: [],
        searchLine: '',
        cart: [],
        seen: true,
        quantity: 0,
        totalPrice: 0,
        show: false,
        cartCount: '',
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
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                if (data.result === 1) { 
                    let find = this.cart.find(el => el.id_product === product.id_product); //см. комм-й стр. 40              
                    if (find) {
                        find.quantity ++;
                        // find.totalPrice = find.quantity * find.price;
                    } else {
                        let prod = Object.assign({quantity: 1}, product); // создается новый объект, потому что изменять product нельзя, он относится к другой сущности (продуктлист), что может привести к искажению входных данных
                        this.cart.push(prod);
                    }
                    this.cartCount++;
                } else {
                    alert('Error');
                }
            })
        },

        removeProductFromCart(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity --;
                            // item.totalPrice = item.quantity * item.price;
                            this.cartCount--;
                        } else {
                            let index = this.cart.indexOf(item);
                            this.cart.splice(index, 1); // лучше this.cart.splice(this.cart.indexOf(item), 1)
                        }
                        // if (this.cartCount === 0) {
                        //     this.cartCount = '';
                        // }
                    }
                })
        },

        searchProduct(value) {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },

    computed: {
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
              for (let el of data.contents) {
                this.cart.push(el);
              }
        });
    },
})