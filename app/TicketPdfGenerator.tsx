import { createWriteStream } from 'fs';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import  OSTIVITIES_LOGO  from './owanbe.svg';
import TICKET_BANNER  from './ticketBanner.svg';

// playground requires you to assign document definition to a variable called dd

const documentDefinitions = {
  content: [
    {
      image: OSTIVITIES_LOGO,
      margin: [5, 2, 10, 30],
      fit: [100, 100],
      style: 'header',
    },
    {
      image: TICKET_BANNER,
      fit: [500, 500],
    },
    { text: '{{event_name}}', margin: [5, 50, 10, 30], style: 'header' },
    {
      stack: [
        //  FIRST ROW
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '50%',
              //   text: 'Order Number',
              stack: [
                { text: 'Order Number', margin: [5, 2, 10, 8] },
                {
                  text: '{{order_number}}',
                  margin: [5, 2, 10, 8],
                  color: '#e20000',
                },
              ],
              marginBottom: 25,
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '50%',
              text: 'Second column',
              stack: [
                { text: 'Order Date', margin: [5, 2, 10, 8] },
                {
                  text: '{{order_date}}',
                  margin: [5, 2, 10, 8],
                  color: '#e20000',
                },
              ],
            },
          ],
        },

        //  SECOND ROW
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '50%',
              //   text: 'Order Number',
              stack: [
                { text: 'Event Date & Time', margin: [5, 2, 10, 8] },
                {
                  text: '{{event_date_time}}',
                  margin: [5, 2, 10, 8],
                  color: '#e20000',
                },
              ],
              marginBottom: 25,
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '50%',
              text: 'Second column',
              stack: [
                { text: 'Event Address', margin: [5, 2, 10, 8] },
                {
                  text: '{{event_address}}',
                  margin: [5, 2, 10, 8],
                  color: '#e20000',
                },
              ],
              marginBottom: 25,
            },
          ],
        },

        //  THIRD ROW
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '50%',
              //   text: 'Order Number',
              stack: [
                {
                  stack: [
                    { text: 'Ticket Type', margin: [5, 2, 10, 8] },
                    {
                      text: '{{ticket_type}}',
                      margin: [5, 2, 10, 8],
                      color: '#e20000',
                    },
                  ],
                  marginBottom: 25,
                },
                {
                  stack: [
                    { text: 'Order By', margin: [5, 2, 10, 8] },
                    {
                      text: '{{buyer_name}}',
                      margin: [5, 2, 10, 8],
                      color: '#e20000',
                    },
                  ],
                },
              ],
            },

            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '50%',
              text: 'Second column',
              stack: [
                //   { text: 'QR Code', margin: [ 5, 2, 10, 8 ] },
                { qr: 'text in QR', fit: '200' },
              ],
              marginBottom: 25,
            },
          ],
        },
      ],

      // optional space between columns
      columnGap: 30,
    },
  ],

  styles: {
    header: {
      fontSize: 22,
      bold: true,
      marginBottom: 25,
    },
    anotherStyle: {
      italics: true,
      alignment: 'right',
    },
  },
};

export const pdfGenerator = (): PDFKit.PDFDocument | any => {
  const fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf',
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    ...documentDefinitions,
  } as unknown as TDocumentDefinitions;

  const options = {
    // ...
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);

  pdfDoc.pipe(createWriteStream('document.pdf'));
  pdfDoc.end();
};