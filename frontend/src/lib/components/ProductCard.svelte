<script lang="ts">
  import { formatPrice, lowestPrice } from '$lib/store';

  let { product }: { product: any } = $props();
  const price = $derived(lowestPrice(product));
</script>

<a href="/products/{product.handle}" class="group block">
  <div
    class="relative aspect-[3/4] overflow-hidden border border-white/10 transition duration-500 group-hover:border-metal"
    style="background: linear-gradient(160deg, var(--surface), var(--bg));"
  >
    {#if product.thumbnail}
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    {:else}
      <div class="flex h-full items-center justify-center">
        <span class="text-5xl text-metal/40 transition duration-700 group-hover:scale-125 group-hover:text-metal">◆</span>
      </div>
    {/if}
  </div>
  <h3 class="mt-4 font-display text-lg text-fg">{product.title}</h3>
  {#if price != null}
    <p class="text-sm text-metal">{formatPrice(price)}</p>
  {/if}
</a>