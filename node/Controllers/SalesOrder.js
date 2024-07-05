// controllers/SalesOrderController.js
import SalesOrder from '../Models/SalesOrder.js';
import { Op } from 'sequelize';
import db from '../DataBase/db.js'; // Importar el archivo db.js para acceder a sequelize

export const getAllSalesOrders = async (req, res) => {
  try {
    console.log("all normal");

    const salesOrders = await SalesOrder.findAll({
      order: [['OrderDate', 'DESC']] // Ordenar por fecha en orden descendente
    });
    res.json(salesOrders);
  } catch (error) {
    console.error('Error al obtener las órdenes de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createSalesOrder = async (req, res) => {
  try {
    const { EmailUser, Nombre, Direccion } = req.body;

    console.log("tengo datos");
    console.log(EmailUser, Nombre, Direccion);


    const newSalesOrder = await SalesOrder.create({ 
      EmailUser, 
      Nombre, 
      Direccion, 
      OrderDate: new Date(), 
      StateOrder: "proceso",
      Total: 0
    });

    console.log("Lo logre");
    console.log(newSalesOrder.ID_Order);

    res.status(201).json({ ID_Order: newSalesOrder.ID_Order });
    
  } catch (error) {
    console.error('Error al crear la orden de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
export const getSalesOrderById = async (req, res) => {
  try {
    //const id = parseInt(req.params.id, 10);
    console.log("por id");
    const id = parseInt(req.params.id, 10);
    console.log(id);
    const order = await SalesOrder.findByPk(id);
    console.log(order);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSalesOrder = async (req, res) => {
  try {
    console.log("update");

    const { id } = req.params;
    const { StateOrder } = req.body; // Solo necesitamos actualizar StateOrder
    const salesOrder = await SalesOrder.findByPk(id);
    if (salesOrder) {
      salesOrder.StateOrder = StateOrder; // Actualizamos el campo StateOrder
      await salesOrder.save();
      res.json(salesOrder);
    } else {
      res.status(404).json({ message: 'Orden de venta no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la orden de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteSalesOrder = async (req, res) => {
  try {
    console.log("delete");

    const { id } = req.params;
    const salesOrder = await SalesOrder.findByPk(id);
    if (salesOrder) {
      await salesOrder.destroy();
      res.json({ message: 'Orden de venta eliminada' });
    } else {
      res.status(404).json({ message: 'Orden de venta no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la orden de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
// Buscar órdenes de ventas con criterios dinámicos
export const searchSalesOrders = async (req, res) => {
  try {
    console.log("Parámetros recibidos:", req.query);

    const { type, query, startDate, endDate } = req.query;
    let searchCondition = {};

    if (type === 'RangoFecha') {
      // Si el tipo es OrderDate, esperar startDate y endDate
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'startDate y endDate son requeridos para búsquedas por OrderDate' });
      }

      // Verificar que las fechas sean válidas
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ message: 'Los valores de fecha deben ser válidos' });
      }

      searchCondition = {
        OrderDate: {
          [Op.between]: [start, end]
        }
      };
    } else {
      // Obtener `query` para tipos de búsqueda distintos de `OrderDate`
      if (!query) {
        return res.status(400).json({ message: 'query es requerido para búsquedas que no sean por OrderDate' });
      }

      if (type === 'ID_Order') {
        // Convertir el valor de búsqueda a entero para evitar errores de conversión
        const id = parseInt(query, 10);
        if (!isNaN(id)) {
          searchCondition = { ID_Order: id };
        } else {
          return res.status(400).json({ message: 'El valor de ID_Order debe ser un número' });
        }
      } else if (type === 'EmailUser') {
        searchCondition = { EmailUser: { [Op.like]: `%${query}%` } };
      } else if (type === 'OrderDate') {
        // Asegurarse de que la fecha es válida
        const date = new Date(query);
        if (!isNaN(date.getTime())) {
          searchCondition = { OrderDate: date };
        } else {
          return res.status(400).json({ message: 'El valor de OrderDate debe ser una fecha válida' });
        }
      } else if (type === 'StateOrder') {
        searchCondition = { StateOrder: { [Op.like]: `%${query}%` } };
      } else {
        return res.status(400).json({ message: 'Tipo de búsqueda no válido' });
      }
    }

    const salesOrders = await SalesOrder.findAll({ where: searchCondition });
    res.json(salesOrders);
  } catch (error) {
    console.error('Error al buscar órdenes de venta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los productos de la wishlist de un usuario
export const getAllOrders = async (req, res) => {
  try {
    console.log("por email");

    const { email } = req.params;
    const orders = await SalesOrder.findAll({
      where: { EmailUser: email },
      order: [['OrderDate', 'DESC']] // Ordenar por fecha en orden descendente
    });
    res.status(200).json(orders); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getOrderReceipt = async (req, res) => {
  const { id } = req.params;
  console.log("detalles");

  console.log(id);
  try {
    // Ejecutar el procedimiento almacenado utilizando db.query y el método correspondiente
    const orderReceipt = await db.query(`EXEC GetOrderReceipt @ID_Order = :id`, {
      replacements: { id: parseInt(id, 10) },
      type: db.QueryTypes.SELECT // Usa db.QueryTypes en lugar de SalesOrder.QueryTypes
    });

    // La consulta devuelve un array de resultados, por lo que separamos los datos de la orden y los detalles
    const order = orderReceipt.filter(row => row.ID_Order)[0];
    const orderDetails = orderReceipt.filter(row => row.ID_Detail);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.status(200).json({
      order: order,
      orderDetails: orderDetails
    });
  } catch (error) {
    console.error('Error al obtener el recibo de la orden:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};