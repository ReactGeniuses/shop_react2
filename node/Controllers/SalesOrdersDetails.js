// controllers/SalesOrdersDetailsController.js
import SalesOrdersDetails from '../Models/SalesOrdersDetails.js';
import db from "../DataBase/db.js";

export const getAllSalesOrdersDetails = async (req, res) => {
  try {
    const salesOrdersDetails = await SalesOrdersDetails.findAll();
    res.json(salesOrdersDetails);
  } catch (error) {
    console.error('Error al obtener los detalles de las órdenes de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createSalesOrdersDetails = async (req, res) => {
  try {
    const { ID_Order, ProductID, Price, Quantity } = req.body;
    console.log(ID_Order);
    const SubTotal = Price * Quantity;

    // Ejecutar el procedimiento almacenado
    await db.query(
      'EXEC InsertSalesOrderDetail :ID_Order, :ProductID, :Price, :Quantity',
      {
        replacements: { ID_Order, ProductID, Price, Quantity }
      }
    );

    // Obtener el nuevo detalle de la orden de venta para devolverlo en la respuesta
    const newSalesOrdersDetails = await SalesOrdersDetails.findOne({
      where: { ID_Order, ProductID, Price, Quantity, SubTotal }
    });

    res.status(201).json(newSalesOrdersDetails);
  } catch (error) {
    console.error('Error al crear el detalle de la orden de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const getSalesOrdersDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const salesOrdersDetails = await SalesOrdersDetails.findByPk(id);
    if (salesOrdersDetails) {
      res.json(salesOrdersDetails);
    } else {
      res.status(404).json({ message: 'Detalle de orden de venta no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el detalle de la orden de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateSalesOrdersDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { ID_Order, ProductID, Price, Quantity, SubTotal } = req.body;
    const salesOrdersDetails = await SalesOrdersDetails.findByPk(id);
    if (salesOrdersDetails) {
      salesOrdersDetails.ID_Order = ID_Order;
      salesOrdersDetails.ProductID = ProductID;
      salesOrdersDetails.Price = Price;
      salesOrdersDetails.Quantity = Quantity;
      salesOrdersDetails.SubTotal = SubTotal;
      await salesOrdersDetails.save();
      res.json(salesOrdersDetails);
    } else {
      res.status(404).json({ message: 'Detalle de orden de venta no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el detalle de la orden de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteSalesOrdersDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const salesOrdersDetails = await SalesOrdersDetails.findByPk(id);
    if (salesOrdersDetails) {
      await salesOrdersDetails.destroy();
      res.json({ message: 'Detalle de orden de venta eliminado' });
    } else {
      res.status(404).json({ message: 'Detalle de orden de venta no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el detalle de la orden de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
