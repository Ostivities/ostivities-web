import OwanbeWebLayout from "@/app/components/WebLayout/OwanbeWebLayout";
import soon from "@/public/aboutus.svg";
import ceo from "@/public/CEO.svg";
import cto from "@/public/CTO.svg";
import qa from "@/public/QA.svg";
import pm from "@/public/PM.svg";
import eng1 from "@/public/ENG1.svg";
import empty from "@/public/empty.svg";
import Image from "next/image";
import Script from 'next/script'

function AboutUs(): JSX.Element {
  return (

    <OwanbeWebLayout>
      <section className="overflow-hidden">
        <Image
          src={soon}
          alt="About us"
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
            <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
              The Story And Vision Behind Ostivities
            </h1>
            <p style={{ fontSize: "16px", marginBottom: "24px", marginTop: "18px" }}>
              Ostivities was built with a clear mission: to simplify and enhance
              event management for everyone. We believe in the power of events
              to bring people together, create lasting memories, and inspire change.
              Our platform enables organizers to seamlessly plan, promote, and execute
              events—all in one place. With a team experienced in technology, event
              planning, and marketing, we understand the challenges of managing all
              the details, so we set out to build a tool that&apos;s intuitive, efficient,
              and enjoyable to use!
            </p>

            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#e20000",
                marginBottom: "16px",
              }}
            >
              The Beginning: A Vision Takes Shape
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "24px" }}>
              The vision for Ostivities started with a straightforward goal: 
              create an intuitive solution for event organizers seeking a seamless, 
              all-in-one platform. Our team saw the need for a tool that makes event 
              management simpler, not only for large-scale events but for gatherings 
              of any size. By uniting expertise from tech, marketing, and event planning, 
              we set out to reduce complexity and enhance efficiency.
              <br />
              <br />
              Driven by a commitment to innovation and user experience, we developed a 
              platform that empowers organizers at every step. From planning and promotion 
              to engaging attendees and measuring impact, Ostivities transforms 
              the way events are brought to life.
            </p>

            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#e20000",
                marginBottom: "16px",
              }}
            >
              Our Platform: Empowering Event Organizers
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "24px" }}>
              Ostivities provides organizers with the tools they need to
              succeed:
            </p>
            <ul
              style={{
                fontSize: "16px",
                lineHeight: "1.8",
                marginBottom: "24px",
                paddingLeft: "20px",
              }}
            >
              <li style={{ marginBottom: "10px" }}>
                &#x2022; <strong>Event Creation And Planning:</strong>{" "}
                User-friendly interfaces and customizable templates make it easy
                to design and organize events of any size.
              </li>
              <li style={{ marginBottom: "10px" }}>
                &#x2022; <strong>Ticketing And Registration:</strong> Seamless
                ticketing and secure payment options ensure a smooth experience
                for attendees.
              </li>
              <li style={{ marginBottom: "10px" }}>
                &#x2022; <strong>Marketing And Promotion:</strong> Robust
                marketing tools help organizers attract and engage their
                audience, with real-time analytics to optimize campaigns.
              </li>
              <li style={{ marginBottom: "10px" }}>
                &#x2022; <strong>Post-Event Analytics:</strong> Detailed reports
                and feedback tools help organizers improve future events.
              </li>
            </ul>

            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#e20000",
                marginBottom: "16px",
              }}
            >
              Our Vision: The Future Of Events
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "24px" }}>
              We envision a future where events are more accessible, inclusive,
              and impactful. As technology evolves, we are committed to staying
              at the forefront, integrating emerging technologies like AI and
              virtual reality to create immersive experiences. We&apos;re also
              dedicated to supporting hybrid events, blending the best of
              in-person and virtual interactions.
            </p>

            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#e20000",
                marginBottom: "16px",
              }}
            >
              Community And Sustainability
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "24px" }}>
              Ostivities is more than a platform—it&apos;s a community. We
              believe in collaboration and regularly host events to bring
              organizers together. We&apos;re also committed to promoting
              sustainable event practices and ensuring our platform is
              accessible and inclusive to all.
            </p>

            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#e20000",
                marginBottom: "16px",
              }}
            >
              Join Us: Be Part Of The Ostivities Journey
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "24px" }}>
              The journey of Ostivities is just beginning, and we invite you to join us.
              Whether you&apos;re an event organizer looking for a better way to manage
              your events or an attendee seeking memorable experiences, we&apos;re here to
              support you.
              <br />
              <br />
            </p>

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
              Meet our team
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
              We&apos;re a collaborative and adaptable team, dedicated to learning and continuous improvement.
              Each member is keenly attentive, observing your every gesture and listening to your every word.
            </p>
            <br />
            <br />

            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4">
                <div className="rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-3">
                  <Image src={ceo} alt="Ayatullah" className="w-full h-auto" />
                  <div className="p-6">
                    <h2 className="text-md font-bold">Ayatullah Olowu</h2>
                    <p className="text-gray-600 text-sm" style={{ color: '#e20000' }}>Co-Founder & CEO</p>
                  </div>
                </div>
              </div>

              <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4">
                <div className="rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-3">
                  <Image src={cto} alt="Idris" className="w-full h-auto" />
                  <div className="p-6">
                    <h2 className="text-md font-bold">Idris Bankole</h2>
                    <p className="text-gray-600 text-sm" style={{ color: '#e20000' }}>Co-Founder & CTO</p>
                  </div>
                </div>
              </div>

              <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4">
                <div className="rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-3">
                  <Image src={pm} alt="Nafisat" className="w-full h-auto" />
                  <div className="p-6">
                    <h2 className="text-md font-bold">Nafisat Gbadegeshin</h2>
                    <p className="text-gray-600 text-sm" style={{ color: '#e20000' }}>Product Manager</p>
                  </div>
                </div>
              </div>

              <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4">
                <div className="rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-3">
                  <Image src={qa} alt="Hafizah" className="w-full h-auto" />
                  <div className="p-6">
                    <h2 className="text-md font-bold">Hafizah Muhyideen</h2>
                    <p className="text-gray-600 text-sm" style={{ color: '#e20000' }}>QA Engineer</p>
                  </div>
                </div>
              </div>

              <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4">
                <div className="rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-3">
                  <Image src={eng1} alt="Hafizah" className="w-full h-auto" />
                  <div className="p-6">
                    <h2 className="text-md font-bold">Kayode Raimi</h2>
                    <p className="text-gray-600 text-sm" style={{ color: '#e20000' }}>Frontend Engineer</p>
                  </div>
                </div>
              </div>



            </div>
            <br />
            <br />
          </div>
        </div>
      </section>
      <Script
          src="https://embed.tawk.to/66aa1bcd32dca6db2cb7f021/1i447p70n"
          strategy="afterInteractive"
        />
    </OwanbeWebLayout>
  );
}

export default AboutUs;
