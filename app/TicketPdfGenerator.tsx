import { createWriteStream } from 'fs';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import  OSTIVITIES_LOGO  from './owanbe.svg';
import TICKET_BANNER  from './ticketBanner.svg';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// playground requires you to assign document definition to a variable called dd
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface PdfDto {
  content: {
    order_number: string;
    order_date: string;
    event_date_time: string;
    event_address: string;
    buyer_name: string;
    ticket_name: string;
    ticket_type: string;
    event_name: string;
    qr_code: string;
    ostivities_logo: string;
    ticket_banner: string;
  }[];
  order_number: string;
}
export const pdfGenerator = (dto: PdfDto)=>{

//   const fonts = {
//     Roboto: {
//       normal: 'fonts/BricolageGrotesque/BricolageGrotesque-Regular.ttf',
//       bold: 'fonts/BricolageGrotesque/BricolageGrotesque-Bold-BF648bd57888479.ttf',
//       italics: 'fonts/BricolageGrotesque/BricolageGrotesque-Regular.ttf',
//       bolditalics:
//         'fonts/BricolageGrotesque/BricolageGrotesque-Bold-BF648bd57888479.ttf',
//     },
//   };
  const generatePageContent = (
    data: PdfDto['content'][0],
    isLastPage?: boolean,
  ) => {
    const pageContent: any = [
      {
        image: data.ostivities_logo,
        margin: [5, 2, 10, 15],
        fit: [100, 100],
        style: 'header',
      },
      '\n\n',
      {
        image: data.ticket_banner,
        fit: [500, 500],
      },
      '\n',
      { text: data.event_name, margin: [5, 10, 10, 30], style: 'header' },
      {
        alignment: 'justify',
        columns: [
          {
            stack: [
              { text: 'Order Number', margin: [5, 2, 10, 8], bold: true },
              {
                text: data.order_number,
                margin: [5, 2, 10, 8],
                color: '#e20000',
              },
            ],
          },
          {
            stack: [
              { text: 'Order Date', margin: [5, 2, 10, 8], bold: true },
              {
                text: data.order_date,
                margin: [5, 2, 10, 8],
                color: '#e20000',
              },
            ],
          },
        ],
      },
      '\n\n',
      {
        columns: [
          {
            stack: [
              { text: 'Event Date & Time', margin: [5, 2, 10, 8], bold: true },
              {
                text: data.event_date_time,
                margin: [5, 2, 10, 8],
                color: '#e20000',
              },
            ],
          },
          {
            stack: [
              { text: 'Event Address', margin: [5, 2, 10, 8], bold: true },
              {
                text: data.event_address,
                margin: [5, 2, 10, 8],
                color: '#e20000',
              },
            ],
          },
        ],
      },
      '\n\n',
      {
        columns: [
          {
            stack: [
              {
                text: 'Ticket Details',
                margin: [5, 2, 10, 15],
                style: 'header',
              },
              { text: 'Ticket Name', margin: [5, 2, 10, 8], bold: true },
              {
                text: data.ticket_name,
                margin: [5, 2, 10, 8],
                color: '#e20000',
              },
              {
                stack: [
                  { text: 'Order By', margin: [5, 20, 10, 8], bold: true },
                  {
                    text: data.buyer_name,
                    margin: [5, 2, 10, 8],
                    color: '#e20000',
                  },
                ],
              },
            ],
          },
          {
            stack: [{ qr: data.qr_code, fit: '200' }],
          },
        ],
      },
    ];

    if (!isLastPage) {
      pageContent.push({ text: '', pageBreak: 'after' });
    }
    return pageContent;
  };
const content = dto.content.flatMap((data, index) =>
  generatePageContent(data, index === dto.content.length - 1),
  );

// const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content,
    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      bigger: {
        fontSize: 15,
        italics: true,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
    footer: (currentPage: any, pageCount: any) => {
      return {
        text: 'Page ${currentPage} of ${pageCount}',
        alignment: 'center',
        margin: [0, 10],
        fontSize: 12,
      };
    },
  } as any
  const options = {};

  // const pdfDoc = printer.createPdfKitDocument(docDefinition, options).download();
  pdfMake.createPdf(docDefinition).download(`${dto.order_number}.pdf`);
}
