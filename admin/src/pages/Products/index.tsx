import React, { useEffect, useState } from 'react';

import { MdEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { Container } from './styles';
import api from '../../services/api';

interface IProduct {
  id: string;
  name: string;
  description: string;
  img_path: string;
  price: number;
  type: number;
  created_at: Date;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    async function getProducts() {
      const response = await api.get<IProduct[]>('/product');
      if (response.status === 200) {
        setProducts(response.data);
      }
    }
    getProducts();
  }, []);
  return (
    <Container>
      <h2>Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.img_path} alt={item.name} />
              </td>
              <td className="title">{item.name}</td>
              <td className="description">{item.description}</td>
              <td className="price">
                R$
                {item.price.toLocaleString('pt-br', {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td>
                <button type="button">
                  <MdEdit />
                </button>
                <button type="button">
                  <IoMdTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Products;
