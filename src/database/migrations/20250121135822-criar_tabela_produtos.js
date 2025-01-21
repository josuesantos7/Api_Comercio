'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'produtos',
      {
        id_produto: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        descricao_produto: {
          allowNull: false,
          type: Sequelize.STRING
        },
        preco_unitario: {
          allowNull: false,
          type: Sequelize.DECIMAL(10,2)
        },
        categoria: {
          allowNull: false,
          type: Sequelize.STRING
        },
        qtde_estoque: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        imagem_produto: {
          type: Sequelize.BLOB,
          allowNull: false,
        },
        imagem_url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};
