import React from 'react';
import { LuMessageCircle } from 'react-icons/lu';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919381625959"
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Contact Darur Life Studio Owner"
    >
      <LuMessageCircle />
    </a>
  );
}
