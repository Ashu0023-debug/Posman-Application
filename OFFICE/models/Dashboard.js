const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  collections: [
    {
      name: String,
      requests: [String],
    },
  ],
  environments: [
    {
      name: String,
      variables: Object,
    },
  ],
  history: [
    {
      method: String,
      url: String,
      response: String,
      time: Date,
    },
  ],
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
