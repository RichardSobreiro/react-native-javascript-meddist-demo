/** @format */

import axios from "axios";

const BACKEND_URL = "https://webapp-brzs-meddist-profile.azurewebsites.net";

export const fetchMedicines = async (name) => {
  let url = `${BACKEND_URL}/products`;
  url += name ? `?name_like=${name}` : "";
  const response = await axios.get(url);

  const medicines = [];

  for (const key in response.data) {
    const medicineItem = {
      id: response.data[key].id,
      name: response.data[key].name,
      description: response.data[key].description,
      price: response.data[key].price,
    };
    medicines.push(medicineItem);
  }

  return medicines;
};

export const fetchOrders = async (name) => {
  let url = `${BACKEND_URL}/orders`;
  url += name ? `?name_like=${name}` : "";
  const response = await axios.get(url);

  const orders = [];

  for (const key in response.data) {
    const orderItem = {
      id: response.data[key].id,
      products: response.data[key].products,
      totalPrice: response.data[key].totalPrice,
      orderedAt: response.data[key].orderedAt,
    };
    orders.push(orderItem);
  }

  return orders;
};
