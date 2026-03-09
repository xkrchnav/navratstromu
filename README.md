# Návrat stromků – Astro web

Web je postavený v **Astro + Tailwind + MDX**.

## Rychlý start

```bash
npm install
npm run dev
```

Produkční build:

```bash
npm run build
```

---

## Jak používat reálné obrázky v MDX blogu (Astro Image optimalizace)

V projektu je připravená komponenta `src/components/MdxImage.astro`, která interně používá:

```astro
import { Image } from "astro:assets";
```

To znamená, že obrázky v blogu budou optimalizované Astro pipeline (resizing, moderní formáty, lazy loading).

### 1) Nahrajte obrázek do `src/assets/`

Např.:

`src/assets/blog/moje-jablon.jpg`

> Důležité: Pro optimalizaci používejte obrázky ze `src/assets`, ne z `public`.

### 2) Importujte obrázek v `.mdx` článku

```mdx
import MdxImage from "../../components/MdxImage.astro";
import mojeJablon from "../../assets/blog/moje-jablon.jpg";
```

### 3) Vložte komponentu do textu

```mdx
<MdxImage
  src={mojeJablon}
  alt="Mladá jabloň po výsadbě"
  caption="Jaro 2026 – první týden po výsadbě"
  align="left"
  width={1200}
  height={900}
/>
```

Parametry:

- `src` – importovaný obrázek ze `src/assets`
- `alt` – povinný popis obrázku
- `caption` – volitelný popisek
- `align` – `"left"` nebo `"right"` (obtékání textem)
- `width`, `height` – doporučeno uvádět skutečný poměr stran
- `loading` – volitelně `"lazy"` (default) nebo `"eager"`

---

## Kde jsou demo obrázky

- `src/assets/blog/stare-odrudy-demo.svg`

Použití najdete v:

- `src/content/blog/jak-sazet-jablone.mdx`
- `src/content/blog/stare-odrudy-se-vraci.mdx`

---

## Nový článek = stačí přidat `.mdx` soubor

Homepage náhledy článků (`src/pages/index.astro`) se berou automaticky z frontmatteru blog postu.

### Povinné frontmatter položky

Každý nový článek v `src/content/blog/*.mdx` musí mít tyto 3 položky:

```mdx
---
title: Název článku
description: Krátký perex článku
pubDate: 2026-03-09
---
```

### Volitelné frontmatter položky

```mdx
---
author: Redakce Návrat stromků
previewImage: ../../assets/blog/moje-fotka.jpg
previewImageAlt: Popis náhledového obrázku
---
```

Pravidla defaultů:

- `author` je volitelný, default je **`Redakce Návrat stromků`**.
- `previewImage` je volitelný, default je **`src/assets/blog/stare-odrudy-demo.svg`**.
- `previewImageAlt` je volitelný; pokud není vyplněný, použije se automaticky hodnota z `title`.

Tím pádem při přidání nového článku už nemusíte upravovat `index.astro`.
Stačí:

1. přidat nový `.mdx` do `src/content/blog/` s povinným frontmatterem,
2. volitelně přidat vlastní obrázek do `src/assets/blog/` a připojit ho přes `previewImage`.

Náhled v sekci **„Z našeho blogu“** i detail článku se vykreslí automaticky.

---

## Jak nahradit skeletony skutečnými fotkami

Skeletony jsou zatím na několika místech landing/blog stránky:

- `src/pages/index.astro` (hero, příběh, náhledy článků)
- `src/pages/blog/[slug].astro` (hlavní obrázek článku)

### Doporučený postup

1. Přidejte fotky do `src/assets/...`
2. V `.astro` stránce importujte obrázek:

```astro
---
import { Image } from "astro:assets";
import heroSad from "../assets/hero-sad.jpg";
---
```

3. Nahraďte skeleton `<div class="skeleton-image ...">` komponentou `<Image />`:

```astro
<Image
  src={heroSad}
  alt="Sad v Lysicích na jaře"
  width={1600}
  height={900}
  class="rounded-lg border border-leaf/15 shadow-sm"
/>
```

Takto budou obrázky konzistentně optimalizované v celém webu.
