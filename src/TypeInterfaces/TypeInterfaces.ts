

export type CommentType = {
    commentId: string;
    userId: string;
    content: string;
    createdDate: string;
    subComments: string[];
    level: number;
};

export type AddressType = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    country: string;
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

export type ProductType = {
    productId: string;
    img?: string[]; // URLs of the images
    name: string;
    desc: string;
    companyId: string; // Contains the company Id.
    tags: string[];

    variations: { type: string }[]; // Can be used via JSON.parse() and JSON.stringify()
    createdAt: Date;
    updatedAt: Date;

    comments?: string[]; // CommentId[]
    offers?: string[]; // OfferId[]
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