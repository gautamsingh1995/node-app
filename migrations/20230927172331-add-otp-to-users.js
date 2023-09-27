'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'otp', {
      type: Sequelize.STRING, // Adjust the data type based on your requirements
      allowNull: true, // Set to false if OTP is required
      defaultValue: null, // Default value for existing records (null for now)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'otp');
  }
};
