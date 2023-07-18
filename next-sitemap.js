const excludedPaths = ["/checkout", "/account/*","/404",'*/404',
'*/change-password',
'*/downloads',
'*/logout',
'*/refunds',
'*/profile',
'*/checkout*',
'*/orders*',]

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
  generateRobotsTxt: true,
  exclude: excludedPaths + ["/[sitemap]"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: excludedPaths,
      },
    ],
  },
}
