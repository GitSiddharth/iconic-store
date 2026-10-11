<!-- <script lang="ts">
  import { onMount } from "svelte"
  import { sdk } from "$lib/medusa"

  let products = $state<any[]>([])

  onMount(async () => {
    const { products: fetched } = await sdk.store.product.list()
    products = fetched
  })
</script>

<h1>My Store</h1>

{#each products as product}
  <div>
    {#if product.thumbnail}
      <img src={product.thumbnail} alt={product.title} style="width: 200px" />
    {/if}
    <h2>{product.title}</h2>
    <p>{product.description}</p>
  </div>
{/each} -->



<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  // 1. Data Structure (This is how we define a "Product")
  let product = {
    name: "AERO-X GEN 1",
    tagline: "The Future of Speed",
    price: "$499.00",
    description: "Built for those who move faster than the light."
  };

  // 2. The Logic (This is the Brain)
  onMount(() => {
    const tl = gsap.timeline();

    // The Animation Sequence
    tl.to(".main-title", { duration: 1.5, opacity: 1, y: 0, ease: "expo.out", delay: 0.5 })
      .to(".product-line", { width: "100%", duration: 1, ease: "power4.inOut" }, "-=0.5")
      .from(".details", { duration: 1, opacity: 0, x: -50, stagger: 0.2, ease: "power3.out" }, "-=0.5")
      .from(".main-image", { duration: 2, scale: 1.5, opacity: 0, ease: "power4.out" }, "-=1.5");
  });
</script>

<!-- 3. The Layout (The Body) -->
<main class="relative h-screen w-full flex items-center justify-center overflow-hidden">
  
  <!-- Background "Watermark" -->
  <h1 class="absolute left-[-10%] top-1/2 -translate-y-1/2 text-[20vw] font-black opacity-5 whitespace-nowrap">
    {product.name}
  </h1>

  <div class="container mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
    
    <!-- Text Section -->
    <div class="z-10">
      <p class="details text-accent tracking-[0.5em] mb-4 text-sm uppercase">Limited Edition</p>
      <h2 class="main-title text-8xl font-black mb-6 opacity-0 translate-y-20 leading-none">
        {product.name}
      </h2>
      <div class="product-line h-[1px] w-0 bg-accent/50 mb-6"></div>
      
      <p class="details text-lg text-white/60 mb-10 max-w-md italic">
        "{product.description}"
      </p>

      <button class="details group relative border border-white/20 px-8 py-4 overflow-hidden transition-all hover:border-accent">
        <span class="relative z-10 font-bold tracking-widest uppercase">Add to Collection — {product.price}</span>
        <div class="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>

    <!-- Visual Section -->
    <div class="relative">
      <div class="main-image-container relative">
        <!-- Temporary High-Res Image Placeholder -->
        <img 
          class="main-image w-full object-contain" 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
          alt="Product"
        />
      </div>
    </div>
  </div>
</main>

<style>
  /* Use Google Fonts or similar to get a high-end look */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');

  :global(.text-accent) {
    color: #d4af37;
  }
  :global(.bg-accent) {
    background-color: #d4af37;
  }
</style>