import { useContext } from "react";
import { useProducts } from "../hooks/products";
import { IProduct } from "../models";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { Product } from "../components/Product";
import { CreateProduct } from "../components/CreateProduct";
import { Modal } from "../components/Modal";
import { ModalContext } from "../context/ModalContext";

const ProductsPage = () => {
  const {products, loading, error, addProduct} = useProducts();
  const {modal, open, close} = useContext(ModalContext)

  const createHandler = (product: IProduct) => {
    close();
    addProduct(product);
  };

  const closeHandler = () => {
    close();
  }

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {loading && <Loader />}
      {error && <ErrorMessage error={error}/>}
      {products.map(product => 
        <Product product={product} key={product.id}/>)
      }
      {modal && <Modal title="Create new product" onClose={closeHandler}>
        <CreateProduct onCreate={createHandler}/>
      </Modal>}
      <button 
        className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
        onClick = {() => open()}
      >+</button>
    </div>
  )
};

export default ProductsPage;
