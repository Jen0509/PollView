/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_TARGET === "GH_PAGES";

const nextConfig = {
    reactStrictMode: true,
    output: "export",
    basePath: isGithubPages ? "/PollView" : "",
    assetPrefix: isGithubPages ? "/PollView/" : ""
};

export default nextConfig;
