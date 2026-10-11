export type Category = { name: string; slug: string; theme?: string };

export type Section = {
  slug: 'shaan' | 'shringaar' | 'shauq';
  word: string;
  line: string;
  blurb: string;
  categories: Category[];
};

export const sections: Section[] = [
  {
    slug: 'shringaar',
    word: 'Shringaar',
    line: 'For her',
    blurb: 'Adornments that turn every occasion into a celebration.',
    categories: [
      { name: 'Necklaces', slug: 'necklaces' },
      { name: 'Earrings', slug: 'earrings' },
      { name: 'Jhumkas', slug: 'jhumkas' },
      { name: 'Mangalsutra', slug: 'mangalsutra' },
      { name: 'Payals', slug: 'payals' },
      { name: 'Bindi', slug: 'bindi' },
      { name: 'Hair Accessories', slug: 'hair-accessories' },
      { name: 'Makeup', slug: 'makeup' },
      { name: 'Hosiery', slug: 'hosiery' },
      { name: 'Perfume', slug: 'perfume' }
    ]
  },
  {
    slug: 'shaan',
    word: 'Shaan',
    line: 'For him',
    blurb: 'Refined essentials for the man who carries himself with pride.',
    categories: [
      { name: 'Bracelets', slug: 'bracelets' },
      { name: 'Rings', slug: 'rings' },
      { name: 'Ear Accessories', slug: 'ear-accessories' },
      { name: 'Belts', slug: 'belts' },
      { name: 'Purses', slug: 'purses' },
      { name: 'Specs', slug: 'specs' },
      { name: 'Handkerchiefs', slug: 'handkerchiefs' },
      { name: 'Watches', slug: 'watches' },
      { name: 'Skincare', slug: 'skincare' },
      { name: 'Deo & Perfume', slug: 'deo-perfume' }
    ]
  },
  {
    slug: 'shauq',
    word: 'Shauq',
    line: 'For everyone',
    blurb: 'Gifts, crafts and treasures for every passion and every person.',
    categories: [
      { name: 'Unisex Jewellery', slug: 'unisex-jewellery' },
      { name: 'Gift Items', slug: 'gift-items' },
      { name: 'Kids Toys', slug: 'kids-toys', theme: 'kids' },
      { name: 'Handmade Crafts', slug: 'handmade-crafts' },
      { name: 'Decorative Items', slug: 'decorative-items' },
      // You didn't assign these two, so I parked them here. Move or delete freely.
      { name: 'Paintings', slug: 'paintings' },
      { name: 'Cutlery', slug: 'cutlery' }
    ]
  }
];

export const getSection = (slug: string) => sections.find((s) => s.slug === slug);