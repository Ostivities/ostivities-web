import React from "react";
import { Paragraph } from "../typography/Typography";

function Footer(): JSX.Element {
  return (
    <footer className="overflow-hidden">
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-3">
          <div className="grig grid-cols-4">
            {/* 1 */}
            <div></div>
            {/* 2 */}
            <div></div>
            {/* 3 */}
            <div></div>
            {/* 4 */}
            <div></div>
          </div>
          <div className="flex flex-row items-center justify-end space-x-7"></div>
        </div>
        <hr className="hor-rule" />
        <div className="footer-bottom py-3">
          <Paragraph
            className="text-center"
            content="Copyright 2023 - Ówànbè all rights reserved"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
