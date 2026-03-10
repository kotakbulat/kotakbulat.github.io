```markdown
---
title: Deploy Website Gratis dengan GitHub Pages: Panduan Setup dari Nol
date: 2026-03-07
tags: github, github-pages, web-development, deployment, tutorial
description: Panduan lengkap cara men-deploy website statis secara gratis menggunakan GitHub Pages, mulai dari membuat repository hingga website dapat diakses secara online.
image: blog-github-pages.png
---

## Kenapa GitHub Pages?

Bayangkan kamu sudah membuat website menggunakan **HTML, CSS, atau React**, tapi tidak tahu bagaimana cara membuatnya bisa diakses orang lain di internet.

Biasanya kita butuh:
- Hosting
- Domain
- Server

Namun ada cara yang jauh lebih sederhana: **GitHub Pages**.

GitHub Pages adalah layanan dari GitHub yang memungkinkan kamu **meng-host website statis secara gratis langsung dari repository GitHub**.

Cocok untuk:
- Portfolio developer
- Blog statis
- Dokumentasi project
- Landing page sederhana
- Demo project

Dan yang paling penting: **setup-nya sangat cepat**.

---

## Persiapan yang Dibutuhkan

Sebelum mulai, pastikan kamu sudah memiliki:

1. **Akun GitHub**
2. **Git terinstall di komputer**
3. **Project website statis**

Jika belum punya repository, kita akan membuatnya dari awal.

---

## 1. Membuat Repository Baru

Masuk ke GitHub lalu klik **New Repository**.

Gunakan format nama berikut jika ingin membuat website utama:

```

username.github.io

```

Contoh:

```

johnsmith.github.io

```

Repository ini akan otomatis menjadi alamat website kamu.

Jika menggunakan repository biasa, misalnya:

```

my-portfolio

```

maka alamat websitenya akan menjadi:

```

[https://username.github.io/my-portfolio](https://username.github.io/my-portfolio)

```

---

## 2. Upload Project Website

Sekarang upload file website kamu.

Contoh struktur project sederhana:

```

my-site
│
├── index.html
├── style.css
└── script.js

````

Push project ke GitHub:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/username/my-site.git
git push -u origin main
````

Setelah ini semua file akan muncul di repository GitHub.

---

## 3. Mengaktifkan GitHub Pages

Masuk ke repository kamu.

Lalu buka:

```
Settings → Pages
```

Di bagian **Source**, pilih:

```
Deploy from a branch
```

Kemudian pilih:

```
Branch: main
Folder: / (root)
```

Klik **Save**.

GitHub akan mulai melakukan proses deployment.

---

## 4. Mengakses Website

Biasanya dalam waktu **30–60 detik**, website sudah bisa diakses.

Alamatnya akan muncul di halaman GitHub Pages.

Contoh:

```
https://username.github.io/my-site
```

Jika semuanya benar, halaman website kamu akan muncul.

---

## 5. Update Website

Setiap kali kamu melakukan perubahan pada project, cukup lakukan push lagi:

```bash
git add .
git commit -m "update website"
git push
```

GitHub Pages akan otomatis **redeploy website**.

Artinya:

* Tidak perlu upload manual
* Tidak perlu login ke server
* Tidak perlu FTP

---

## 6. Jika Menggunakan React / Vite / Framework

Framework modern biasanya menghasilkan folder **build** atau **dist**.

Contoh Vite:

```bash
npm run build
```

Ini akan menghasilkan:

```
dist/
```

Folder inilah yang harus di-deploy ke GitHub Pages.

Beberapa cara umum:

1. **gh-pages branch**
2. **GitHub Actions**
3. **vite-plugin-gh-pages**

Untuk project React/Vite modern, biasanya deployment dilakukan secara otomatis menggunakan **GitHub Actions**.

---

## 7. Masalah yang Sering Terjadi

### 404 ketika refresh halaman

Jika menggunakan React Router dengan `BrowserRouter`, GitHub Pages bisa menghasilkan error:

```
404 Page Not Found
```

Solusi umum adalah menggunakan:

```
HashRouter
```

Sehingga URL menjadi:

```
#/about
#/blog
```

Ini menghindari masalah routing pada static hosting.

---

## 8. Menambahkan Custom Domain (Opsional)

GitHub Pages juga mendukung domain sendiri.

Contoh:

```
www.mywebsite.com
```

Caranya:

1. Beli domain
2. Masuk ke Settings → Pages
3. Isi bagian **Custom Domain**
4. Atur DNS record di provider domain

Setelah propagasi DNS selesai, website kamu bisa diakses dari domain tersebut.

---

## Kesimpulan

GitHub Pages adalah salah satu cara **termudah dan gratis** untuk mempublikasikan website.

Prosesnya hanya:

1. Buat repository
2. Upload project
3. Aktifkan GitHub Pages
4. Website langsung online

Tanpa:

* Server
* Hosting berbayar
* Konfigurasi rumit

Bagi developer pemula maupun profesional, GitHub Pages adalah cara yang sangat praktis untuk **menampilkan project ke dunia**.

Dan sering kali, itu adalah **langkah pertama sebelum masuk ke deployment yang lebih kompleks seperti cloud hosting atau CI/CD pipeline**.

```
```
