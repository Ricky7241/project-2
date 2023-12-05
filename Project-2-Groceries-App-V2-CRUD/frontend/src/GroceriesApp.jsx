import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
//import { products } from "./data/products";
import { useState, useEffect } from "react";
import axios from "axios" 
import InventoryForm from "./InventoryForm";

export default function GroceriesApp() {
  

  const [cartList, setCartList] = useState([]);
const [products, setProducts] = useState([]);
const [formData, setformData] =useState({
  id: "",
  productName: "", 
  brand: "",
  quantity: "",
  image: "",
  price: "",
});
const [responseData, setResponseData] = useState("")
useEffect(() => {
handleGetProducts();

}, [responseData]);
const handleGetProducts = async() =>{
  await axios.get("http://localhost:3001/products").then((response) => setProducts(response.data)
);

};
const handlePostProduct = async(product) => {
const postProduct = {
  id: product.id,
  productName: product.productName,
  brand: product.brand,
  quantity: product.quantity,
  image: product.image,
  price: product.price
}
await axios.post("http://localhost:3001/addProduct", postProduct).then(response => setResponseData(<p>{response.Data}</p>) 
);



};
const handleOnSubmit = (evt) => {
  evt.preventDefault();
  handlePostProduct(formData);
  setformData({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",    
  });
};
  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      console.log(cartList);
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };
const handleOnChange = (evt) =>{
  const fieldName = evt.target.name
  const fieldValue =evt.target.value
  setformData((prevData) => {
    return {
      ...prevData,
      id: crypto.randomUUID(),
      [fieldName]: fieldValue,

    }
  })
}




  const handleEmptyCart = () => {
    setCartList([]);
  };

  const handleRemoveItem = (id) => {
    setCartList((prevList) => {
      return prevList.filter((i) => i.id !== id);
    });
  };

  return (
    <>
      <h1>Groceries App</h1>
      <InventoryForm  formData={formData} handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
      {responseData}
      <div className="GroceriesApp-Container">
        <InventoryCard list={products} onClick={handleAddToCart} />
        <CartList
          cartList={cartList}
          onClickEmpty={handleEmptyCart}
          onClickRemove={handleRemoveItem}
        />
      </div>
    </>
  );
}
