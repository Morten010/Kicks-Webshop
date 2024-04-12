import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCart = create(
    persist((set, get) => ({
        cart: [],
        totalItems: 0,
        totalPrice: 0,
    
        addProduct: (product) => {
            //get cart and get if item is in cart
            const cart = get().cart
            const cartItem = cart.find(item => item.id === product.id)

            // if cart item dont exist
            if(!cartItem){
                set((state) => ({
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + product.price,
                    cart: [{...product, amount: 1}, ...state.cart]
                }))
                return
            }
            
            //if cart item does exist
            //if product has same id but diffrent size
            const cartItemsIds = cart.find(p => p.id === product.id && p.size === product.size)


            // run if item has same id but is a new size
            if(!cartItemsIds){
                console("Has same id but diffrent size");
                set((state) => ({
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + product.price,
                    cart: [{...product, amount: 1}, ...state.cart]
                }))
            }

            // if product size and id is the same
            if(cartItemsIds){
                console("Has same id but and same size");
                // update cart with adding amount
                // const without = cart.map(p => {})
                const newCart = cart.map(p => {
                    if(product.id == p.id && product.size == p.size){
                        return {...product, amount: p.amount + 1}
                    }else{
                        return p
                    }
                })

                //set newCart
                set((state) => ({
                    cart:  newCart,
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + product.price,
                }))
            }
    
        },
    
        decreaseProduct: (product) => {
            //get cart, prices and item 
            const cart = get().cart
            let totalItems = get().totalItems
            let totalPrice = get().totalPrice

            const updatedCart = cart.filter((p) => {
                //if id and size matches and is the last amount decrease items and price
                //dont return anything so it gets removed
                if(p.id === product.id && p.size === product.size && p.amount === 1){
                    totalItems = totalItems - 1
                    totalPrice = totalPrice - product.price
                } else if(p.id === product.id && p.size === product.size){
                    //if id and size matches and isnt the last one
                    // decrease item and price
                    totalItems = totalItems - 1
                    totalPrice = totalPrice - product.price
                    return {...p, amount: p.amount -= 1}
                }else{
                    //else
                    return p
                }
             })
    
            set((state) => ({
                cart: updatedCart,
                totalItems,
                totalPrice,
            }))
        },
    
        increaseProduct: (product) => {
            //get cart, prices and item 
            const cart = get().cart
    
            const updatedCart = cart.map((p) => {
                if(product.id === p.id && product.size === p.size){
                    //if id matches
                    return {...p, amount: p.amount + 1}
                } else {
                    //if id dont match
                    return p
                }
            })
    
            //set new state
            set((state) => ({
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + product.price,
                cart: updatedCart,
            }))
        },

        clearCart: () => {
            set((state) => ({
                cart: [],
                totalItems: 0,
                totalPrice: 0,
            }))
        }

        
    }), {
        name: "cart",
        storage: createJSONStorage(() => localStorage)
    })
)