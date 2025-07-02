import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../utils/constants";
export const useBackToShop = () => {
  const navigate = useNavigate();
  return () => {
    navigate(API_ROUTES.PRODUCTS, { replace: true });
  };
};
