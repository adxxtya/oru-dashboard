await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com", "raw.githubusercontent.com", "axkdcpjgskqzvafvhoun.supabase.co"]
  },
};

export default config;
