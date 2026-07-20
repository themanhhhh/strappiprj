# Deploy Strapi CMS len VPS

Huong dan nay dung cho CMS Strapi trong `apps/cms`, khi frontend/page da deploy thanh cong va can them CMS o subdomain rieng, vi du `cms.your-domain.com`.

## Kien truc khuyen nghi

- Frontend/page: `https://your-domain.com`
- CMS admin/API: `https://cms.your-domain.com`
- Strapi chay noi bo tren VPS port `1337`
- Nginx reverse proxy tu `cms.your-domain.com` ve `127.0.0.1:1337`
- PM2 giu process Strapi chay nen
- Database: MySQL/MariaDB hoac PostgreSQL. Khong nen dung SQLite cho production.

## 1. Tro DNS ve VPS

Tao record DNS:

```text
Type: A
Name: cms
Value: VPS_PUBLIC_IP
Proxy: DNS only neu dang dung Cloudflare va chua chac cau hinh upload/admin
```

Cho DNS propagate xong, test:

```bash
ping cms.your-domain.com
```

## 2. Cai Node, PM2, Nginx tren VPS

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y nginx git unzip build-essential
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
node -v
npm -v
pm2 -v
```

Strapi 5 trong project nay yeu cau Node `>=20 <=24`, nen Node 20 hoac 22 deu duoc.

## 3. Tao database

Neu PostgreSQL da co san tren he thong, chi can lay cac thong tin sau:

```text
DATABASE_HOST
DATABASE_PORT
DATABASE_NAME
DATABASE_USERNAME
DATABASE_PASSWORD
DATABASE_SSL
```

Neu database nam cung VPS voi CMS, thuong dung:

```text
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_SSL=false
```

Neu can tao database PostgreSQL moi:

```bash
sudo -u postgres psql
```

Trong PostgreSQL shell:

```sql
CREATE DATABASE newsky_cms;
CREATE USER newsky_cms WITH ENCRYPTED PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE newsky_cms TO newsky_cms;
\c newsky_cms
GRANT ALL ON SCHEMA public TO newsky_cms;
ALTER SCHEMA public OWNER TO newsky_cms;
\q
```

File `.env` cho PostgreSQL:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=newsky_cms
DATABASE_USERNAME=newsky_cms
DATABASE_PASSWORD=CHANGE_THIS_PASSWORD
DATABASE_SSL=false
```

Hoac dung connection string:

```env
DATABASE_CLIENT=postgres
DATABASE_URL=postgres://newsky_cms:CHANGE_THIS_PASSWORD@127.0.0.1:5432/newsky_cms
DATABASE_SSL=false
```

Neu dung MySQL/MariaDB:

```bash
sudo apt install -y mariadb-server
sudo mysql
```

Trong MySQL shell:

```sql
CREATE DATABASE newsky_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'newsky_cms'@'localhost' IDENTIFIED BY 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON newsky_cms.* TO 'newsky_cms'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 4. Upload source CMS len VPS

Vi root repo dang ignore `/apps/cms/`, neu VPS pull repo chinh thi CMS se khong co san. Chon mot trong hai cach:

- Upload rieng toan bo thu muc `apps/cms` len VPS.
- Hoac push `apps/cms` thanh repo rieng roi clone repo CMS tren VPS.

Vi du duong dan tren VPS:

```bash
sudo mkdir -p /var/www/newsky-cms
sudo chown -R $USER:$USER /var/www/newsky-cms
```

Sau khi upload, thu muc `/var/www/newsky-cms` can co cac file/thuc muc nhu:

```text
config/
database/
public/
src/
types/
package.json
package-lock.json
server.js
tsconfig.json
```

Khong can upload `node_modules/`, `.git/`, file log, hoac `.env` local co secret cu.

## 5. Tao file `.env` tren VPS

Trong `/var/www/newsky-cms/.env`:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://cms.your-domain.com
IS_PROXIED=true

APP_KEYS=generate-long-random-1,generate-long-random-2,generate-long-random-3,generate-long-random-4
API_TOKEN_SALT=generate-long-random
ADMIN_JWT_SECRET=generate-long-random
TRANSFER_TOKEN_SALT=generate-long-random
JWT_SECRET=generate-long-random
ENCRYPTION_KEY=generate-32-char-random

DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=newsky_cms
DATABASE_USERNAME=newsky_cms
DATABASE_PASSWORD=CHANGE_THIS_PASSWORD
DATABASE_SSL=false

UPLOAD_CLOUDINARY_ENABLED=false
```

