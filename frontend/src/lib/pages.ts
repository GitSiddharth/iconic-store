// ---- FILL THESE IN: every [bracketed] value is a placeholder ----
export const site = {
  brand: 'Iconic',
  legalName: '[Rampyari]',
  email: '[contact@rampyari.com]',
  phone: '[+91 9584584175]',
  address: '[218, Kushwah Nagar Mainroad Indore Madhya Pradesh 452015]',
  city: '[Indore]',
  hours: '[Mon–Sat, 10:00 AM – 10:00 PM IST]',
  processingTime: '[1–3 business days]',
  deliveryTime: '[4–8 business days]',
  shippingCharge: '[Free above ₹500, otherwise ₹30]',
  returnWindow: '[7 days]',
  refundTime: '[5–7 business days]'
};

export const lastUpdated = 'October 2026';

export type Block = { heading?: string; paragraphs?: string[]; list?: string[] };
export type InfoPage = { slug: string; title: string; intro: string; blocks: Block[] };

export const pages: InfoPage[] = [
  {
    slug: 'about',
    title: 'About Us',
    intro: 'Three words, one house: Shaan for him, Shringaar for her, Shauq for everyone.',
    blocks: [
      {
        heading: 'Our story',
        paragraphs: [
          `[Write your own story here: who you are, why you started ${site.brand}, and what makes your pieces special. Two or three short paragraphs is plenty.]`
        ]
      },
      {
        heading: 'What we offer',
        list: [
          'Artificial gold, silver and diamond jewellery',
          'Cosmetics, skincare and fragrances',
          'Accessories, hosiery and cutlery',
          "Children's toys and gifts",
          'Home decor, handmade crafts and paintings'
        ]
      },
      {
        heading: 'Our promise',
        paragraphs: [
          'Every piece is chosen to feel premium, arrive safely, and be worth celebrating. If something is not right, we will make it right.'
        ]
      }
    ]
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    intro: "We'd love to hear from you. Questions about an order, a product, or a gift? Reach out.",
    blocks: [
      {
        heading: 'Response time',
        paragraphs: ['We reply to every message as quickly as we can, usually within one business day.']
      }
    ]
  },
  {
    slug: 'shipping',
    title: 'Shipping Policy',
    intro: 'How and when your order reaches you.',
    blocks: [
      {
        heading: 'Order processing',
        paragraphs: [
          `Orders are packed and handed to our courier partner within ${site.processingTime} of payment confirmation. Orders placed on Sundays or public holidays are processed on the next business day.`
        ]
      },
      {
        heading: 'Delivery time',
        paragraphs: [
          `Delivery typically takes ${site.deliveryTime} after dispatch, depending on your location. Remote pin codes may take longer.`
        ]
      },
      { heading: 'Shipping charges', paragraphs: [`${site.shippingCharge}. The exact charge is shown at checkout before you pay.`] },
      {
        heading: 'Tracking',
        paragraphs: ['Once your order ships, you will receive tracking details by email or message.']
      },
      {
        heading: 'Delays and address accuracy',
        paragraphs: [
          'Weather, strikes, festivals and courier delays can affect delivery. Please make sure your address and phone number are complete and correct, because we cannot be responsible for parcels returned due to incorrect details.'
        ]
      }
    ]
  },
  {
    slug: 'returns',
    title: 'Returns & Refunds',
    intro: 'We want you to love what you ordered. Here is how returns, cancellations and refunds work.',
    blocks: [
      {
        heading: 'Return window',
        paragraphs: [
          `You can request a return within ${site.returnWindow} of delivery. Items must be unused, in their original packaging, with all tags and accessories.`
        ]
      },
      {
        heading: 'Items we cannot take back',
        paragraphs: ['[Confirm this list against your real policy.]'],
        list: [
          'Earrings and ear accessories (hygiene)',
          'Cosmetics, skincare, perfume and deodorant once opened',
          'Hosiery and handkerchiefs',
          'Custom, personalised or made-to-order handmade items',
          'Items damaged through use or wear'
        ]
      },
      {
        heading: 'Damaged or wrong items',
        paragraphs: [
          `If your order arrives damaged or is not what you ordered, write to us at ${site.email} within [48 hours] of delivery with photos, ideally including the unboxing. We will arrange a replacement or refund.`
        ]
      },
      {
        heading: 'How to request a return',
        list: [
          `Email ${site.email} with your order number and the reason`,
          'We confirm the return and share pickup or shipping instructions',
          'Once we receive and check the item, we process your refund'
        ]
      },
      {
        heading: 'Refunds',
        paragraphs: [
          `Approved refunds go back to your original payment method within ${site.refundTime}, depending on your bank or payment provider.`
        ]
      },
      {
        heading: 'Cancellations',
        paragraphs: [
          'You can cancel an order before it ships by contacting us. Once an order has been dispatched, it can only be returned under the terms above.'
        ]
      }
    ]
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    intro: `How ${site.brand} collects, uses and protects your information.`,
    blocks: [
      {
        heading: 'What we collect',
        list: [
          'Contact details: name, email, phone number',
          'Delivery and billing addresses',
          'Order history and items in your bag',
          'Basic technical data such as browser type and pages visited'
        ]
      },
      {
        heading: 'How we use it',
        list: [
          'To process and deliver your orders',
          'To contact you about your order or support requests',
          'To improve our website and products',
          'To send offers or updates, only if you have opted in'
        ]
      },
      {
        heading: 'Payments',
        paragraphs: [
          'Payments are handled by our payment gateway partner. We do not store your card, UPI or net banking details on our servers.'
        ]
      },
      {
        heading: 'Sharing',
        paragraphs: [
          'We share information only with the services needed to run your order: our payment gateway, courier partners and hosting providers. We do not sell your personal information.'
        ]
      },
      {
        heading: 'Cookies and local storage',
        paragraphs: [
          'We store a small identifier in your browser so your shopping bag is still there when you come back. You can clear it any time through your browser settings.'
        ]
      },
      {
        heading: 'Your choices',
        paragraphs: [
          `You can ask us to access, correct or delete your personal information by writing to ${site.email}.`
        ]
      },
      {
        heading: 'Contact',
        paragraphs: [`${site.legalName}, ${site.address}. Email: ${site.email}.`]
      }
    ]
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    intro: `By using ${site.brand} you agree to the terms below.`,
    blocks: [
      {
        heading: 'About these terms',
        paragraphs: [
          `This website is operated by ${site.legalName}. By browsing or placing an order, you agree to these terms and to our Shipping and Returns policies.`
        ]
      },
      {
        heading: 'Products and pricing',
        paragraphs: [
          'We try to show colours and details accurately, but screens vary and slight differences may occur. Prices are in Indian Rupees and may change without notice. Items are subject to availability.'
        ]
      },
      {
        heading: 'Orders and payment',
        paragraphs: [
          'An order is confirmed only after payment is received. We may cancel an order if an item is unavailable, or if there is a pricing or listing error, and will refund any payment made.'
        ]
      },
      {
        heading: 'Artificial and handmade items',
        paragraphs: [
          'Artificial jewellery and handmade items are not precious-metal or hallmarked goods unless stated. Handmade pieces may carry small natural variations, which are part of their character.'
        ]
      },
      {
        heading: 'Your account',
        paragraphs: [
          'You are responsible for keeping your login details safe and for activity on your account.'
        ]
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          `All content on this site, including text, images and design, belongs to ${site.brand} or its licensors and may not be copied or reused without permission.`
        ]
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of this website or its products.'
        ]
      },
      {
        heading: 'Governing law',
        paragraphs: [
          `These terms are governed by the laws of India. Any dispute is subject to the courts of ${site.city}.`
        ]
      }
    ]
  }
];

export const pageSlugs = pages.map((p) => p.slug);
export const getPage = (slug: string) => pages.find((p) => p.slug === slug);