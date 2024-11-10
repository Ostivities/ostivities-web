import Header from '@/app/components/Header/Header';
import { Heading3 } from '@/app/components/typography/Heading3'; 
import { IAuthLayout } from '@/app/utils/interface';
import { Card } from 'antd';
import React from 'react';


function FeedbackLayout({ children }: IAuthLayout): JSX.Element {
  return (
    <main className="overflow-auto">
      <Header />
      <section className="overflow-hidden bg-OWANBE_AUTH_BG min-h-screen">
        <div className="md:container md:mx-auto px-5 pt-8 pb-12 lg:pb-0 md:pt-6 lg:pt-0 relative">
          <div className="flex flex-row items-start auth-background mt-3">
            <div className="hidden w-5/12 md:flex flex-col space-y-3 pt-80">
              <h5
                className="leading-3 font-BricolageGrotesqueRegular welcome-heading"
              >
                Welcome to
              </h5>
              <Heading3
                className="custom-heading font-bold"
                content="Ostivities"
              />
            </div>
            <div className="w-full md:w-7/12 h-screen">
              <Card
                className="min-h-full md:px-5"
                style={{
                  borderRadius: '70px 70px 0px 0px',
                  boxShadow: '0px 8px 24px 0px #00000014',
                  border: '1px solid #ffffff',
                }}
              >
                {children}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FeedbackLayout;
