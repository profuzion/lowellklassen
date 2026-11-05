/** PM2 config if the site runs on your own server behind Cloudflare/nginx. */
module.exports = {
  apps: [
    {
      name: "lowellklassen",
      cwd: __dirname,
      script: "server.js",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
    },
  ],
};
