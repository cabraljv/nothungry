/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useEffect, useState } from 'react';

import { MdEdit, MdLibraryAdd } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container } from './styles';
import api from '../../services/api';
import Modal from '../../components/Modal';

interface IProduct {
  id?: string;
  name: string;
  description: string;
  img_path: string;
  price: number;
  type: number;
  image?: File;
  created_at: Date;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [modalEdit, setModalEdit] = useState<IProduct | null>(null);
  const [modalDelete, setModalDelete] = useState<IProduct | null>(null);
  const [addProduct, setAddProduct] = useState<IProduct>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const getProducts = useCallback(async () => {
    const response = await api.get<IProduct[]>('/product');
    if (response.status === 200) {
      setProducts(response.data);
    }
  }, []);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleInputImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        const aux = modalEdit;
        // eslint-disable-next-line prefer-destructuring
        if (aux) aux.image = e.target.files[0];
        setModalEdit(aux);
      }
    },
    [modalEdit]
  );
  const handleInputAddImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        const aux = addProduct;
        // eslint-disable-next-line prefer-destructuring
        if (aux) aux.image = e.target.files[0];
        setAddProduct(aux);
      }
    },
    [addProduct]
  );
  const handleInputCurrency = (e: string) =>
    parseFloat(e.replace('R$', '').replace('.', '').replace(',', '.'));

  const handleEditProduct = useCallback(async () => {
    if (modalEdit === null) {
      toast('Erro ao editar produto', { type: 'error' });
      return;
    }
    const product = products.find((item) => item.id === modalEdit.id);
    if (!product) {
      toast('Erro ao editar produto', { type: 'error' });
      return;
    }
    let data = new FormData();
    if (product.id) data.append('id', product.id);
    if (product.name !== modalEdit.name) data.append('name', modalEdit.name);
    if (product.description !== modalEdit.description)
      data.append('description', modalEdit.description);
    if (product.price !== modalEdit.price)
      data.append('price', `${modalEdit.price}`);
    if (modalEdit.image) data.append('image', modalEdit.image);

    try {
      await api.put('/product', data);
      toast('Produto atualizado com sucesso!', { type: 'success' });
      setModalEdit(null);
      getProducts();
    } catch (error) {
      toast(error.data, { type: 'error' });
      setModalEdit(null);
    }
  }, [modalEdit, products, getProducts]);
  const handleAddProduct = useCallback(async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      type: Yup.number().required(),
    });
    if (!(await schema.isValid(addProduct))) {
      toast('Preencha todos os campos corretamente', { type: 'error' });
      return;
    }
    if (!addProduct) {
      toast('Erro ao editar produto', { type: 'error' });
      return;
    }
    let data = new FormData();
    data.append('name', addProduct.name);
    data.append('description', addProduct.description);
    data.append('price', `${addProduct.price}`);
    data.append('type', `${addProduct.type || 1}`);

    if (addProduct.image) data.append('image', addProduct.image);

    try {
      await api.post('/product', data);
      toast('Produto adicionado com sucesso', { type: 'success' });
      setAddProduct(undefined);
      getProducts();
    } catch (error) {
      toast(error.data, { type: 'error' });
      setAddProduct(undefined);
    }
  }, [addProduct, getProducts]);

  const currencyMask = createNumberMask({
    prefix: 'R$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2,
    integerLimit: 7,
    allowNegative: false,
    allowLeadingZeroes: false,
  });

  const handleProductDelete = useCallback(async () => {
    if (modalDelete === null) return;
    try {
      const response = await api.delete(`/product/${modalDelete.id}`);
      if (response.status === 200) {
        toast('Produto apagado com sucesso', { type: 'success' });
        getProducts();
        setModalDelete(null);
      }
    } catch (error) {
      toast(error, { type: 'error' });
      setModalDelete(null);
    }
  }, [modalDelete, getProducts]);

  return (
    <Container>
      <header>
        <h2>Produtos</h2>
        <button
          type="button"
          onClick={() => setAddProduct({ type: 1 } as IProduct)}
        >
          <p>
            <MdLibraryAdd size={20} /> <strong>Adicionar produto</strong>
          </p>
        </button>
      </header>
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
                <button type="button" onClick={() => setModalEdit(item)}>
                  <MdEdit />
                </button>
                <button type="button" onClick={() => setModalDelete(item)}>
                  <IoMdTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={modalDelete !== null}>
        <div className="modal-content">
          <p>
            Você deseja remover <strong>{modalDelete?.name}</strong> ?
          </p>
          <div className="buttons">
            <button type="button" onClick={() => setModalDelete(null)}>
              Cancelar
            </button>
            <button type="button" onClick={handleProductDelete}>
              Remover
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={modalEdit !== null}>
        <div className="modal-edit-content">
          <h3>Editar</h3>
          <form>
            <div className="image-preview">
              <img
                src={imagePreview || modalEdit?.img_path}
                alt={modalEdit?.name}
              />
              <label htmlFor="image">Alterar Imagem</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleInputImage}
              />
            </div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={modalEdit?.name}
              onChange={(e) =>
                modalEdit &&
                setModalEdit({ ...modalEdit, name: e.target.value })
              }
            />
            <label htmlFor="description">Descrição:</label>
            <textarea
              name="description"
              id="description"
              value={modalEdit?.description}
              onChange={(e) =>
                modalEdit &&
                setModalEdit({ ...modalEdit, description: e.target.value })
              }
            />
            <label htmlFor="price">Preço:</label>
            <MaskedInput
              mask={currencyMask}
              value={`R$${modalEdit?.price.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })}`}
              onChange={(e) =>
                modalEdit &&
                setModalEdit({
                  ...modalEdit,
                  price: handleInputCurrency(e.target.value),
                })
              }
            />
          </form>
          <div className="buttons">
            <button type="button" onClick={() => setModalEdit(null)}>
              Cancelar
            </button>
            <button type="button" onClick={handleEditProduct}>
              Editar
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={!!addProduct}>
        <div className="modal-edit-content">
          <h3>Adicionar Produto</h3>
          <form>
            <div className="image-preview">
              {imagePreview && (
                <img src={imagePreview} alt={addProduct?.name} />
              )}
              <label htmlFor="add-image">Alterar Imagem</label>
              <input
                type="file"
                id="add-image"
                name="add-image"
                onChange={handleInputAddImage}
              />
            </div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="add-name"
              name="add-name"
              value={addProduct?.name || ''}
              onChange={(e) =>
                addProduct &&
                setAddProduct({ ...addProduct, name: e.target.value })
              }
            />
            <label htmlFor="add-description">Descrição:</label>
            <textarea
              id="description"
              name="add-description"
              value={addProduct?.description || ''}
              onChange={(e) =>
                addProduct &&
                setAddProduct({ ...addProduct, description: e.target.value })
              }
            />
            <label htmlFor="add-price">Preço:</label>
            <MaskedInput
              mask={currencyMask}
              name="add-price"
              value={`R$${
                addProduct?.price
                  ? addProduct?.price.toLocaleString('pt-br', {
                      minimumFractionDigits: 2,
                    })
                  : ''
              }`}
              onChange={(e) =>
                addProduct &&
                setAddProduct({
                  ...addProduct,
                  price: handleInputCurrency(e.target.value),
                })
              }
            />
            <select
              onChange={(e) =>
                addProduct &&
                setAddProduct({
                  ...addProduct,
                  type: parseInt(e.target.value, 10),
                })
              }
            >
              <option value="1">Comida</option>
              <option value="2">Bebida</option>
            </select>
          </form>
          <div className="buttons">
            <button type="button" onClick={() => setAddProduct(undefined)}>
              Cancelar
            </button>
            <button type="button" onClick={handleAddProduct}>
              Adicionar
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default Products;
