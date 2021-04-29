import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import slugify from "slugify";

class Customer {
  initSchema() {
    const schema = new Schema(
      {
        username: String,
        name: String,
        address: String,
        birthdate: Date,
        emai: String,
        active: Boolean,
        accounts: Array,
        tier_and_details: mongoose.Schema.Types.Mixed,
      },
      { timestamps: true }
    );
    schema.pre(
      "save",
      function (next) {
        let customer = this;
        if (!customer.isModified("username")) {
          return next();
        }
        customer.slug = slugify(customer.username, "_");
        console.log("set slug", customer.slug);
        return next();
      },
      function (err) {
        next(err);
      }
    );
    schema.plugin(uniqueValidator);
    mongoose.model("customers", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("customers");
  }
}

export default Customer;
