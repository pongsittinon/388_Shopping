import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

// สินค้าตัวอย่างพร้อมรูปภาพและหมวดหมู่
const products = [
  { id: 1, name: 'เสื้อยืด', price: 250, image: 'https://i.pinimg.com/236x/6d/53/ac/6d53acc61e6e0ad8d496a801f2312739.jpg', category: 'เสื้อผ้า' },
  { id: 2, name: 'กางเกงยีนส์', price: 990, image: 'https://i.pinimg.com/236x/38/ee/3a/38ee3a120a26729d3bcf68a34d6a4159.jpg', category: 'เสื้อผ้า' },
  { id: 3, name: 'รองเท้าผ้าใบ', price: 1590, image: 'https://i.pinimg.com/236x/ec/76/15/ec7615cdd0ad2098bfe35f43f8e0e12c.jpg', category: 'รองเท้า' },
  { id: 4, name: 'หมวกแก๊ป', price: 350, image: 'https://i.pinimg.com/236x/a1/74/1d/a1741dd5bec48348d0855c14e85ea4d4.jpg', category: 'เครื่องประดับ' },
  { id: 5, name: 'กระเป๋าสะพาย', price: 890, image: 'https://i.pinimg.com/236x/8c/04/94/8c04945026cff3d6949027c802454980.jpg', category: 'กระเป๋า' },
  { id: 6, name: 'นาฬิกาข้อมือ', price: 2990, image: 'https://i.pinimg.com/236x/94/bd/aa/94bdaa972183c52213d817e07f889467.jpg', category: 'เครื่องประดับ' },
  { id: 7, name: 'แว่นตากันแดด', price: 590, image: 'https://i.pinimg.com/236x/dc/7b/40/dc7b401eb5979717b124acfa494d14ba.jpg', category: 'เครื่องประดับ' },
  { id: 8, name: 'เข็มขัดหนัง', price: 450, image: 'https://i.pinimg.com/236x/87/99/ab/8799abe807df0e8ba6d2502b880d6e45.jpg', category: 'เครื่องประดับ' },
  { id: 9, name: 'ต่างหู', price: 290, image: 'https://i.pinimg.com/236x/76/ee/0a/76ee0a8b347c732a2b5911fcb838013c.jpg', category: 'เครื่องประดับ' },
  { id: 10, name: 'สร้อยคอ', price: 790, image: 'https://i.pinimg.com/236x/4b/4e/9d/4b4e9d3474c6b7f4e502a2cdaa7123a1.jpg', category: 'เครื่องประดับ' },
];

// คูปองส่วนลด
const coupons = [
  { code: 'SAVEMYMONEY10', discount: 0.1 },
  { code: 'SAVEMYMONEY20', discount: 0.2 },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  const categories = ['ทั้งหมด', ...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory === 'ทั้งหมด'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode);
    if (coupon) {
      setAppliedDiscount(coupon.discount);
    } else {
      alert('คูปองไม่ถูกต้อง');
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = subtotal * appliedDiscount;
    const shippingCost = 100;
    return (subtotal - discountAmount + shippingCost).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">ออนไลน์แฟชั่น</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">หมวดหมู่สินค้า</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-indigo-500 hover:bg-indigo-100'
                  } transition duration-300`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">สินค้าของเรา</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.price} บาท</p>
                  <p className="text-sm text-indigo-500 mb-4">{product.category}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300 flex items-center justify-center"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">ตะกร้าสินค้า</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b py-4">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.price} บาท</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 bg-gray-200 rounded-full">
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 bg-gray-200 rounded-full">
                        <Plus size={16} />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="รหัสคูปอง"
                      className="border p-2 rounded flex-grow"
                    />
                    <button 
                      onClick={applyCoupon}
                      className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                      ใช้คูปอง
                    </button>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded">
                    <p className="flex justify-between"><span>ส่วนลด:</span> <span>{(appliedDiscount * 100).toFixed(0)}%</span></p>
                    <p className="flex justify-between"><span>ค่าจัดส่ง:</span> <span>100 บาท</span></p>
                    <p className="text-xl font-bold mt-2 flex justify-between"><span>ยอดรวมทั้งหมด:</span> <span>{calculateTotal()} บาท</span></p>
                  </div>
                  
                  <button className="w-full bg-indigo-500 text-white px-4 py-3 rounded mt-4 hover:bg-indigo-600 transition duration-300 text-lg font-semibold">
                    ดำเนินการสั่งซื้อ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;