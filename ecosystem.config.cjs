/** PM2 config if the site runs on your own server behind Cloudflare/nginx. */
module.exports = {
  apps: [
    {
      name: "lowellklassen",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
    },
  ],
};
