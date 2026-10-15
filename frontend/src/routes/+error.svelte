<script lang="ts">
  import { page } from '$app/state';

  const notFound = $derived(page.status === 404);
</script>

<svelte:head>
  <title>{page.status} · Iconic</title>
</svelte:head>

<div
  class="flex min-h-screen flex-col items-center justify-center px-6 text-center text-white"
  style="background: radial-gradient(circle at 50% 30%, #2a2a30, #101012 70%);"
>
  <p class="text-xs tracking-[0.5em] text-[#e2c48a] uppercase">Error {page.status}</p>
  <h1 class="mt-4 font-script text-7xl md:text-9xl">
    {notFound ? 'Lost in the treasure' : 'Something slipped'}
  </h1>
  <p class="mt-6 max-w-md font-display text-xl text-white/70">
    {notFound
      ? "The page you're looking for isn't here. Let's take you somewhere beautiful."
      : 'We hit a snag on our side. Please try again in a moment.'}
  </p>

  <div class="mt-10 flex flex-wrap items-center justify-center gap-6">
    <a href="/shaan" class="font-script text-4xl text-[#e2c48a] transition hover:scale-110">Shaan</a>
    <a href="/shringaar" class="font-script text-4xl text-[#e2c48a] transition hover:scale-110">Shringaar</a>
    <a href="/shauq" class="font-script text-4xl text-[#e2c48a] transition hover:scale-110">Shauq</a>
  </div>

  <a
    href="/"
    class="mt-10 border border-[#e2c48a] px-8 py-3 text-xs tracking-[0.3em] text-[#e2c48a] uppercase transition hover:bg-[#e2c48a] hover:text-black"
  >
    Back home
  </a>
</div>