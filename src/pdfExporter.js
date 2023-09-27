import jsPDF from 'jspdf';

const header = (doc, yPosition) => {
  doc.setFontSize(14);
  doc.text("Blockbustr Customer Rentals Report", 10, yPosition);
  doc.text(`Date Exported: ${new Date().toLocaleString()}`, 180, yPosition);
};

const customerDetails = (doc, yPosition, customerGroup) => {
  const { customer_id, first_name, last_name } = customerGroup[0];
  doc.text(`Customer ID: ${customer_id}`, 10, yPosition);
  doc.text(`Customer Name: ${first_name} ${last_name}`, 95, yPosition);
};

const rentalDetails = (doc, yPosition, rental) => {
  const { rental_id, rental_date, return_date, title } = rental;
  doc.text(`Title: ${title}`, 10, yPosition);
  doc.text(`Rental ID: ${rental_id}`, 90, yPosition);
  doc.text(`Rental Date: ${new Date(rental_date).toLocaleString()}`, 150, yPosition);
  doc.text(`Return Date: ${new Date(return_date).toLocaleString()}`, 220, yPosition);
};

export const exportCustomerReport = (customers) => {
  try {
    const doc = new jsPDF({ orientation: "landscape" });
    let yPosition = 20;

    header(doc, 10);

    // Group customers by customer_id
    const groupedCustomers = customers.reduce((acc, curr) => {
      (acc[curr.customer_id] = acc[curr.customer_id] || []).push(curr);
      return acc;
    }, {});

    // Loop through each customer
    Object.keys(groupedCustomers).forEach((customerId, index) => {
      // Create a new page if not the first customer group
      if (index > 0) {
        doc.addPage();
        header(doc, 10);
        yPosition = 20;
      }

      // Customer details
      const customerGroup = groupedCustomers[customerId];
      customerDetails(doc, yPosition, customerGroup);
      yPosition += 8;

      // Loop thorugh rental details for each customer
      doc.setFontSize(8);
      customerGroup.forEach((rental) => {
        rentalDetails(doc, yPosition, rental);
        yPosition += 4;
      });
      yPosition += 4;
    });

    doc.save("Customer_Rentals_Report.pdf");
  } catch (error) {
    console.error("Failed to export customer report:", error);
  }
};