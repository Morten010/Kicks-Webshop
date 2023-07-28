import { Product, ProductImage } from "@prisma/client";

export type ContainerProps = {
    children: React.ReactNode;
}

export type DropDownItemProps = {
    title: string
    children: React.ReactNode
}

export type ProductDetailsProps = {
    params: {
        slug: string
    }
}

export type ProductProps = {
    name?: string
    slug?: string
    desc?: string
    price?: number
    brandId?: number
}

export type userProps = {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password?: string;
    updatedAt?: Date;
    createdAt?: Date;
}

export type CartProduct = Product & {
    amount: number
    productImage: ProductImage[]
    size: number
}
