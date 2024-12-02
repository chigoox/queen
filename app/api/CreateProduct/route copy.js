import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";



export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let { productData } = data

    const { productName, productDesc, price, img, productFeat, isNew, isBestSelling, category } = productData




    const product = await stripe.products.create({
        name: productName, //string
        description: productDesc,  //string
        metadata: {
            category: category,
            price: price,
            isnew: isNew ? isNew : false,
            isBestSeller: isBestSelling ? isBestSelling : false,
        }, //object
        images: img ? img : [], //array
        features: [], //array
    });


   



    return NextResponse.json(product)
}



/*  line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ], */