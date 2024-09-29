import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GetAQuoteTodayButton } from "@components/Button/GetAQuoteTodayButton";
import { WhatsAppButton } from "@components/Button/WhatsAppButton";

const Footer: React.FC = () => {
  return (
    <footer className="pt-8 pb-4">
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 text-white rounded-lg p-6 mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h2 className="text-2xl font-bold">Your Partner in</h2>
            <h2 className="text-2xl font-bold">
              Professional{" "}
              <span className="text-orange-500">Audio Equipment</span>
            </h2>
          </div>
          <GetAQuoteTodayButton />
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="text-gray-800 mb-4 sm:mb-0 text-center sm:text-left">
              <h3 className="font-bold">pa/store</h3>
              <p className="text-sm">Professional Sound Supply</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="https://twitter.com"
                className="text-gray-600 hover:text-gray-800"
              >
                <Image src="/svg/x.svg" alt="X" width={20} height={20} />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-600 hover:text-gray-800"
              >
                <Image
                  src="/svg/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="mailto:info@pastore.com"
                className="text-gray-600 hover:text-gray-800"
              >
                <Image src="/svg/mail.svg" alt="Email" width={20} height={20} />
              </Link>
              <WhatsAppButton phoneNumber="31687887743" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p className="mb-2 sm:mb-0">
              © 2024 PaStore. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-0">
              <Link href="/privacy-policy" className="hover:text-gray-800">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="hover:text-gray-800">
                Terms of use
              </Link>
              <div className="flex items-center justify-center sm:justify-start">
                <Image
                  src="/svg/phone.svg"
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
