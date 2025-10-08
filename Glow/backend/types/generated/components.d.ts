import type { Schema, Struct } from '@strapi/strapi';

export interface ProductCartItem extends Struct.ComponentSchema {
  collectionName: 'components_product_cart_items';
  info: {
    displayName: 'cartItem';
  };
  attributes: {
    productId: Schema.Attribute.String;
    quantity: Schema.Attribute.Integer;
    variantIndex: Schema.Attribute.Integer;
  };
}

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_variants';
  info: {
    displayName: 'Variant';
  };
  attributes: {};
}

export interface ProductcartProduct extends Struct.ComponentSchema {
  collectionName: 'components_productcart_products';
  info: {
    displayName: 'product';
  };
  attributes: {
    productId: Schema.Attribute.BigInteger;
    quantity: Schema.Attribute.BigInteger;
    variantIndex: Schema.Attribute.BigInteger;
  };
}

export interface VariantsVariantProduct extends Struct.ComponentSchema {
  collectionName: 'components_variants_variant_products';
  info: {
    displayName: 'VariantProduct';
  };
  attributes: {
    brand: Schema.Attribute.String;
    brand_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    color: Schema.Attribute.String;
    price: Schema.Attribute.String;
    product_img: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Product_size: Schema.Attribute.Enumeration<['Sm', 'Md', 'Lg', 'XL']>;
    scent: Schema.Attribute.String;
    sku: Schema.Attribute.String;
    specific_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    stock: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.cart-item': ProductCartItem;
      'product.variant': ProductVariant;
      'productcart.product': ProductcartProduct;
      'variants.variant-product': VariantsVariantProduct;
    }
  }
}
