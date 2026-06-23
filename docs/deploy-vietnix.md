# Deploy Web + Strapi CMS len Vietnix

Repo co 2 app:

- `apps/cms`: Strapi 5 CMS.
- `apps/web`: Next.js frontend ket noi den Strapi qua API.

Nen deploy thanh 2 Node.js App rieng tren Vietnix:

- `cms.your-domain.com` cho Strapi.
- `your-domain.com` hoac `www.your-domain.com` cho Next.js.

## 1. Chuan bi database cho CMS

Strapi hien ho tro `sqlite`, `mysql`, `postgres` trong `apps/cms/config/database.ts`.

Khuyen nghi tren hosting/Vietnix:

- Dung PostgreSQL neu goi hosting/VPS co ho tro.
- Dung MySQL neu shared cPanel chi co MySQL.
- Khong dung SQLite cho production neu website co cap nhat noi dung thuong xuyen.

Tao database va user trong Vietnix/cPanel, ghi lai:

```text
DATABASE_HOST
DATABASE_PORT
DATABASE_NAME
DATABASE_USERNAME
DATABASE_PASSWORD
```

Voi thong tin phpMyAdmin/Vietnix trong anh, server database dang la MariaDB qua `localhost:3306`, nen dung cau hinh MySQL cho Strapi.

## 2. Bien moi truong cho CMS

Trong Node.js App cua Strapi (`cms.your-domain.com`), tao cac bien:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate-long-random-1,generate-long-random-2,generate-long-random-3,generate-long-random-4
API_TOKEN_SALT=generate-long-random
ADMIN_JWT_SECRET=generate-long-random
TRANSFER_TOKEN_SALT=generate-long-random
JWT_SECRET=generate-long-random
ENCRYPTION_KEY=generate-32-char-random
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=your_database
DATABASE_USERNAME=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=false
```

Trong cPanel, `DATABASE_NAME` va `DATABASE_USERNAME` thuong co tien to tai khoan, vi du `newskyfn_strapi` va `newskyfn_strapiuser`. Khong dung user phpMyAdmin hien thi neu ban chua cap quyen user do cho database.

Neu dung PostgreSQL, doi thanh:

```env
DATABASE_CLIENT=postgres
DATABASE_PORT=5432
```

Khong upload `apps/cms/.env` len hosting neu file nay chua secret local. Nhap bien moi truong trong cPanel hoac tao `.env` rieng tren server.

## 3. Deploy Strapi CMS

Neu build tren may local:

```bash
pnpm install
pnpm build:cms
```

Upload cac file/thuc muc can thiet cua `apps/cms` len thu muc app CMS tren Vietnix, vi du `/home/USER/cms-app`:

```text
config/
database/
dist/
public/
src/
types/
favicon.png
package.json
package-lock.json
server.js
tsconfig.json
```

Trong cPanel `Setup Node.js App` cho CMS:

- Node.js version: 20 hoac 22.
- Application mode: `Production`.
- Application root: `cms-app`.
- Application URL: `cms.your-domain.com`.
- Application startup file: `server.js`.
- Chay `npm install --omit=dev` trong terminal cua app.
- Chay `npm run build` neu chua upload `dist/` da build.
- Restart app.

Sau khi CMS chay, vao:

```text
https://cms.your-domain.com/admin
```

Tao admin user, tao API Token co quyen read cac content type frontend can doc va create cho `contact-submissions`.

## 4. Bien moi truong cho frontend

Trong Node.js App cua Next.js frontend, tao cac bien:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_STRAPI_URL=https://cms.your-domain.com
STRAPI_URL=https://cms.your-domain.com
STRAPI_API_TOKEN=your-strapi-api-token
OPENAI_API_KEY=your-openai-api-key
```

Khong upload `apps/web/.env.local` len hosting. File nay co secret local.

## 5. Build frontend Next.js

Tu thu muc goc repo:

```bash
pnpm install
pnpm build:web:cpanel
```

Lenh nay tao Next.js standalone server va copy static/public vao dung thu muc.

Neu build tren Windows bi loi `EPERM: operation not permitted, symlink ...`, day la loi quyen tao symlink cua pnpm/Next standalone. Co 3 cach xu ly:

- Build tren Linux/macOS hoac build truc tiep tren hosting/VPS.
- Bat Windows Developer Mode roi build lai.
- Chay terminal bang quyen Administrator roi build lai.

Thu muc can upload thuong la:

```text
apps/web/.next/standalone/apps/web
```

Neu `server.js` nam truc tiep trong `apps/web/.next/standalone`, upload thu muc do thay vi `apps/web/.next/standalone/apps/web`.

## 6. Deploy frontend Next.js

Trong File Manager hoac SFTP, upload toan bo noi dung thu muc standalone co `server.js` len thu muc app tren hosting, vi du:

```text
/home/USER/newsky-app
```

Thu muc sau upload can co dang:

```text
server.js
package.json
.next/
public/
node_modules/
```

Khong upload source repo day du neu khong can. Khong upload `.env.local`.

Trong cPanel Vietnix:

- Vao `Setup Node.js App`.
- Chon Node.js version 20 hoac 22.
- Application mode: `Production`.
- Application root: thu muc da upload, vi du `newsky-app`.
- Application startup file: `server.js`.
- Application URL: domain/subdomain can chay website.
- Them cac environment variables o buoc 1.
- Bam `Run NPM Install` neu cPanel yeu cau.
- Bam `Restart`.

## 7. Kiem tra sau deploy

Mo cac URL:

```text
https://cms.your-domain.com/admin
https://your-domain.com/vi
https://your-domain.com/en
https://your-domain.com/vi/lien-he
```

Gui thu form lien he. Neu loi `Server configuration is incomplete`, thieu `STRAPI_URL` hoac `STRAPI_API_TOKEN`. Neu loi `Strapi submission failed`, token Strapi thieu quyen tao `contact-submissions` hoac CMS URL sai.

## 8. Luu y upload media

Config CMS hien chua cau hinh S3/R2 upload provider, nen Strapi se luu file upload trong `apps/cms/public/uploads`. Tren shared hosting, can backup thu muc nay. Neu deploy lai ma xoa `public/uploads`, anh trong CMS se mat.

Neu du an co nhieu anh, nen cau hinh upload provider S3/R2 sau.

## 9. Bao mat truoc khi public

Rotate lai cac key neu `.env.local` tung duoc chia se:

- `STRAPI_API_TOKEN`
- `OPENAI_API_KEY`
- Cac Strapi app secrets trong `apps/cms/.env`

## 10. Neu deploy bang Git

`apps/cms` hien la Git repo rieng va root repo dang ignore `/apps/cms/`. Neu Vietnix pull tu root repo, CMS se khong tu dong nam trong source root.

Co 2 cach don gian:

- Push `apps/cms` len mot repository rieng, cau hinh Node.js App CMS pull repository do.
- Hoac chuyen CMS vao root repo/submodule co chu dich, roi cap nhat `.gitignore` va quy trinh deploy.
