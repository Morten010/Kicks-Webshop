import { Product, ProductImage } from "@prisma/client";

type ContainerProps = {
    children: React.ReactNode;
}

type DropDownItemProps = {
    title: string
    children: React.ReactNode
}

type ProductDetailsProps = {
    params: {
        slug: string
    }
}

type ProductProps = {
    name?: string
    slug?: string
    desc?: string
    price?: number
    brandId?: number
}

type userProps = {
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
