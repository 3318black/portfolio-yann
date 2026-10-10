import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Next 16 n'autorise que 75 par défaut. 90 sert au portrait de la section
    // contact, où la compression à 75 adoucissait le texte du diplôme.
    qualities: [75, 90],
  },
};

export default nextConfig;
