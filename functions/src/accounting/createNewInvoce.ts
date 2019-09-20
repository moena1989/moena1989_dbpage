const functions = require('firebase-functions');
const admin = require('firebase-admin');
const PDFDocument = require('pdfkit');
const path = require('path');
const os = require('os');

exports.handler = function (snap: any, context: any) {
  const tempFilePath = path.join(os.tmpdir(), 'invoice');
  const invoiceData = snap.data();

  return new Promise((resolve: any) => {
    admin.storage().bucket().file('/common/moena1989-full-black.png').download({destination: tempFilePath}).then((value: any) => {
      const doc = new PDFDocument();

      if (invoiceData !== undefined) {
        snap.ref.update({
          gsPdf: '/departments/accounting/invoices/invoice_' + invoiceData.metadata.id + '.pdf'
        });
        const myPdfFile = admin.storage().bucket().file('/departments/accounting/invoices/invoice_' + invoiceData.metadata.id + '.pdf');
        //
        doc.pipe(myPdfFile.createWriteStream());
        generateHeader(doc, invoiceData, tempFilePath);
        generateCustomerInformation(doc, invoiceData);
        generateInvoiceTable(doc, invoiceData);
        doc.end();
        //
      }
    });
  });
};

exports.bb = function (object: any, context: any) {
  const bucket = admin.storage.bucket();
  const file = bucket.file(object.name);
  const invoiceData = object.data();
  return file.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then((value1: any) => {
    admin.firestore().doc('/departments/accounting/invoices/invoice_' + invoiceData.metadata.id + '.pdf').update({
      pdfUrl: value1[0]
    }).then((value2: any) => {
      console.log('llega hasta la actualización, no ? ', value2);
    });
  });
};


function generateHeader(doc: any, invoice: any, logoPath: string) {
  doc
    .image(logoPath, 50, 45, {width: 110})
    .fillColor('#444444')
    .fontSize(10)
    .text(invoice.acquirer.documentType + ' ' + numberWithDots(+invoice.acquirer.document), 200, 50, {align: 'right'})
    .text(invoice.acquirer.address, 200, 65, {align: 'right'})
    .text(invoice.acquirer.location, 200, 80, {align: 'right'})
    .moveDown();
}

function generateCustomerInformation(doc: any, invoice: any) {
  // const invoceStructure = {
  //   invoiceCounter: 0,
  //   beneficiary: {
  //     name: '',
  //     document: '',
  //     documentType: '',
  //     personType: '',
  //     items: []
  //   },
  //   acquirer: {
  //     name: 'Moena 1989 SAS',
  //     address: 'Calle 35N #21-216 Montemayor',
  //     location: 'Popayán / Cauca / Colombia',
  //     document: '95989987-1',
  //     documentType: 'Nit',cd
  //   }
  // };
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('Documento equivalente a factura', 50, 150)
    .fontSize(10)
    .text('De acuerdo al articulo 3, Decreto 522 de marzo de 2003.', 50, 170);
  generateHr(doc, 185);

  const customerInformationTop = 200;
  doc
    .fontSize(10)
    .text('Consecutivo No.:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice.invoiceCounter, 150, customerInformationTop)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text('Balance Due:', 50, customerInformationTop + 30)
    .text(
      '$ ' + numberWithCommas(invoice.total),
      150,
      customerInformationTop + 30
    )

    .font('Helvetica-Bold')
    .text(invoice.beneficiary.name, 300, customerInformationTop)
    .font('Helvetica')
    .text(invoice.beneficiary.documentType + ' ' + numberWithDots(+invoice.beneficiary.document), 300, customerInformationTop + 15)
    .text(
      invoice.invoiceType,
      300,
      customerInformationTop + 30
    )
    .moveDown();
  generateHr(doc, 252);
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + '/' + month + '/' + day;
}

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function numberWithDots(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function generateInvoiceTable(doc: any, invoice: any) {
  let i;
  const invoiceTableTop = 330;

  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    invoiceTableTop,
    'Ítem',
    'Descripción',
    'Valor c/u',
    'Cantidad',
    'Total'
  );

  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.itemType,
      item.description,
      numberWithCommas(item.unitValue),
      item.quantity,
      numberWithCommas(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    '',
    '',
    'Subtotal',
    '',
    numberWithCommas(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    '',
    '',
    'IVA (19%)',
    '',
    0
  );
  // numberWithCommas(invoice.iva)
  const duePosition = paidToDatePosition + 25;
  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    duePosition,
    '',
    '',
    'Total',
    '',
    '$ ' + numberWithCommas(invoice.total)
  );
  doc.font('Helvetica');
}

function generateTableRow(
  doc: any,
  y: any,
  item: any,
  description: any,
  unitCost: any,
  quantity: any,
  lineTotal: any
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, {width: 90, align: 'right'})
    .text(quantity, 370, y, {width: 90, align: 'right'})
    .text(lineTotal, 0, y, {align: 'right'});
}

function generateHr(doc: any, y: any) {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

