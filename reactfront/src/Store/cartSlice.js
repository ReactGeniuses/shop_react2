// features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../Store/AuthSlice';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : {
        items: [],
        total: 0,
        count: 0,
    };

const saveCartToLocalStorage = (state) => {
    const cartData = {
        items: state.items.map(item => ({
            Codigo: item.Codigo,
            quantity: item.quantity,
            Price: item.Price,
            Nombre: item.ProductName
        })),
        total: state.total,
        count: state.count
    };
    localStorage.setItem('cart', JSON.stringify(cartData));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            const product = action.payload;
            const existingProduct = state.items.find(item => item.Codigo === product.Codigo);

            if (existingProduct) {
                if (existingProduct.quantity < product.Quantity) {
                    existingProduct.quantity += 1;
                    state.total += product.Price;
                    state.count += 1;
                } else {
                    alert(`Ya tienes el máximo de ${product.ProductName} en el carrito.`);
                }
            } else {
                if (product.Quantity > 0) {
                    state.items.push({ ...product, quantity: 1 });
                    state.total += product.Price;
                    state.count += 1;
                } else {
                    alert(`El producto ${product.ProductName} no tiene suficiente stock.`);
                }
            }
            saveCartToLocalStorage(state);
        },
        removeProduct(state, action) {
            const productId = action.payload;
            const productIndex = state.items.findIndex(item => item.Codigo === productId);

            if (productIndex !== -1) {
                const product = state.items[productIndex];
                state.total -= product.Price * product.quantity;
                state.count -= product.quantity;
                state.items.splice(productIndex, 1);
                saveCartToLocalStorage(state);
            }
        },
        clearCart(state) {
            state.items = [];
            state.total = 0;
            state.count = 0;
            localStorage.removeItem('cart');
        },
        incrementQuantity(state, action) {
            const productId = action.payload;
            const product = state.items.find(item => item.Codigo === productId);

            if (product && product.quantity < product.Quantity) {
                product.quantity += 1;
                state.total += product.Price;
                state.count += 1;
                saveCartToLocalStorage(state);
            }
        },
        decrementQuantity(state, action) {
            const productId = action.payload;
            const product = state.items.find(item => item.Codigo === productId);

            if (product && product.quantity > 1) {
                product.quantity -= 1;
                state.total -= product.Price;
                state.count -= 1;
                saveCartToLocalStorage(state);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state) => {
            state.items = [];
            state.total = 0;
            state.count = 0;
            localStorage.removeItem('cart');
        });
    },
});

export const { addProduct, removeProduct, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
