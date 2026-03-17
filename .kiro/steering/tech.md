# Tech Stack & Conventions

## Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Framework  | Next.js 16 (App Router)                      |
| Language   | TypeScript (strict mode)                     |
| Styling    | Tailwind CSS v4 + shadcn/ui (new-york style) |
| Icons      | Lucide React                                 |
| Theme      | next-themes                                  |
| Deployment | Vercel                                       |
| Analytics  | Vercel Web Analytics atau GA4                |

## Conventions

### Code Style

- ESLint + Prettier (sudah dikonfigurasi)
- Husky pre-commit: lint + format check
- Import sorting via `eslint-plugin-simple-import-sort`
- Path alias: `@/components`, `@/lib`, `@/hooks`

### Komponen

- Gunakan shadcn/ui untuk komponen UI dasar (Accordion, Button, dll)
- Server Components by default, tambahkan `"use client"` hanya jika butuh interaktivitas
- Props harus di-type secara eksplisit dengan TypeScript interface

### Styling

- Mobile-first: desain untuk 360px dulu, lalu scale up
- Gunakan Tailwind utility classes, hindari custom CSS kecuali untuk CSS variables
- Warna dan spacing konsisten via Tailwind theme/CSS variables di `globals.css`

### Performance

- Gambar: format `.webp`, gunakan `next/image` dengan lazy loading
- Video: embed dari YouTube (unlisted), jangan host sendiri
- Gunakan Static Site Generation (SSG) — halaman ini kontennya statis
- FCP target: < 1.5 detik di 3G

### Data Privacy

- TIDAK menyimpan PII apapun
- Semua interaksi personal via WhatsApp deep link
- Analytics hanya tracking anonim (page views, clicks, source parameter)

### Git

- Commit messages: conventional commits (feat, fix, chore, dll)
- Validasi pre-commit via lint-staged
