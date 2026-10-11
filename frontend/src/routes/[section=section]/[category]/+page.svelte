<script lang="ts">
  import type { PageProps } from './$types';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { lowestPrice } from '$lib/store';

  let { data }: PageProps = $props();
  let sort = $state('newest');

  const sorted = $derived.by(() => {
    const list = [...data.products];
    if (sort === 'low') list.sort((a, b) => (lowestPrice(a) ?? 0) - (lowestPrice(b) ?? 0));
    if (sort === 'high') list.sort((a, b) => (lowestPrice(b) ?? 0) - (lowestPrice(a) ?? 0));
    return list;
  });
</script>

<svelte:head>
  <title>{data.category.name} · {data.section.word}</title>
</svelte:head>

<div data-theme={data.category.theme ?? data.section.slug} class="min-h-screen bg-bg text-fg">
  <section
    class="px-6 pt-36 pb-14 text-center"
    style="background: radial-gradient(circle at 50% 0%, var(--surface), var(--bg) 70%);"
  >
    <a href="/{data.section.slug}" class="text-xs tracking-[0.4em] text-metal uppercase hover:underline">
      ← {data.section.word}
    </a>
    <h1 class="mt-4 font-script text-6xl md:text-8xl">{data.category.name}</h1>
    <p class="mt-3 text-sm text-fg/60">{data.products.length} pieces</p>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-14">
    {#if data.offline}
      <p class="py-20 text-center text-fg/70">
        Can't reach the store backend. Is <code>npm run dev</code> running in <code>apps/backend</code>?
      </p>
    {:else if data.products.length === 0}
      <p class="py-20 text-center font-display text-2xl text-fg/70">New pieces arriving soon.</p>
    {:else}
      <div class="mb-8 flex justify-end">
        <select bind:value={sort} class="border border-white/20 bg-surface px-3 py-2 text-sm text-fg">
          <option value="newest">Newest</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {#each sorted as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    {/if}
  </section>
</div>