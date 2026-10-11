<!-- <script lang="ts">
  import './layout.css';
  let { children } = $props();
</script>

<header class="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
  <a href="/" class="font-script text-3xl text-white drop-shadow md:text-4xl">Iconic</a>
  <nav class="flex gap-6 text-sm tracking-widest text-white/80 uppercase">
    <a href="/shop" class="hover:text-white">Shop</a>
  </nav>
</header>

{@render children()} -->

<script lang="ts">
  import './layout.css';
  let { children } = $props();
</script>

<header class="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
  <a href="/" class="font-script text-3xl text-white drop-shadow md:text-4xl">Iconic</a>
  <nav class="flex gap-5 text-xs tracking-widest text-white/80 uppercase md:gap-8">
    <a href="/shaan" class="hover:text-white">Shaan</a>
    <a href="/shringaar" class="hover:text-white">Shringaar</a>
    <a href="/shauq" class="hover:text-white">Shauq</a>
  </nav>
</header>

{@render children()}