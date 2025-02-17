import { useState } from "react";
import { IProduct } from "../models";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 4.2,
    count: 10
  }
};

interface ICreateProductProps {
  onCreate: (product: IProduct) => void
}

export const CreateProduct = ({onCreate}: ICreateProductProps) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (value.trim().length === 0) {
      setError('Please enter valid title!');
      return;
    }

    productData.title = value
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData);
    console.log('response: ', response);

    onCreate(response.data);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        value={value}
        onChange={changeHandler}
      />

      {error && <ErrorMessage error={error}/>}

      <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white hover:border-amber-500">
        Create
      </button>
    </form>
  )
};

