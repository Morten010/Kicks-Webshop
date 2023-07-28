"use server"
import { db } from "../db"

type SizesProps = {
    id: number;
    size: string;
    quantity: string;
}[]

export const updateSize = async (sizes: SizesProps) => {

    //loop through all changes and update the data
    const res = await Promise.all(
        sizes.map(async (item) => {
            // remove id from the object
            const {id, ...WithoutId} = item
            const answer = await db.size.updateMany({
                where: {
                    id: id
                },
                data: {
                    size: parseInt(WithoutId.size),
                    quantity: parseInt(WithoutId.quantity),
                },
            })
            //return update response to res array
            return answer
        }),
        
    )

    return res
}