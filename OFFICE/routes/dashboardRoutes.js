const express = require("express");
const router = express.Router();
const Dashboard = require("../models/Dashboard"); // model we'll create

// ✅ Get all user dashboard data
router.get("/:userId", async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ userId: req.params.userId });
    if (!dashboard) return res.json({ collections: [], environments: [], history: [] });
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new collection
router.post("/:userId/collection", async (req, res) => {
  const { name } = req.body;
  try {
    let dashboard = await Dashboard.findOne({ userId: req.params.userId });
    if (!dashboard) dashboard = new Dashboard({ userId: req.params.userId });
    dashboard.collections.push({ name, requests: [] });
    await dashboard.save();
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add environment
router.post("/:userId/environment", async (req, res) => {
  const { name, variables } = req.body;
  try {
    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { environments: { name, variables } } },
      { upsert: true, new: true }
    );
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Save request history
router.post("/:userId/history", async (req, res) => {
  const { method, url, response } = req.body;
  try {
    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { history: { method, url, response, time: new Date() } } },
      { upsert: true, new: true }
    );
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
