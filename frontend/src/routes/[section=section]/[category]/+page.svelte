<script lang="ts">
  import type { PageProps } from './$types';
  import { sections } from '$lib/sections';
  import ProductCard from '$lib/components/ProductCard.svelte';

  let { data }: PageProps = $props();
  const section = $derived(data.section);
  const featured = $derived(data.products.slice(0, 8));
  const others = $derived(sections.filter((s) => s.slug !== section.slug));

  // First product photo found inside a category, used as that tile's image.
  function thumbFor(slug: string): string | undefined {
    return data.products.find(
      (p: any) => p.thumbnail && p.categories?.some((c: any) => c.handle === slug)
    )?.thumbnail;
  }
</script>

<svelte:head>
  <title>{section.word} · Iconic</title>
</svelte:head>

<div data-theme={section.slug} class="min-h-screen bg-bg text-fg">
  <!-- HERO -->
  <section
    class="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    style="background: radial-gradient(circle at 50% 30%, var(--surface), var(--bg) 70%);"
  >
    <div class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-metal/10 blur-3xl"></div>

    <span class="mb-4 text-xs tracking-[0.5em] text-metal uppercase">{section.line}</span>
    <h1 class="font-script text-7xl text-fg md:text-9xl">{section.word}</h1>
    <p class="mt-6 max-w-md font-display text-xl text-fg/70 md:text-2xl">{section.blurb}</p>
    <a
      href="#collections"
      class="mt-10 border border-metal px-8 py-3 text-xs tracking-[0.3em] text-metal uppercase transition hover:bg-metal hover:text-bg"
    >
      Explore
    </a>
  </section>

  <!-- CATEGORIES -->
  <section id="collections" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="mb-10 text-center font-display text-4xl text-metal">Collections</h2>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {#each section.categories as cat}
        {@const thumb = thumbFor(cat.slug)}
        <a
          href="/{section.slug}/{cat.slug}"
          data-theme={cat.theme}
          class="group relative flex aspect-square items-end overflow-hidden border border-white/10 p-4 transition duration-500 hover:-translate-y-1 hover:border-metal"
          style="background: radial-gradient(circle at 70% 20%, var(--accent), var(--surface) 45%, var(--bg) 100%);"
        >
          {#if thumb}
            <img
              src={thumb}
              alt=""
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0"
              style="background: linear-gradient(to top, rgba(0,0,0,0.75), transparent 60%);"
            ></div>
          {/if}
          <span class="absolute top-4 right-4 z-10 text-metal/60 transition group-hover:rotate-45 group-hover:text-metal">◆</span>
          <span class="relative z-10 font-display text-xl text-fg md:text-2xl">{cat.name}</span>
        </a>
      {/each}
    </div>
  </section>

  <!-- FEATURED -->
  <section class="mx-auto max-w-7xl px-6 pb-24">
    <h2 class="mb-10 text-center font-display text-4xl text-metal">Featured</h2>
    {#if featured.length}
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
        {#each featured as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    {:else}
      <p class="py-10 text-center font-display text-2xl text-fg/60">New pieces arriving soon.</p>
    {/if}
  </section>

  <!-- OTHER SECTIONS -->
  <footer class="border-t border-white/10 py-16 text-center">
    <p class="mb-6 text-xs tracking-[0.4em] text-fg/50 uppercase">Explore more</p>
    <div class="flex flex-wrap items-center justify-center gap-10">
      {#each others as other}
        <a href="/{other.slug}" data-theme={other.slug} class="font-script text-5xl text-metal transition hover:scale-110">
          {other.word}
        </a>
      {/each}
    </div>
  </footer>
</div>