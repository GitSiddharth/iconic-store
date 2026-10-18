<script lang="ts">
  import type { PageProps } from './$types';
  import { site, lastUpdated } from '$lib/pages';

  let { data }: PageProps = $props();
  const page = $derived(data.page);
  const unfilled = Object.values(site).filter((v) => v.startsWith('[')).length;
</script>

<svelte:head>
  <title>{page.title} · {site.brand}</title>
</svelte:head>

<div class="min-h-screen bg-[#101012] px-6 pt-32 pb-24 text-white">
  <div class="mx-auto max-w-3xl">
    {#if import.meta.env.DEV && unfilled > 0}
      <p class="mb-8 border border-amber-400/50 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
        Dev notice: {unfilled} business details in <code>src/lib/pages.ts</code> are still placeholders.
      </p>
    {/if}

    <h1 class="text-center font-script text-6xl md:text-7xl">{page.title}</h1>
    <p class="mx-auto mt-6 max-w-xl text-center font-display text-xl text-[#e2c48a]">{page.intro}</p>

    {#if page.slug === 'contact'}
      <div class="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
        {#each [['Email', site.email], ['Phone', site.phone], ['Address', site.address], ['Hours', site.hours]] as [label, value]}
          <div class="bg-[#101012] p-6">
            <p class="text-xs tracking-[0.3em] text-white/40 uppercase">{label}</p>
            <p class="mt-2 text-white/85">{value}</p>
          </div>
        {/each}
      </div>
    {/if}

    <div class="mt-14 space-y-10">
      {#each page.blocks as block}
        <section>
          {#if block.heading}
            <h2 class="mb-3 font-display text-3xl text-[#e2c48a]">{block.heading}</h2>
          {/if}
          {#each block.paragraphs ?? [] as p}
            <p class="mb-3 leading-relaxed text-white/75">{p}</p>
          {/each}
          {#if block.list}
            <ul class="list-disc space-y-2 pl-6 text-white/75 marker:text-[#e2c48a]">
              {#each block.list as item}
                <li>{item}</li>
              {/each}
            </ul>
          {/if}
        </section>
      {/each}
    </div>

    <p class="mt-16 text-center text-xs tracking-widest text-white/30 uppercase">Last updated {lastUpdated}</p>
  </div>
</div>