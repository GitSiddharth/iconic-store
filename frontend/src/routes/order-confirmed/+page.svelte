<script lang="ts">
  import { onMount } from 'svelte';
  import { formatPrice } from '$lib/store';

  let order = $state<any>(null);

  onMount(() => {
    try {
      const raw = sessionStorage.getItem('iconic_last_order');
      if (raw) order = JSON.parse(raw);
    } catch {
      /* ignore */
    }
  });
</script>

<svelte:head>
  <title>Order confirmed · Iconic</title>
</svelte:head>

<div
  class="flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center text-white"
  style="background: radial-gradient(circle at 50% 30%, #2a2a30, #101012 70%);"
>
  <p class="text-xs tracking-[0.5em] text-[#e2c48a] uppercase">Order confirmed</p>
  <h1 class="mt-4 font-script text-7xl md:text-9xl">Thank you</h1>

  {#if order}
    <p class="mt-6 font-display text-2xl text-white/80">Order #{order.display_id}</p>
    <p class="mt-2 text-sm text-white/50">We'll send updates to {order.email}</p>

    <ul class="mt-8 w-full max-w-md space-y-1 text-sm text-white/70">
      {#each order.items ?? [] as item}
        <li class="flex justify-between"><span>{item.quantity} × {item.product_title ?? item.title}</span></li>
      {/each}
    </ul>
    <p class="mt-6 text-xl text-[#e2c48a]">{formatPrice(order.total, order.currency_code)}</p>
  {:else}
    <p class="mt-6 max-w-md font-display text-xl text-white/70">Your order has been placed. We'll be in touch soon.</p>
  {/if}

  <a
    href="/"
    class="mt-12 border border-[#e2c48a] px-8 py-3 text-xs tracking-[0.3em] text-[#e2c48a] uppercase transition hover:bg-[#e2c48a] hover:text-black"
  >
    Keep shopping
  </a>
</div>