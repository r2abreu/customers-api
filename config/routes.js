import CustomerController from "./../src/controllers/CustomerController";

export default (server) => {
  server.get(`/api/customer`, CustomerController.getAll);
  server.post(`/api/customer`, CustomerController.insert);
  server.put(`/api/customer/:id`, CustomerController.update);
  server.delete(`/api/customer/:id`, CustomerController.delete);
};