Tao secret nhanh tren VPS:

```bash
openssl rand -base64 32
```

`ENCRYPTION_KEY` nen la chuoi 32 ky tu. Vi du tao bang:

```bash
openssl rand -hex 16
```

Voi `UPLOAD_CLOUDINARY_ENABLED=false`, Strapi luu file upload truc tiep vao `public/uploads` tren VPS.

Can tao va cap quyen thu muc upload:

```bash
cd /var/www/newsky-cms
mkdir -p public/uploads
chmod -R 755 public/uploads
```

Neu Strapi chay bang user rieng, doi owner cho dung user dang chay PM2:

```bash
sudo chown -R $USER:$USER /var/www/newsky-cms/public/uploads
```

Khong xoa `public/uploads` khi deploy lai. Neu upload source moi bang rsync, nen exclude thu muc nay:

```bash
rsync -av --exclude node_modules --exclude .env --exclude public/uploads ./apps/cms/ user@server:/var/www/newsky-cms/
```

Nen backup thu muc upload dinh ky:

```bash
tar -czf newsky-cms-uploads-$(date +%F).tar.gz -C /var/www/newsky-cms/public uploads
```

## 6. Cai dependency va build CMS

```bash
cd /var/www/newsky-cms
npm ci
npm run build
```

Neu VPS it RAM va build bi kill, tao swap tam:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## 7. Chay CMS bang PM2

```bash
cd /var/www/newsky-cms
pm2 start server.js --name newsky-cms
pm2 save
pm2 startup
```

Kiem tra log:

```bash
pm2 logs newsky-cms
```

Test noi bo:

```bash
curl http://127.0.0.1:1337/admin
```

## 8. Cau hinh Nginx reverse proxy

Repo da co file mau tai `deploy/nginx/newsky-cms.conf`. Tren VPS, copy file nay thanh `/etc/nginx/sites-available/newsky-cms`, sau do thay `cms.your-domain.com` bang domain CMS that.

Neu tao thu cong, noi dung nhu sau:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name cms.your-domain.com;

    client_max_body_size 100M;

    location /uploads/ {
        alias /var/www/newsky-cms/public/uploads/;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;

        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/newsky-cms /etc/nginx/sites-enabled/newsky-cms
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Cai SSL

Neu dung Let's Encrypt:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cms.your-domain.com
```

Sau do mo:

```text
https://cms.your-domain.com/admin
```

Tao admin user dau tien trong Strapi.

## 10. Tao API token cho frontend

Trong Strapi Admin:

- Vao `Settings` -> `API Tokens`
- Tao token read-only cho cac content type frontend can doc
- Neu form lien he gui vao CMS, token can them quyen create cho `contact-submissions`

## 11. Cap nhat bien moi truong cua page

Trong app frontend/page dang chay tren VPS, dat:

```env
NEXT_PUBLIC_STRAPI_URL=https://cms.your-domain.com
STRAPI_URL=https://cms.your-domain.com
STRAPI_API_TOKEN=your-strapi-api-token
```

Sau do rebuild/restart page:

```bash
pm2 restart your-page-app-name
```

Neu frontend build-time doc `NEXT_PUBLIC_STRAPI_URL`, nen rebuild lai frontend sau khi doi bien moi truong.

## 12. Checklist kiem tra

- `https://cms.your-domain.com/admin` mo duoc admin Strapi.
- `https://cms.your-domain.com/api/services` tra ve JSON hoac loi 403 neu chua public/token, khong phai loi Nginx.
- Page frontend khong con dung fallback data khi CMS co noi dung.
- Form lien he khong bao `Server configuration is incomplete`.
- `pm2 logs newsky-cms` khong co loi database, secret, Cloudinary.

## Lenh deploy lai sau khi sua CMS

```bash
cd /var/www/newsky-cms
npm ci
npm run build
pm2 restart newsky-cms
```
