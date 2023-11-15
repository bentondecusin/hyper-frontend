/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        // destination:
        //   process.env.NODE_ENV === "development"
        //     ? "http://127.0.0.1:5000/api/:path*"
        //     : "/api/",
        destination: "http://127.0.0.1:5000/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cis.cornell.edu",
        port: "",
        pathname: "/sites/**",
      },
    ],
  },
};

module.exports = nextConfig;
