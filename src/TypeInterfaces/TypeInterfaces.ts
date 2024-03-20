import { Document } from "mongodb";

export interface ImageDocument extends Document {
    data: Buffer;
    contentType: string;
  }

export type CommentType = {
    commentId: string;
    authorId: string;
    content: string;
    createdDate: string;
    subComments: string[];
    level: number;
};

export type AddressType = {
    // firstName: string;
    // lastName: string;
    houseno: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    // country: string;
    postalCode: string;
}

export type UserType = {
    username: string;
    pic?: string; // URL of the image
    email: string;
    password: string; // Hash and salt password before storing
    profileCompletion: boolean; // In case if user sign up but not sharing address and all.
    addresses: AddressType[];
    phone?: string;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
    favourites: string[]; // FavouriteId[]
    cart: string[]; // CartId[]
    orders: string[]; // OrderId[]
    comments: string[]; // CommentId[]
}

interface Variation {
    name: string; // This will be "Size"
    variations: {
        value: number;
        stock: number;
        price: number;
    }[];
}

export type ProductType = {
    productId: string;
    img?: string[]; // URLs of the images
    name: string;
    desc: string;
    companyId: string; // Contains the company Id.
    tags: string[];

    variations: Variation;
    colors: string[];
    createdAt?: Date;
    updatedAt?: Date;

    comments?: string[]; // CommentId[]
    offers?: string[]; // OfferId[]
};

export type FavouritesType = {
    favouriteId: string;
    userId: string;
    products: {
        productId: string;
        variations?: string;
        qty: number;
    }[];
}

export type CartType = {
    cartId: string;
    userId: string;
    products: {
        productId: string;
        variations?: string;
        qty: number;
    }[];
};

export type OrderType = {
    orderId: string;
    userId: string;
    products: {
        productId: string;
        variations?: string;
        qty: number;
    }[];
    offersApplied: string[]; // Offers applied at the checkout time offerId[]
    price: number;
    createdAt: Date;
    status: string;
};