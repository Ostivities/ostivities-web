import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { OSTIVITIES_LOGO } from "@/app/utils/logo";
import { TICKET_BANNER } from "@/app/utils/ticketBanner";

// Import custom fonts
Font.register({
  family: "BricolageGrotesque",
  fonts: [
    { src: "/fonts/BricolageGrotesque-Regular.ttf" },
    { src: "/fonts/BricolageGrotesque-Bold-BF648bd57888479.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "BricolageGrotesque",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  ticketBanner: {
    width: "100%",
    height: 50,
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  boldText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});

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

const PDFGenerator = ({ dto }: { dto: PdfDto }) => {
  const { content } = dto;

  return (
    <Document>
      {content.map((data, index) => (
        <Page size="A4" style={styles.page} key={index}>
          {/* Logo */}
          <Image src="https://res.cloudinary.com/ddgehpmnq/image/upload/v1735688542/Ostivities_Logo_mxolw6.png" style={styles.logo} />

          {/* Ticket Banner */}
          <Image src="https://res.cloudinary.com/ddgehpmnq/image/upload/v1735773616/ticketheader_vihwar.png" style={styles.ticketBanner} />

          {/* Event Name */}
          <Text style={styles.header}>{data.event_name}</Text>

          {/* Order Details */}
          <View style={styles.section}>
            <Text style={styles.boldText}>Order Number</Text>
            <Text style={styles.text}>{data.order_number}</Text>
            <Text style={styles.boldText}>Order Date</Text>
            <Text style={styles.text}>{data.order_date}</Text>
          </View>

          {/* Event Details */}
          <View style={styles.section}>
            <Text style={styles.boldText}>Event Date & Time</Text>
            <Text style={styles.text}>{data.event_date_time}</Text>
            <Text style={styles.boldText}>Event Address</Text>
            <Text style={styles.text}>{data.event_address}</Text>
          </View>

          {/* Ticket Details */}
          <View style={styles.section}>
            <Text style={styles.boldText}>Ticket Name</Text>
            <Text style={styles.text}>{data.ticket_name}</Text>
            <Text style={styles.boldText}>Order By</Text>
            <Text style={styles.text}>{data.buyer_name}</Text>
          </View>

          {/* QR Code */}
          {data.qr_code && (
            <View>
              <Text style={styles.boldText}>QR Code</Text>
              <Image src={data?.qr_code}  style={styles.qrCode} />
            </View>
          )}

          {/* Footer */}
          <Text style={styles.footer}>
            Page {index + 1} of {content.length}
          </Text>
        </Page>
      ))}
    </Document>
  );
};

export default PDFGenerator;
