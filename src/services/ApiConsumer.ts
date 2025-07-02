import { API_ROUTES } from "../utils/constants";
import { getAxiosInstance } from "./axios";

export const fetchProducts = async () => {
  const response = await getAxiosInstance().get(API_ROUTES.PRODUCTS);
  return response.data;
};
