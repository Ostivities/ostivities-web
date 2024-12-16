import OwanbeWebLayout from "@/app/components/WebLayout/OwanbeWebLayout";
import soon from "@/public/release.svg";
import Image from "next/image";
import Script from 'next/script';

function ReleaseNote(): JSX.Element {
  const releaseNotes = [
    // {
    //   date: "January 15, 2025",
    //   title: "Bugs Fixes",
    //   description:
    //     "Updates were made to.....",
    //   tags: ["Improvement"],
    // },
    {
      date: "January 1, 2025",
      title: "Ostivities Launch",
      description:
        "Ostivities officially launches, empowering event creators to seamlessly create, manage, and promote events on the platform. With user-friendly tools for event planning, and ticketing, Ostivities provides a streamlined experience for both creators and attendees. The launch marks the beginning of an exciting journey, introducing new features and continuous improvements to enhance event management.",
      tags: ["Version 1.0.0","Improvement", "New Features"],
    },    
  ];

  return (
    <OwanbeWebLayout>
     <section className="overflow-hidden">
        <Image
          src={soon}
          alt="Release Notes"
          style={{ width: "100%", height: "auto", marginTop: "20px" }}
        />
        <div className="md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto xxl:container xxl:mx-auto px-5 relative pt-6">
          <div
            style={{
              marginTop: "20px",
              fontFamily: "BricolageGrotesqueMedium",
              lineHeight: "1.8",
              color: "#000",
            }}
          >
            <p style={{ fontSize: "16px", marginBottom: "34px" }}>
              Here are the latest updates and bug fixes for Ostivities:
            </p>

          {/* Timeline */}
          <div className="relative border-l-2 border-gray-200">
            {releaseNotes.map((note, idx) => (
              <div
                key={idx}
                className="mb-10 ml-6 relative"
                style={{ paddingLeft: "20px" }}
              >
                {/* Circle */}
                <span className="absolute -left-[32px] top-1 w-4 h-4 rounded-full bg-[#e20000]"></span>

                {/* Date */}
                <p className="text-sm font-medium mb-2">
                  {note.date}
                </p>

                {/* Title */}
                <h2 className="text-lg font-semibold text-[#000000] mb-1">
                  {note.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-3">{note.description}</p>

                {/* Tags */}
                <div className="flex gap-2">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#fadede] text-[#e20000] text-xs font-medium px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Script
            src="https://embed.tawk.to/66aa1bcd32dca6db2cb7f021/1i447p70n"
            strategy="afterInteractive"
          />
        </div>
        </div>
      </section>
    </OwanbeWebLayout>
  );
}

export default ReleaseNote;
