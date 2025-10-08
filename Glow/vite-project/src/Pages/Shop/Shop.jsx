import 'animate.css';
import ShopProducts from './ShopProducts';
import Breadcrumbs from '../../Components/UI/Breadcrumbs';
export default function Shop() {
  
  return (
  
    <div className="min-h-screen ">
      <Breadcrumbs />
      <h1 className="text-4xl font-[500] text-center py-10">Products</h1>
 
      <ShopProducts />
    </div>
  );
}
