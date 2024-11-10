import OwanbeWebLayout from '@/app/components/WebLayout/OwanbeWebLayout';
import Advantages from '@/app/components/sections/Advantages';
import AdvantagesTwo from '@/app/components/sections/AdvantagesTwo';
import ComingSoon from '@/app/components/sections/ComingSoon';
import Faqs from '@/app/components/sections/Faqs';
import Features from '@/app/components/sections/Features';
import Hero from '@/app/components/sections/Hero';
import theme from '@/app/theme/theme.config';
import { ConfigProvider } from 'antd';
import Script from 'next/script'

export default function Home() { 
  return (
    <OwanbeWebLayout>
      <ConfigProvider
        theme={{
          ...theme,
          hashed: false,
          components: {
            Typography: {
              fontFamily: 'BricolageGrotesqueMedium',
            },
          },
        }}
      >
        <Hero />
        <Features />
        <Advantages />
        <AdvantagesTwo />
        <Faqs />
        <ComingSoon />
        <Script
          src="https://embed.tawk.to/66aa1bcd32dca6db2cb7f021/1i447p70n"
          strategy="afterInteractive"
        />
      </ConfigProvider>
    </OwanbeWebLayout>
  );
}