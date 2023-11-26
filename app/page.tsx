import { Heading3, Paragraph } from "@/app/components/typography/Typography";
import theme from "@/app/theme/theme.config";
import { ConfigProvider } from "antd";
import OwanbeWebLayout from "./components/WebLayout/OwanbeWebLayout";

export default function Home() {
  return (
    <OwanbeWebLayout>
      <ConfigProvider
        theme={{
          ...theme,
          components: {
            Typography: {
              fontFamily: "BricolageGrotesqueMedium",
            },
          },
        }}
      >
        <section className="overflow-hidden" id="hero">
          <div className="md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto px-5 pt-6 pb-12 md:pb-12 lg:pb-0 xl:pb-0 md:pt-6 lg:pt-24 xl:pt-32">
            <div className="flex flex-row space-x-8 items-center">
              <div className="flex flex-col space-y-5 w-1/2">
                <Heading3
                  content="Celebrate, Connect and Create Memories"
                  className="w-3/4"
                />
                <Paragraph
                  content="Embark on a cultural journey with Ówànbè — where celebrations
                  thrive! Connect, discover, and create lasting memories on our
                  unique cultural app. Join now for a vibrant experience!"
                  className="w-[86%] text-OWANBE_ASH text-lg"
                />
              </div>
              <div className="w-1/2"></div>
            </div>
          </div>
        </section>
      </ConfigProvider>
    </OwanbeWebLayout>
  );
}
