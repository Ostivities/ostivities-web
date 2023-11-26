import { Heading3, Paragraph } from "@/app/components/typography/Typography";
import theme from "@/app/theme/theme.config";
import { ConfigProvider } from "antd";
import OwanbeWebLayout from "./components/WebLayout/OwanbeWebLayout";
import Hero from "./components/sections/Hero";

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
        <Hero />
      </ConfigProvider>
    </OwanbeWebLayout>
  );
}
