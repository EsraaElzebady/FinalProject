import React, { useEffect } from 'react'
import { fetchData } from '../../Store/fetchData';
import { useLoadStore } from '../../Store/useLoadStore';
import { setApiRes } from '../../Store/setApiRes';
import { sortProducts } from '../../Store/Functions/sortProducts';
import { Autoplay, Pagination } from 'swiper/modules';
import { SwiperSlide ,Swiper} from 'swiper/react';
import './FeaturedProducts.css'
import { getImageUrl } from '../../Store/Functions/getImageUrl';
import { Link } from 'react-router';
import { API_URL } from '../../Data/Data';
import ProductStatusBadge from '../../Components/UI/ProductStatusBadge';


export default function FeaturedProducts() {
    const {setIsLoading} = useLoadStore()
    const { products , setProducts}=setApiRes()    
   useEffect(() => {
    const getFeaturedProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetchData('products',{populate:["product_image","hoverimage", "VariantProduct"],
            pagination : { page: 1, pageSize: 8 }
        });
            if (response && response.data) {
                let items = response.data;
                items =sortProducts(items, 'asc');
                setProducts(items);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching featured products:', error);
        }
        finally{
            setIsLoading(false);
        }
        };
        getFeaturedProducts();
    }, [setIsLoading, setProducts]);
    return (
        <>
        <div className="featured-products-section my-20 px-5 md:px-10 lg:px-20">
            <h3 className='text-center mt-5 font-normal text-[40px]'>Our Featured Products</h3>
            <p className='text-center text-[18px] text-muted mb-15 mt-3'>Get the skin you want to feel

</p>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
           
            modules={[Autoplay]}
            className="mySwiper"
          >
            {
                products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <Link to={`/shop/${product.documentId}`}>
                        <div className="product-card">
                            <img
                                src={getImageUrl( product.product_image)}
                                alt={product.product_name}
                                className="product-image mb-3 relative"
                                onMouseEnter={(e) => {
                                    if (product.hoverimage) {
                                      e.currentTarget.src = getImageUrl(product.hoverimage);
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (product.product_image) {
                                      e.currentTarget.src = getImageUrl(product.product_image);
                                    }
                                  }}
                            
                            />

                            {product.product_status && <ProductStatusBadge status={product.product_status} />}     
                            {product.deletedprice && <span className="line-through pe-2 text-gray-500  text-[14px]">{product.deletedprice }</span>}
                            <span className="product-price  text-[15px] font-semibold">{product.totalprice }</span>
                            <h3 className="product-name font-semibold text-[16px] ">{product.product_name}</h3>
                        </div>
                        </Link>
                    </SwiperSlide>
                ))
            }
           
          
          </Swiper>
        </div>
        </>
      );
}
