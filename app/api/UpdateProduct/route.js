import { addToDoc } from "@/app/myCodes/Database";
import { filterObject } from "@/app/myCodes/Util";



export async function POST(request) {
    const data = await request.json();
    const { productData } = data
    const filterFalsey = filterObject(productData, (p) => p)
    delete filterFalsey?.created
    delete filterFalsey?.object
    delete filterFalsey?.type
    delete filterFalsey?.id
    delete filterFalsey?.updated




    console.log(productData)
    await addToDoc('Services', productData.id, filterFalsey)


    /*  console.log(product)
     if (priceData.length >= 1) {
         priceData.forEach(async (data, index) => {
 
             if (true) {
                 console.log(data)
 //TODO FIX THIS SO ALL OLD PRICE ARE DELETED AND NEW ONES MADE
                 const price = await stripe.prices.update(product.default_price,{
                     product: product.id,
                     metadata: {
                         price: Price,
                         for: product.name.replace(/\s/g, ''),
                         qty: QYT
 
                     },
                     nickname: data,
                     currency: 'USD',
                     unit_amount: Price * 100,
                 })
 
                 if (index == 0) {
                     stripe.products.update(product.id, {
                         default_price: price.id
                     })
                 }
             }
         })
 
     } else {
         const defaultPrice = await stripe.prices.update(product.default_price,{
             product: product.id,
             metadata: {
                 price: product.metadata?.price,
                 for: product.name.replace(/\s/g, ''),
                 qty: product.metadata?.inventory
 
             },
             nickname: product.name,
             currency: 'USD',
             unit_amount: Price * 100,
         })
         stripe.products.update(product.id, {
             default_price: defaultPrice.id
         })
     }
 
  */




}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */