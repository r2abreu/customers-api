import Controller from "./Controller";
import CustomerService from "./../services/CustomerService";
import Customer from "./../models/Customer";

const customerService = new CustomerService(new Customer().getInstance());

class CustomerController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new CustomerController(customerService);
