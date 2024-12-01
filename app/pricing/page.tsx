import OwanbeWebLayout from "@/app/components/WebLayout/OwanbeWebLayout";
import soon from "@/public/pricing.svg";
import ticket from "@/public/paidticket.svg";
import Image from "next/image";
import Script from "next/script";
import Partners from '@/app/components/sections/Partners';
import "@/app/globals.css";

function Pricing(): JSX.Element {
    // Data for each pricing card
    const pricingPlans = [
        {
            title: "Event Types",
            description: "For small businesses starting their journey",
            features: [
                "✔ Host unlimited free events",
                "✔ Host unlimited paid events",
                "✔ Unlimited private events",
            ],
        },
        {
            title: "Selling Tickets",
            description: "For growing businesses with expanding needs",
            features: [
                "✔ No Fees for Free Tickets",
                "✔ 4.5% + ₦100 fee per paid ticket",
                "✔ Chat support",
                "✔ Full Control Over Ticket Inventory Management",
                "✔ Option to start or stop ticket sales",
            ],
        },
        {
            title: "Customisation",
            description: "For established businesses with scaling operations",
            features: [
                "✔ Custom event page URL",
                "✔ Unlimited custom fields on check out form",
            ],
        },
        {
            title: "Tracking And Management",
            description: "For enterprises with complex requirements",
            features: [
                "✔ Vendors Management",
                "✔ Exhibition Space Booking",
                "✔ Detailed Export Of All Data",
                "✔ Sales Summary Dashboard",
                "✔ Check in analytics",
                "✔ Unlimited Discount Codes",
            ],
        },
        {
            title: "Promotion And Growth",
            description: "Perfect for technical teams and developers",
            features: [
                "✔ Social Media Sharing Made Easy",
                "✔ Send Emails Directly to Attendees",
                "✔ Automated Reminders to Keep Attendees Updated",
                "✔ Optimized for Search Engines to Boost Visibility",
                "✔ Public Event Listing on Ostivities for Enhanced Discovery",
            ],
        },
        {
            title: "Support And Security",
            description: "For premium customers who want it all",
            features: [
                "✔ Card Payments",
                "✔ Bank Transfer Payments",
                "✔ Mobile money payments",
                "✔ USSD Payments",
                "✔ Secure Payment Processing (PCI-DSS 3.2 Level 1 Compliance)",
                "✔ 24/7 dedicated support",
            ],
        },
    ];

    return (
        <OwanbeWebLayout>
            <section className="overflow-hidden">
                <Image
                    src={soon}
                    alt="Pricing"
                    style={{ width: "100%", height: "auto", marginTop: "20px" }}
                />
                <div className="md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto xxl:container xxl:mx-auto px-5 relative pt-6">
                    <div
                        style={{
                            marginTop: "20px",
                            fontFamily: "BricolageGrotesqueMedium",
                            lineHeight: "1.5",
                            color: "#000",
                        }}
                    >
                        <br />
                        <br />

                        <h1
                            style={{
                                fontSize: "28px",
                                marginBottom: "18px",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            Simple Pricing, Maximum Value
                        </h1>
                        <p
                            style={{
                                fontSize: "16px",
                                marginBottom: "24px",
                                maxWidth: "950px",
                                margin: "0 auto",
                                textAlign: "center",
                            }}
                        >
                            If you&apos;re selling tickets, a nominal fee will be applied per ticket sale. It&apos;s that simple—no hidden charges, no surprises.
                        </p>
                        <br />
                        <br />
                        <Image
                            src={ticket}
                            alt="Pricing"
                            style={{
                                display: "block",         // Ensures it behaves like a block element
                                margin: "20px auto",      // Centers the image horizontally
                                width: "auto",            // Fix width value
                                height: "auto",           // Fix height value
                            }}
                        />
                        <br />
                        {/* Pricing Table */}
                        <div
                            className="pricing-table-container"
                            style={{
                                display: "flex",
                                gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row
                                flexWrap: "wrap",          // Allows cards to wrap onto new rows
                                justifyContent: "flex-start",  // Align cards to the left
                                gap: "20px",               // Adds spacing between cards
                                padding: "20px",           // Padding around the container
                                width: "100%",             // Ensures the container uses the full width
                            }}
                        >
                            {pricingPlans.map((plan, index) => (
                                <div
                                    key={index}
                                    className="pricing-card bg-white"
                                    style={{
                                        flex: "1 1 calc(25% - 20px)", // Adjusts card width (4 cards per row)
                                        padding: "20px",
                                        borderRadius: "15px",
                                        textAlign: "left",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds a nice shadow
                                        transition: "transform 0.2s ease-in-out",
                                        minWidth: "250px", // Ensures cards don't get too small
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: "medium",
                                            marginBottom: "10px",
                                            color: "#e20000",
                                        }}
                                    >
                                        {plan.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            marginBottom: "20px",
                                            color: "#666",
                                        }}
                                    >
                                        {/* {plan.description} */}
                                    </p>
                                    <ul
                                        style={{
                                            listStyle: "none",
                                            padding: "0",
                                            textAlign: "left",
                                            lineHeight: "1.8",
                                        }}
                                    >
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "normal",
                                                    color: "#333",
                                                }}
                                            >
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <br />
                        <br />
                    </div>
                </div>
            </section>

            <Partners />
            <Script
                src="https://embed.tawk.to/66aa1bcd32dca6db2cb7f021/1i447p70n"
                strategy="afterInteractive"
            />
        </OwanbeWebLayout>
    );
}

export default Pricing;
