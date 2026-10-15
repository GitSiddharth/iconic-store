<script lang="ts">
  import type { PageProps } from './$types';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { findPlacement } from '$lib/store';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.q ? `Results for "${data.q}"` : 'Search'} · Iconic</title>
</svelte:head>

<div class="min-h-screen bg-[#101012] px-6 pt-32 pb-24 text-white">
  <div class="mx-auto max-w-7xl">
    <h1 class="text-center font-script text-6xl">Search</h1>

    <form method="GET" action="/search" class="mx-auto mt-8 max-w-xl">
      <input
        name="q"
        value={data.q}
        type="search"
        placeholder="Search…"
        class="w-full border border-white/20 bg-transparent px-4 py-3 outline-none focus:border-[#e2c48a]"
      />
    </form>

    {#if data.offline}
      <p class="py-20 text-center text-white/70">
        Can't reach the store backend. Is <code>npm run dev</code> running in <code>apps/backend</code>?
      </p>
    {:else if !data.q}
      <p class="py-20 text-center font-display text-2xl text-white/50">What are you looking for?</p>
    {:else if data.products.length === 0}
      <p class="py-20 text-center font-display text-2xl text-white/60">Nothing found for "{data.q}".</p>
    {:else}
      <p class="mt-10 mb-6 text-sm text-white/50">{data.products.length} results for "{data.q}"</p>
      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {#each data.products as product (product.id)}
          <div data-theme={findPlacement(product).section?.slug}>
            <ProductCard {product} />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>