<script lang="ts">
  import type { PageProps } from './$types';
  import { sections } from '$lib/sections';

  let { data }: PageProps = $props();
  const section = $derived(data.section);

  // Placeholder products. Later these come from Medusa.
  const featured = $derived(
    section.categories.slice(0, 8).map((c, i) => ({
      name: `${c.name} · Signature`,
      category: c.name,
      price: 799 + i * 350,
      theme: c.theme
    }))
  );
  const others = $derived(sections.filter((s) => s.slug !== section.slug));
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
        <a
          href="/{section.slug}/{cat.slug}"
          data-theme={cat.theme}
          class="group relative flex aspect-square items-end overflow-hidden border border-white/10 p-4 transition duration-500 hover:-translate-y-1 hover:border-metal"
          style="background: radial-gradient(circle at 70% 20%, var(--accent), var(--surface) 45%, var(--bg) 100%);"
        >
          <span class="absolute top-4 right-4 text-metal/60 transition group-hover:rotate-45 group-hover:text-metal">◆</span>
          <span class="font-display text-xl text-fg md:text-2xl">{cat.name}</span>
        </a>
      {/each}
    </div>
  </section>

  <!-- FEATURED (placeholder) -->
  <section class="mx-auto max-w-7xl px-6 pb-24">
    <h2 class="mb-10 text-center font-display text-4xl text-metal">Featured</h2>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
      {#each featured as product}
        <article data-theme={product.theme} class="group">
          <div
            class="relative flex aspect-[3/4] items-center justify-center overflow-hidden border border-white/10 transition duration-500 group-hover:border-metal"
            style="background: linear-gradient(160deg, var(--surface), var(--bg));"
          >
            <!-- Later: swap this span for <img src={product.thumbnail} alt={product.name} /> -->
            <span class="text-5xl text-metal/40 transition duration-700 group-hover:scale-125 group-hover:text-metal">◆</span>
          </div>
          <h3 class="mt-4 font-display text-lg text-fg">{product.name}</h3>
          <p class="text-sm text-metal">₹{product.price.toLocaleString('en-IN')}</p>
        </article>
      {/each}
    </div>
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