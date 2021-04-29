import mongoose from "mongoose";

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(query) {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectID(query._id);
      } catch (error) {
        console.log("Not able to generate mongoose id with content", query._id);
      }
    }

    try {
      let items = await this.model.find(query).skip(skip).limit(limit);
      let total = await this.model.count();

      return {
        error: false,
        statusCode: 200,
        data: items,
        total,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

  async insert(data) {
    try {
      let item = await this.model.create(data);
      if (item) {
        return {
          error: false,
          item,
        };
      }
    } catch (error) {
      console.log("error:", error);
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Not able to create item",
        errors: error.errrors,
      };
    }
  }

  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        item,
      };
    } catch (err) {
      return {
        error: true,
        statusCode: 500,
        error,
      };
    }
  }

  async delete(id) {
    try {
      let item = await this.mode.findByIdAndDelete(id);
      if (!item) {
        return {
          error: true,
          statusCode: 404,
          message: "Item not found",
        };
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        error,
      };
    }
  }
}

export default Service;
