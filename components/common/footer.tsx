import { links } from "@/data";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border text-foreground transition-colors duration-500 dark:bg-gray-950">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Church Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Image
              src="/assets/img/spac-logo.png"
              alt="SPAC OKE BOLA"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-muted-foreground mb-4 max-w-xs">
              The Action Place of the Holy Spirit
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-lg mb-4 text-foreground dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-lg mb-4 text-foreground dark:text-white">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3 justify-center sm:justify-start">
                <MapPin
                  size={18}
                  className="text-primary/80 mb-1 sm:mb-0 mx-auto sm:mx-0 flex-shrink-0"
                />
                <span className="text-muted-foreground">
                  No 7, Koyejo Street, Oke Bola, Ibadan
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:gap-3 justify-center sm:justify-start">
                <Phone
                  size={18}
                  className="text-primary/80 mb-1 sm:mb-0 mx-auto sm:mx-0 flex-shrink-0"
                />
                <span className="text-muted-foreground">+234 800 000 0000</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:gap-3 justify-center sm:justify-start">
                <Mail
                  size={18}
                  className="text-primary/80 mb-1 sm:mb-0 mx-auto sm:mx-0 flex-shrink-0"
                />
                <span className="text-muted-foreground">
                  info@spacokebola.org
                </span>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-lg mb-4 text-foreground dark:text-white">
              Service Times
            </h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <span className="block font-medium text-primary">
                  Sunday Services
                </span>
                9:00 AM & 11:00 AM
              </li>
              <li className="text-muted-foreground">
                <span className="block font-medium text-primary">
                  Wednesday Bible Study
                </span>
                7:00 PM
              </li>
              <li className="text-muted-foreground">
                <span className="block font-medium text-primary">
                  Youth Group
                </span>
                Fridays at 6:30 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} SPAC OKE BOLA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
