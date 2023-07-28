/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        esmExternals: true
    },
    images: {
        domains: ["uploadthing.com"]
    }
}

module.exports = nextConfig
