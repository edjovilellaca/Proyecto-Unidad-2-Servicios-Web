const puppeteer = require('puppeteer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
    accessKeyId: process.env.AMAZONKEY1,
    secretAccessKey: process.env.AMAZONKEY2,
    region: 'us-east-2',
});
const s3 = new AWS.S3();

async function createPDFAndUploadToS3(facturapipi, productDetailsHTML, adInfo1, adInfo2) {
    const pdfPath = path.join(__dirname, 'invoice.pdf');

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const fullHTML = `
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        table { border-collapse: collapse; width: 100%; }
                        table, th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        h1, h2 { text-align: center; }
                    </style>
                </head>
                <body>
                    <h1>Receipt</h1>
                    <p>Factura ID: ${facturapipi.id}</p>
                    <p>Fecha: ${facturapipi.date}</p>
                    <h2>Product Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productDetailsHTML}
                        </tbody>
                    </table>
                    <p>Total: $${adInfo1}</p>
                    <h2>Additional Info</h2>
                    <br>
                    <p>Fecha de compra: ${adInfo2}</p>
                    <br>
                </body>
            </html>
        `;

        await page.setContent(fullHTML);

        await page.pdf({ path: pdfPath, format: 'A4' });

        await browser.close();

        const fileContent = fs.readFileSync(pdfPath);

        const uploadParams = {
            Bucket: 'proyecto-u2-servicios-web',
            Key: `invoices/${Date.now()}_invoice.pdf`,
            Body: fileContent,
            ContentType: 'application/pdf',
        };

        const result = await s3.upload(uploadParams).promise();

        fs.unlinkSync(pdfPath);

        return result.Location;
    } catch (error) {
        console.error('Error creating PDF:', error);
        throw error;
    }
}

module.exports = {
    createPDFAndUploadToS3,
};
