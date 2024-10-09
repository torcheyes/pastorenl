import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChatOnWhatsAppButton } from "@components/Button/Contact/WhatsApp";
import { Logo } from "@components/svg/Logo";
import { ExploreProductsButton2 } from "@components/Button/ExploreProductsButton2";

const Footer: React.FC = () => {
  return (
    <footer className="w-full pt-8 pb-4 max-xl:px-5">
      <div className="max-w-[1200px] mx-auto">
        <div
          className="text-white rounded-[20px] p-6 mb-8 flex flex-col md:flex-row justify-between items-center"
          style={{
            background: "linear-gradient(90deg, #1F1F1F 0%, #464646 100%)",
          }}
        >
          <div className="max-md:w-full mb-4 md:mb-0 text-left leading-10">
            <h2 className="text-[32px] font-[500]">Your Partner in</h2>
            <h2 className="text-[32px] font-[500] md:hidden">Professional</h2>
            <h2 className="text-[32px] font-[500]">
              <span className="max-md:hidden" >Professional</span> <span className="text-brand">Audio Equipment</span>
            </h2>
          </div>
          <ExploreProductsButton2 className="whitespace-nowrap" />
        </div>

        <div className="border-t border-[#0000000D] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="text-gray-800 mb-4 md:mb-0 text-center md:text-left">
              <Logo className="max-w-[124px]" />
              <p className="text-base text-[#464646] mt-[14px]">Professional Sound Supply</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="https://twitter.com"
                className="text-gray-600 hover:text-gray-800"
              >
                <Image src="/svg/social/x.svg" alt="X" width={30} height={30} />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-600 hover:text-gray-800"
              >
                <Image
                  src="/svg/social/instagram.svg"
                  alt="Instagram"
                  width={30}
                  height={30}
                />
              </Link>
              <Link
                href="mailto:info@pastore.nl"
                className="text-gray-600 hover:text-gray-800"
              >
                <Image
                  src="/svg/social/mail.svg"
                  alt="Email"
                  width={30}
                  height={30}
                />
              </Link>
              <ChatOnWhatsAppButton phoneNumber="31687887743" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-[#9B9B9B]">
            <p className="mb-2 sm:mb-0">
              © 2024 PaStore. All rights reserved.
            </p>
            <div className="flex flex-col text-[12px] sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-10 mb-2 sm:mb-0">
              <Link href="/privacy-policy" className="hover:text-gray-800">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="hover:text-gray-800">
                Terms of use
              </Link>
              <div className="flex items-center justify-center sm:justify-start">
                <Image
                  src="/svg/social/phone.svg"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                <span>+31 6 87887743</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span>VAT: NL004645516B48, KVK: 88762432</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// path: src/containers/Footer/Footer.tsx
