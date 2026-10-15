<script lang="ts">
  import { goto, afterNavigate } from '$app/navigation';
  import { cart } from '$lib/cart.svelte';

  let menuOpen = $state(false);
  let searchOpen = $state(false);
  let query = $state('');
  let searchInput = $state<HTMLInputElement | undefined>();

  const sections = [
    { href: '/shaan', label: 'Shaan', theme: 'shaan' },
    { href: '/shringaar', label: 'Shringaar', theme: 'shringaar' },
    { href: '/shauq', label: 'Shauq', theme: 'shauq' }
  ];

  // Close any open overlay after moving to another page.
  afterNavigate(() => {
    menuOpen = false;
    searchOpen = false;
  });

  // Focus the search box when it opens.
  $effect(() => {
    if (searchOpen) searchInput?.focus();
  });

  // Stop the page behind an overlay from scrolling.
  $effect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      menuOpen = false;
      searchOpen = false;
    }
  }

  function submit(e: SubmitEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    searchOpen = false;
    goto(`/search?q=${encodeURIComponent(q)}`);
  }
</script>

<svelte:window onkeydown={onKey} />

<header class="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
  <a href="/" class="font-script text-3xl text-white drop-shadow md:text-4xl">Iconic</a>

  <!-- Desktop -->
  <nav class="hidden items-center gap-8 text-xs tracking-widest text-white/80 uppercase md:flex">
    {#each sections as s}
      <a href={s.href} class="hover:text-white">{s.label}</a>
    {/each}
    <button onclick={() => (searchOpen = true)} class="hover:text-white">Search</button>
    <button onclick={() => (cart.open = true)} class="hover:text-white">
      Bag{cart.count ? ` (${cart.count})` : ''}
    </button>
  </nav>

  <!-- Mobile -->
  <div class="flex items-center gap-5 text-xs tracking-widest text-white/80 uppercase md:hidden">
    <button onclick={() => (cart.open = true)}>Bag{cart.count ? ` (${cart.count})` : ''}</button>
    <button onclick={() => (menuOpen = true)} aria-label="Open menu">Menu</button>
  </div>
</header>

<!-- Mobile menu -->
{#if menuOpen}
  <div class="fixed inset-0 z-30 flex flex-col bg-[#0b0b0d] px-6 py-5 text-white md:hidden">
    <div class="flex items-center justify-between">
      <span class="font-script text-3xl">Iconic</span>
      <button onclick={() => (menuOpen = false)} class="text-3xl text-white/60" aria-label="Close menu">×</button>
    </div>

    <nav class="flex flex-1 flex-col items-center justify-center gap-6">
      {#each sections as s}
        <a href={s.href} data-theme={s.theme} class="font-script text-6xl text-metal">{s.label}</a>
      {/each}
      <button
        onclick={() => {
          menuOpen = false;
          searchOpen = true;
        }}
        class="mt-6 border-b border-white/30 pb-1 text-xs tracking-[0.3em] text-white/70 uppercase"
      >
        Search
      </button>
    </nav>

    <div class="flex justify-center gap-6 pb-4 text-xs tracking-widest text-white/40 uppercase">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
{/if}

<!-- Search overlay -->
{#if searchOpen}
  <div class="fixed inset-0 z-30 flex flex-col items-center bg-[#0b0b0d]/95 px-6 pt-32 text-white">
    <button
      class="absolute top-5 right-6 text-3xl text-white/60 hover:text-white"
      onclick={() => (searchOpen = false)}
      aria-label="Close search">×</button
    >
    <form onsubmit={submit} class="w-full max-w-2xl">
      <input
        bind:this={searchInput}
        bind:value={query}
        type="search"
        placeholder="Search jewellery, gifts, crafts…"
        class="w-full border-b border-white/30 bg-transparent pb-3 font-display text-3xl outline-none placeholder:text-white/30 focus:border-[#e2c48a] md:text-5xl"
      />
      <p class="mt-4 text-xs tracking-widest text-white/40 uppercase">Press Enter to search</p>
    </form>
  </div>
{/if}