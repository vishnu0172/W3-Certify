const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
      const fileName = `${data.certificateId}.pdf`;
      const filePath = path.join(__dirname, '../certificates', fileName);
      
      // Ensure certificates directory exists
      if (!fs.existsSync(path.join(__dirname, '../certificates'))) {
        fs.mkdirSync(path.join(__dirname, '../certificates'), { recursive: true });
      }

      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // Certificate Design
      // Border
      doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).stroke();
      doc.rect(35, 35, doc.page.width - 70, doc.page.height - 70).stroke();

      // Company Logo/Header
      doc.fontSize(28)
         .font('Helvetica-Bold')
         .fillColor('#1a237e')
         .text('W3 APP DEVELOPERS', 0, 80, { align: 'center' });

      // Certificate Title
      doc.fontSize(32)
         .fillColor('#000')
         .text('CERTIFICATE', 0, 140, { align: 'center' });

      doc.fontSize(18)
         .font('Helvetica')
         .fillColor('#666')
         .text(`OF ${data.type.toUpperCase()}`, 0, 180, { align: 'center' });

      // Decorative line
      doc.moveTo(250, 210)
         .lineTo(doc.page.width - 250, 210)
         .stroke();

      // Certificate Body
      doc.fontSize(14)
         .fillColor('#000')
         .text('This is to certify that', 0, 240, { align: 'center' });

      doc.fontSize(24)
         .font('Helvetica-Bold')
         .fillColor('#1a237e')
         .text(data.name, 0, 270, { align: 'center' });

      doc.fontSize(14)
         .font('Helvetica')
         .fillColor('#000')
         .text(`from ${data.collegeName}`, 0, 310, { align: 'center' });

      doc.fontSize(14)
         .text(`Roll No: ${data.rollNo}`, 0, 340, { align: 'center' });

      doc.fontSize(14)
         .text(`has successfully completed ${data.type} training`, 0, 370, { align: 'center' });

      doc.fontSize(14)
         .text(`Duration: ${data.duration}`, 0, 400, { align: 'center' });

      // Footer Information
      const issuedDateFormatted = new Date(data.issuedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      doc.fontSize(12)
         .fillColor('#666')
         .text(`Certificate ID: ${data.certificateId}`, 100, doc.page.height - 120, { align: 'left' });

      doc.fontSize(12)
         .text(`Date of Issue: ${issuedDateFormatted}`, doc.page.width - 300, doc.page.height - 120, { align: 'left' });

      // Signature
      doc.fontSize(12)
         .fillColor('#000')
         .text('Authorized Signature', doc.page.width - 250, doc.page.height - 80, { align: 'center' });

      doc.moveTo(doc.page.width - 300, doc.page.height - 85)
         .lineTo(doc.page.width - 100, doc.page.height - 85)
         .stroke();

      doc.end();

      writeStream.on('finish', () => {
        resolve(filePath);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};
