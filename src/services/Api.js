import Http from "./Http";
export const getProducts = (config) => Http.get("/products", config);
export const getCategories = (config) => Http.get("/categories", config);
export const getProductsCategory = (id, config) =>
  Http.get(`/categories/${id}/products`, config);
export const getCategoryById = (id, config) =>
  Http.get(`/categories/${id}`, config);
export const getProductDetails = (id, config) =>
  Http.get(`/products/${id}`, config);
export const getCommentsProduct = (id, config) =>
  Http.get(`/products/${id}/comments`, config);
export const createCommentProduct = (id, data) =>
  Http.post(`/products/${id}/comments`, data);

export const order = (data) => Http.post(`/order`, data);
export const getOrder = (id) => Http.get(`/customers/${id}/orders`, id);
export const getOrderDetails = (id) => Http.get(`/customer/orders/${id}`, id);
export const orderCanceled = (id) =>
  Http.get(`/customer/orders/${id}/canceled`);

export const getSlider = (config) => Http.get(`/sliders`, config);
export const getBanner = (config) => Http.get(`/banners`, config);
export const registerCustomer = (data) =>
  Http.post(`/customers/register`, data);
export const loginCustomer = (data) => Http.post(`/customers/login`, data);
export const updateCustomer = (data, id) =>
  Http.post(`/customers/${id}/update`, data, id);
export const refreshToken = () => Http.get(`/customer/refreshtoken`);
