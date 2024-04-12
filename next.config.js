/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "uploadthing.com"
            },
            {
                hostname: "utfs.io"
            }
        ]
    },
    experimental: {
        webpackBuildWorker: true,
        esmExternals: false
    }
}

module.exports = nextConfig
