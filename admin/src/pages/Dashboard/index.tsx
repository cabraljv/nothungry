import React, { useState, useEffect } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import api from '../../services/api';
import { Container } from './styles';
import theme from '../../styles/themes';

interface ChartItem {
  day: string;
  orders: number;
  earnings: number;
}
interface Product {
  products: {
    id: string;
    name: string;
    ordedrs: number;
    type: number;
  };
}
interface APIResponse {
  per_day: ChartItem[];
  total_earnings: number;
  total_orders: 1;
  products: Product[];
}

const Dashboard: React.FC = () => {
  const [ordersDay, setOrdersDay] = useState<ChartItem[]>([]);
  const [productsOrders, setProductsOrders] = useState<Product[]>();
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [earningsTotal, setEarningsTotal] = useState('R$ 0,00');

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get<APIResponse>('/dashboard');

        setOrdersDay(response.data.per_day);
        setProductsOrders(response.data.products);
        setEarningsTotal(
          `R$ ${response.data.total_earnings.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
          })}`
        );
        setOrdersTotal(response.data.total_orders);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <Container>
      <h1>Painel de controle</h1>
      <main>
        <section>
          <div className="chart-container">
            <h3>Vendas por dia</h3>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    itemStyle={{ color: theme.dark_gray }}
                    labelStyle={{ color: theme.dark_gray }}
                  />
                  <Line
                    dataKey="orders"
                    strokeWidth={4}
                    name="Pedidos"
                    stroke={theme.primary}
                    activeDot={{ r: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <h3>Total de pedidos atendidos deste mês:</h3>
            <p>{ordersTotal}</p>
          </div>
        </section>
        <section>
          <div className="card">
            <h3>Faturamento total deste mês:</h3>
            <p>{earningsTotal}</p>
          </div>
          <div className="chart-container">
            <h3>Faturamento por dia</h3>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    allowDecimals={false}
                    tickFormatter={(e) => `R$${e}`}
                  />
                  <Tooltip
                    itemStyle={{ color: theme.dark_gray }}
                    labelStyle={{ color: theme.dark_gray }}
                    formatter={(e: number) => `R$${e}`}
                  />
                  <Line
                    dataKey="earnings"
                    strokeWidth={4}
                    name="Faturamento"
                    stroke={theme.primary}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
        <section>
          <div>
            <div className="chart-container">
              <h3>Vendas por produto</h3>
              <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productsOrders}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      itemStyle={{ color: theme.dark_gray }}
                      labelStyle={{ color: theme.dark_gray }}
                    />
                    <Bar dataKey="orders" fill={theme.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
};

export default Dashboard;
