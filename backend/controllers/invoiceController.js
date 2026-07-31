const Order = require("../models/Order");
const PDFDocument = require("pdfkit");

// Generate Invoice PDF
const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`,
    );

    doc.pipe(res);

    doc.fontSize(25).text("CartNova Invoice", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.text(`Date: ${order.createdAt.toDateString()}`);
    doc.text(`Payment Status: ${order.paymentStatus}`);

    doc.moveDown();

    doc.fontSize(16).text("Customer Details");
    doc.fontSize(12).text(`Name: ${order.shippingAddress.fullName}`);
    doc.text(`Phone: ${order.shippingAddress.phone}`);
    doc.text(`Address: ${order.shippingAddress.address}`);

    doc.moveDown();

    doc.fontSize(16).text("Products");

    order.items.forEach((item) => {
      doc
        .fontSize(12)
        .text(
          `${item.product.name}  x ${item.quantity}  ₹${item.product.price}`,
        );
    });

    doc.moveDown();

    doc.fontSize(16).text(`Total Amount: ₹${order.totalPrice}`);

    doc.moveDown();

    doc.fontSize(12).text("Thank you for shopping with Cartify ❤️");

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateInvoice,
};
