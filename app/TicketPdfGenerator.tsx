import { createWriteStream } from "fs";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { OSTIVITIES_LOGO } from "@/app/utils/logo";
import { TICKET_BANNER } from "@/app/utils/ticketBanner";
import { ROBOTO_REGULAR } from "@/app/utils/robotRegular";
import { ROBOTO_BOLD } from "@/app/utils/robotoBold";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

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
    qr_code?: string;
  }[];
}

export const pdfGenerator = (dto: PdfDto) => {
  const logo = OSTIVITIES_LOGO;
  const ticketBanner = TICKET_BANNER;

  // pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.vfs = {
    "BricolageGrotesque-Regular.ttf": "/fonts/BricolageGrotesque-Regular.ttf",
    "BricolageGrotesque-Bold.ttf": "/fonts/BricolageGrotesque-Bold-BF648bd57888479.ttf",
  };
  // pdfMake.vfs["BricolageGrotesque-Regular.ttf"] = ROBOTO_REGULAR
  // pdfMake.vfs["BricolageGrotesque-Bold.ttf"] = ROBOTO_BOLD

  pdfMake.fonts = {
    BricolageGrotesque: {
      normal: "BricolageGrotesque-Regular.ttf",
      bold: "BricolageGrotesque-Bold.ttf",
      italics: "BricolageGrotesque-Regular.ttf",
      bolditalics: "BricolageGrotesque-Bold.ttf",
    },
  };

  const generatePageContent = (
    data: PdfDto["content"][0],
    isLastPage?: boolean
  ) => {
    const pageContent: any = [
      {
        image: logo,
        margin: [5, 2, 10, 15],
        fit: [100, 100],
        style: "header",
      },
      "\n\n",
      {
        image: ticketBanner,
        fit: [500, 500],
      },
      "\n",
      { text: data?.event_name, margin: [5, 10, 10, 30], style: "header" },
      {
        alignment: "justify",
        columns: [
          {
            stack: [
              { text: "Order Number", margin: [5, 2, 10, 8], bold: true },
              {
                text: data.order_number,
                margin: [5, 2, 10, 8],
                color: "#e20000",
              },
            ],
          },
          {
            stack: [
              { text: "Order Date", margin: [5, 2, 10, 8], bold: true },
              {
                text: data?.order_date,
                margin: [5, 2, 10, 8],
                color: "#e20000",
              },
            ],
          },
        ],
      },
      "\n\n",
      {
        columns: [
          {
            stack: [
              { text: "Event Date & Time", margin: [5, 2, 10, 8], bold: true },
              {
                text: data?.event_date_time,
                margin: [5, 2, 10, 8],
                color: "#e20000",
              },
            ],
          },
          {
            stack: [
              { text: "Event Address", margin: [5, 2, 10, 8], bold: true },
              {
                text: data?.event_address,
                margin: [5, 2, 10, 8],
                color: "#e20000",
              },
            ],
          },
        ],
      },
      "\n\n",
      {
        columns: [
          {
            stack: [
              {
                text: "Ticket Details",
                margin: [5, 2, 10, 15],
                style: "header",
              },
              { text: "Ticket Name", margin: [5, 2, 10, 8], bold: true },
              {
                text: data.ticket_name,
                margin: [5, 2, 10, 8],
                color: "#e20000",
              },
              {
                stack: [
                  { text: "Order By", margin: [5, 20, 10, 8], bold: true },
                  {
                    text: data.buyer_name,
                    margin: [5, 2, 10, 8],
                    color: "#e20000",
                  },
                ],
              },
            ],
          },
          {
            stack: [{ qr: data?.qr_code, fit: "200" }],
          },
        ],
      },
    ];

    if (!isLastPage) {
      pageContent.push({ text: "", pageBreak: "after" });
    }
    return pageContent;
  };
  const content = dto?.content?.flatMap((data, index) =>
    generatePageContent(data, index === dto.content.length - 1)
  );

  const docDefinition = {
    content,
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        font: "BricolageGrotesque",
      },
      bigger: {
        fontSize: 15,
        italics: true,
        font: "BricolageGrotesque",
      },
    },
    defaultStyle: {
      columnGap: 20,
      font: "BricolageGrotesque",
    },
    footer: (currentPage: any, pageCount: any) => {
      return {
        text: `Page ${currentPage} of ${pageCount}`,
        alignment: "center",
        margin: [0, 10],
        fontSize: 12,
        font: "BricolageGrotesque",
      };
    },
  } as any;
  const options = {};
  pdfMake
    .createPdf(docDefinition)
    .download(`${dto?.content?.map((con) => con?.order_number)}.pdf`);
};
