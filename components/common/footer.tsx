import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

import { links } from '@/data';
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
          {/* Church Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-serif mb-4">SPAC OKE BOLA</h3>
            <p className="text-muted-foreground mb-4">
              The Action Place of the Holy Spirit
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary/80 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">No 7, Koyejo Street, Oke Bola, Ibadan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary/80 flex-shrink-0" />
                <span className="text-muted-foreground">+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary/80 flex-shrink-0" />
                <span className="text-muted-foreground">info@spacokebola.org</span>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4">Service Times</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                <span className="block font-medium text-primary">Sunday Services</span>
                9:00 AM & 11:00 AM
              </li>
              <li className="text-muted-foreground">
                <span className="block font-medium text-primary">Wednesday Bible Study</span>
                7:00 PM
              </li>
              <li className="text-muted-foreground">
                <span className="block font-medium text-primary">Youth Group</span>
                Fridays at 6:30 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} SPAC OKE BOLA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};