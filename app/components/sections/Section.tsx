import React from "react";

function Section({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <section className="overflow-hidden">
      <div className="md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto px-16 pt-8 pb-12 md:pb-12 lg:pb-0 xl:pb-0 md:pt-6 lg:pt-16 xl:pt-16 relative">
        <>{children}</>
      </div>
    </section>
  );
}

export default Section;
