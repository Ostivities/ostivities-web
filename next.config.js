/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_CLOUDINARY_API_URL: process.env.NEXT_PUBLIC_CLOUDINARY_API_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
    NEXT_PUBLIC_EVENT_DISCOVERY_URL: process.env.NEXT_PUBLIC_EVENT_DISCOVERY_URL,
    NEXT_PUBLIC_OSTIVITIES_USER_PROFILE_PICTURE: process.env.NEXT_PUBLIC_OSTIVITIES_USER_PROFILE_PICTURE,
    NEXT_PUBLIC_OSTIVITIES_EVENT_SUPPORTING_DOCS: process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_SUPPORTING_DOCS,
    NEXT_PUBLIC_OSTIVITIES_EVENT_APPEARANCE_IMAGES: process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_APPEARANCE_IMAGES,
    NEXT_PUBLIC_OSTIVITIES_EVENT_EMAIL_ATTACHMENT_IMAGE: process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_EMAIL_ATTACHMENT_IMAGE,
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    removeConsole: true,
  },
};

module.exports = nextConfig;
