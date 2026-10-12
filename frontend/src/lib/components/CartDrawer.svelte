<script lang="ts">
  import { cart } from '$lib/cart.svelte';
  import { formatPrice } from '$lib/store';
  import CartLines from './CartLines.svelte';
</script>

{#if cart.open}
  <button
    aria-label="Close bag"
    class="fixed inset-0 z-40 cursor-default bg-black/60"
    onclick={() => (cart.open = false)}
  ></button>
{/if}

<aside
  inert={!cart.open}
  class="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-[#101012] text-white transition-transform duration-500 {cart.open
    ? 'translate-x-0'
    : 'translate-x-full'}"
>
  <div class="flex items-center justify-between border-b border-white/10 px-6 py-5">
    <h2 class="font-script text-4xl">Your Bag</h2>
    <button class="text-2xl text-white/60 hover:text-white" onclick={() => (cart.open = false)} aria-label="Close">×</button>
  </div>

  <div class="flex-1 overflow-y-auto px-6">
    <CartLines />
  </div>

  {#if cart.items.length}
    <div class="border-t border-white/10 px-6 py-6">
      <div class="mb-4 flex justify-between text-sm">
        <span class="text-white/60">Subtotal</span>
        <span class="text-[#e2c48a]">{formatPrice(cart.subtotal, cart.currency)}</span>
      </div>
      <a
        href="/cart"
        onclick={() => (cart.open = false)}
        class="block border border-[#e2c48a] py-3 text-center text-xs tracking-[0.3em] text-[#e2c48a] uppercase transition hover:bg-[#e2c48a] hover:text-black"
      >
        View bag
      </a>
      <p class="mt-3 text-center text-xs text-white/40">Checkout coming soon</p>
    </div>
  {/if}
</aside>