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
      doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
         .lineWidth(3)
         .strokeColor('#ff6b35')
         .stroke();
      doc.rect(35, 35, doc.page.width - 70, doc.page.height - 70)
         .lineWidth(1)
         .strokeColor('#ff8c42')
         .stroke();

      // Add logo if exists
      const logoPath = path.join(__dirname, '../../frontend/public/w3-logo.jpg');
      let headerY = 80;
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, doc.page.width / 2 - 60, 60, { width: 120 });
        headerY = 160;
      }

      // Company Logo/Header
      doc.fontSize(28)
         .font('Helvetica-Bold')
         .fillColor('#ff6b35')
         .text('W3 APP DEVELOPERS', 0, headerY, { align: 'center' });

      // Certificate Title
      const titleY = fs.existsSync(logoPath) ? headerY + 60 : 140;
      doc.fontSize(32)
         .fillColor('#ff6b35')
         .text('CERTIFICATE', 0, titleY, { align: 'center' });

      doc.fontSize(18)
         .font('Helvetica')
         .fillColor('#666')
         .text(`OF ${data.type.toUpperCase()}`, 0, titleY + 40, { align: 'center' });

      // Decorative line
      const lineY = titleY + 70;
      doc.moveTo(250, lineY)
         .lineTo(doc.page.width - 250, lineY)
         .strokeColor('#ff6b35')
         .stroke();

      // Certificate Body
      const bodyY = lineY + 30;
      doc.fontSize(14)
         .fillColor('#000')
         .text('This is to certify that', 0, bodyY, { align: 'center' });

      doc.fontSize(24)
         .font('Helvetica-Bold')
         .fillColor('#ff6b35')
         .text(data.name, 0, bodyY + 30, { align: 'center' });

      doc.fontSize(14)
         .font('Helvetica')
         .fillColor('#000')
         .text(`from ${data.collegeName}`, 0, bodyY + 70, { align: 'center' });

      doc.fontSize(14)
         .text(`Roll No: ${data.rollNo}`, 0, bodyY + 100, { align: 'center' });

      doc.fontSize(14)
         .text(`has successfully completed ${data.type} training`, 0, bodyY + 130, { align: 'center' });

      doc.fontSize(14)
         .text(`Duration: ${data.duration}`, 0, bodyY + 160, { align: 'center' });

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
         .lineTo(doc.page.width - 150, doc.page.height - 85)
         .strokeColor('#ff6b35')
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
