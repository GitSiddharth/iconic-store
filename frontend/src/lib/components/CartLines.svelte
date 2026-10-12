<script lang="ts">
  import { cart } from '$lib/cart.svelte';
  import { formatPrice } from '$lib/store';
</script>

{#if cart.items.length === 0}
  <p class="py-16 text-center font-display text-2xl text-white/60">Your bag is empty.</p>
{:else}
  <ul class="divide-y divide-white/10">
    {#each cart.items as item (item.id)}
      <li class="flex gap-4 py-5">
        <a
          href="/products/{item.product_handle}"
          class="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden border border-white/10 bg-white/5"
        >
          {#if item.thumbnail}
            <img src={item.thumbnail} alt={item.product_title ?? item.title} class="h-full w-full object-cover" />
          {:else}
            <span class="text-2xl text-[#e2c48a]/50">◆</span>
          {/if}
        </a>

        <div class="flex flex-1 flex-col justify-between">
          <div>
            <p class="font-display text-lg leading-tight">{item.product_title ?? item.title}</p>
            {#if item.variant_title}
              <p class="text-xs text-white/50">{item.variant_title}</p>
            {/if}
            <p class="mt-1 text-sm text-[#e2c48a]">{formatPrice(item.unit_price, cart.currency)}</p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center border border-white/20">
              <button
                class="px-3 py-1 hover:bg-white/10"
                disabled={cart.busy}
                onclick={() => cart.setQty(item.id, item.quantity - 1)}
                aria-label="Decrease quantity">−</button
              >
              <span class="min-w-8 text-center text-sm">{item.quantity}</span>
              <button
                class="px-3 py-1 hover:bg-white/10"
                disabled={cart.busy}
                onclick={() => cart.setQty(item.id, item.quantity + 1)}
                aria-label="Increase quantity">+</button
              >
            </div>
            <button
              class="text-xs tracking-widest text-white/50 uppercase hover:text-white"
              disabled={cart.busy}
              onclick={() => cart.remove(item.id)}>Remove</button
            >
          </div>
        </div>
      </li>
    {/each}
  </ul>
{/if}