const { sequelize } = require("../config/db");

const User = require("./User");
const Task = require("./task");

// Associations
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced successfully");
  } catch (error) {
    console.error("❌ Model sync failed:", error.message);
  }
};

module.exports = { sequelize, User, Task, syncDB };
