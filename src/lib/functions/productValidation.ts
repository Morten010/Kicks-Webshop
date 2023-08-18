interface VSize {
    id: number
    size: string
    quantity: string
}

type ProductValidationProps = {
    title: string
    desc: string
    price: string
    brand: number
    gender: string
    sizes: VSize[]
    images: string[]
    category: string
}

export const productValidation = async (product: ProductValidationProps) => {
    const errors = {
        title: "",
        desc: "",
        price: "",
        brand: "",
        gender: "",
        sizes: "",
        images: "",
        category: ""
    }

    // validate title
    if(!product.title){
        errors.title = "Required"
    }else if(product.title?.length < 2){
        errors.title = "Has to be atleast 2 characters long"
    } else {
        errors.title = ""
    }

    //validate desc 
    if(!product.desc){
        errors.desc = "Required"
    }else{
        errors.desc = ""
    }
    console.log(product.price);
    
    //validate price
    if(!product.price){
        errors.price = "Required"
    }else{
        errors.price = ""
    }

    //validate gender
    if(!product.gender){
        errors.gender = "Required"
    }else{
        errors.gender = ""
    }
    
    // validate sizes
    if(!product.sizes || !product.sizes[0]?.id){
        errors.sizes = "Need atleast one size"
    }else{
        errors.sizes = ""
    }
    

    // validate brand
    if(!product.brand){
        errors.brand = "Required"
    } else{
        errors.brand = ""
    }

    // validate category
    if(!product.category){
        errors.category = "Required"
    } else{
        errors.category = ""
    }

    console.log(product.images);
    
    //validate image
    if(product.images[0] === undefined){
        errors.images = "Add Atleast 1 image"
    } else{
        errors.images
    }

    return errors
}