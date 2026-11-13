<script lang="ts">
  import { cart } from '$lib/cart.svelte';
  import { formatPrice } from '$lib/store';
  import CartLines from '$lib/components/CartLines.svelte';
</script>

<svelte:head>
  <title>Your Bag · Iconic</title>
</svelte:head>

<div class="min-h-screen bg-[#101012] px-6 pt-32 pb-24 text-white">
  <div class="mx-auto max-w-3xl">
    <h1 class="mb-8 font-script text-6xl">Your Bag</h1>
    <CartLines />

    {#if cart.items.length}
      <div class="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <span class="text-white/60">Subtotal</span>
        <span class="text-2xl text-[#e2c48a]">{formatPrice(cart.subtotal, cart.currency)}</span>
      </div>
      <a
  href="/checkout"
  class="mt-8 block w-full bg-[#e2c48a] py-4 text-center text-sm tracking-[0.3em] text-black uppercase transition hover:brightness-110"
>
  Checkout
</a>
    {/if}
  </div>
</div>