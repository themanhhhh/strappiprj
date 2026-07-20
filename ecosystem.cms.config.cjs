module.exports = {
  apps: [
    {
      name: 'newsky-cms',
      cwd: '/var/www/newsky-cms',
      script: 'server.js',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'production',
      },
      max_memory_restart: '768M',
      time: true,
    },
  ],
};
