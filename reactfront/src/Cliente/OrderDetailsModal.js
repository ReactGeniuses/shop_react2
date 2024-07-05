import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const OrderDetailsModal = ({ show, handleClose, orderDetails }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Orden</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderDetails && (
          <>
            <h5>Información de la Orden</h5>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>ID Orden</th>
                  <td>{orderDetails.order.ID_Order}</td>
                </tr>
                <tr>
                  <th>Email Usuario</th>
                  <td>{orderDetails.order.EmailUser}</td>
                </tr>
                <tr>
                  <th>Dirección</th>
                  <td>{orderDetails.order.Direccion}</td>
                </tr>
                <tr>
                  <th>Fecha de la Orden</th>
                  <td>{orderDetails.order.OrderDate}</td>
                </tr>
                <tr>
                  <th>Estado de la Orden</th>
                  <td>{orderDetails.order.StateOrder}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>{orderDetails.order.Total}</td>
                </tr>
              </tbody>
            </Table>
            <h5>Detalles de la Orden</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID Detalle</th>
                  <th>ID Orden</th>
                  <th>ID Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.details.map(detail => (
                  <tr key={detail.ID_Detail}>
                    <td>{detail.ID_Detail}</td>
                    <td>{detail.ID_Order}</td>
                    <td>{detail.ProductID}</td>
                    <td>{detail.Price}</td>
                    <td>{detail.Quantity}</td>
                    <td>{detail.SubTotal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
