<script lang="ts">
  import type { PageProps } from './$types';
  import { formatPrice } from '$lib/store';

  let { data }: PageProps = $props();

  let imageIndex = $state(0);
  let chosenVariantId = $state<string | undefined>(undefined);

  const product = $derived(data.product);
  const images = $derived<string[]>(
    product.images?.length ? product.images.map((i: any) => i.url) : product.thumbnail ? [product.thumbnail] : []
  );
  const variants = $derived<any[]>(product.variants ?? []);
  const variant = $derived(variants.find((v) => v.id === chosenVariantId) ?? variants[0]);
  const theme = $derived(data.category?.theme ?? data.section?.slug ?? 'shringaar');
  const currentImage = $derived(images[Math.min(imageIndex, images.length - 1)]);
</script>

<svelte:head>
  <title>{product.title} · Iconic</title>
</svelte:head>

<div data-theme={theme} class="min-h-screen bg-bg text-fg">
  <div class="mx-auto grid max-w-7xl gap-12 px-6 pt-32 pb-24 md:grid-cols-2">
    <!-- GALLERY -->
    <div>
      <div
        class="flex aspect-[3/4] items-center justify-center overflow-hidden border border-white/10"
        style="background: linear-gradient(160deg, var(--surface), var(--bg));"
      >
        {#if currentImage}
          <img src={currentImage} alt={product.title} class="h-full w-full object-cover" />
        {:else}
          <span class="text-7xl text-metal/40">◆</span>
        {/if}
      </div>
      {#if images.length > 1}
        <div class="mt-4 grid grid-cols-5 gap-3">
          {#each images as img, i}
            <button
              onclick={() => (imageIndex = i)}
              class="aspect-square overflow-hidden border {i === imageIndex ? 'border-metal' : 'border-white/10'}"
            >
              <img src={img} alt="" class="h-full w-full object-cover" />
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- DETAILS -->
    <div class="md:pt-6">
      {#if data.section && data.category}
        <a
          href="/{data.section.slug}/{data.category.slug}"
          class="text-xs tracking-[0.4em] text-metal uppercase hover:underline"
        >
          ← {data.category.name}
        </a>
      {/if}

      <h1 class="mt-4 font-display text-4xl md:text-5xl">{product.title}</h1>

      {#if variant?.calculated_price}
        <p class="mt-4 text-2xl text-metal">
          {formatPrice(variant.calculated_price.calculated_amount, variant.calculated_price.currency_code)}
        </p>
      {/if}

      {#if product.description}
        <p class="mt-8 leading-relaxed whitespace-pre-line text-fg/75">{product.description}</p>
      {/if}

      {#if variants.length > 1}
        <div class="mt-8">
          <p class="mb-3 text-xs tracking-[0.3em] text-fg/50 uppercase">Choose</p>
          <div class="flex flex-wrap gap-3">
            {#each variants as v}
              <button
                onclick={() => (chosenVariantId = v.id)}
                class="border px-4 py-2 text-sm {v.id === variant?.id
                  ? 'border-metal text-metal'
                  : 'border-white/20 text-fg/70 hover:border-white/50'}"
              >
                {v.title}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Wired to the cart in the next step -->
      <button
        class="mt-10 w-full bg-accent py-4 text-sm tracking-[0.3em] text-white uppercase transition hover:brightness-110"
      >
        Add to cart
      </button>
    </div>
  </div>
</div>