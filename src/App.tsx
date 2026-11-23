import { useState } from 'react';
import {
  ArrowDown,
  CakeSlice,
  Instagram,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  BRAND_LOGO,
  CATEGORIES,
  HERO_IMAGE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  WeightOption,
} from './data/menu';
import { MenuCard } from './components/MenuCard';
import { OrderBuilder } from './components/OrderBuilder';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [heroImgError, setHeroImgError] = useState(false);
  const [logoImgError, setLogoImgError] = useState(false);

  // Order Builder shared state
  const [selectedItemId, setSelectedItemId] = useState<string>(MENU_ITEMS[0].id);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>('0.5 kg');
  const [selectedFlavour, setSelectedFlavour] = useState<string>(
    MENU_ITEMS[0].defaultFlavour
  );
  const [prefillFlash, setPrefillFlash] = useState<string | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const heroWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Bakershouse Nasik! I'd like to inquire about a 100% eggless custom cake order in Nashik."
  )}`;

  const handleSelectAndOrder = (item: MenuItem, weight: WeightOption) => {
    setSelectedItemId(item.id);
    setSelectedWeight(weight);
    setSelectedFlavour(item.defaultFlavour);
    setPrefillFlash(`${item.shortName} (${weight})`);

    const builderEl = document.getElementById('order-builder');
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#2A2422]">
      {/* 1. Top Announcement Bar (Berry Pink matching Logo Ribbon) */}
      <div className="bg-[#C52970] px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-[13px]">
        <p className="mx-auto max-w-6xl leading-snug">
          100% Eggless Customized Cakes, Cupcakes &amp; Brownies in Nashik | Please Order 1–2 Days in Advance
        </p>
      </div>

      {/* Slim Sticky 3-Zone Navigation Header (Top Bar Contract + Exact Uploaded Logo) */}
      <header className="sticky top-0 z-40 border-b border-[#C6EFEF] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Exact Baker's House Logo + Single-line Wordmark */}
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9428E]"
          >
            <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#E9428E]/25 bg-white shadow-xs">
              {!logoImgError ? (
                <img
                  src={BRAND_LOGO}
                  alt="Baker's House Cakes & Party"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoImgError(true)}
                  className="h-full w-full scale-[1.06] object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-[#E9FAFA] font-display text-xs font-bold text-[#D12E79]">
                  BH
                </span>
              )}
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-[#2A2422] sm:text-xl">
              Bakershouse Nasik
            </span>
          </a>

          {/* Zone 2: Clean single-line text nav links */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-sm font-medium text-[#594F4C] md:flex"
          >
            <a
              href="#menu"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#D12E79] hover:underline underline-offset-4"
            >
              Eggless Menu
            </a>
            <a
              href="#order-builder"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#D12E79] hover:underline underline-offset-4"
            >
              Pre-Order
            </a>
            <a
              href="#contact"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-[#D12E79] hover:underline underline-offset-4"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href="#order-builder"
              className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#D12E79] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#B32265] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2422]"
            >
              Build Order
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* 2. Hero Section (Pastel Mint Aqua Backdrop matching Logo Outer Ring) */}
        <section className="bg-gradient-to-b from-[#E5FAFA] via-[#F2FDFD] to-[#FFFDFB]">
          <div className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
              {/* Hero Copy */}
              <div className="flex flex-col justify-center lg:col-span-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#B82568]">
                  <span>Nashik, Maharashtra</span>
                  <span aria-hidden="true">·</span>
                  <span>100% Pure Eggless Kitchen</span>
                </div>

                <h1 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.1] font-semibold tracking-tight text-[#2A2422] text-balance">
                  Handcrafted 100% Eggless Cakes Made Fresh in Nashik
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#594F4C] sm:text-lg">
                  Browse our signature custom cakes, brownies, and cupcakes—pick your weight and delivery date to send a ready order straight to WhatsApp.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={heroWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-[#19874B] px-6 py-3.5 text-sm font-semibold text-white whitespace-nowrap shadow-xs transition-colors duration-150 hover:bg-[#136E3C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2422]"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <a
                    href="#menu"
                    className="inline-flex min-h-[46px] items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[#2A2422] whitespace-nowrap transition-colors hover:text-[#D12E79]"
                  >
                    <span>Browse the Menu</span>
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Hero Editorial Visual with Baker's House Seal */}
              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border-2 border-white bg-[#E9FAFA] shadow-[0_18px_40px_-20px_rgba(42,36,34,0.22)] sm:min-h-[380px]">
                  {!heroImgError ? (
                    <img
                      src={HERO_IMAGE}
                      alt="Handcrafted eggless dark Belgian chocolate cake and floral birthday cake at Bakershouse Nasik"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[320px] flex-col items-center justify-center bg-gradient-to-br from-[#E9FAFA] via-[#FFFBF2] to-[#FDEBF3] p-8 text-center">
                      <CakeSlice className="mb-3 h-10 w-10 text-[#D12E79]" aria-hidden="true" />
                      <p className="font-display text-xl font-semibold text-[#2A2422]">
                        Bakershouse Nasik
                      </p>
                      <p className="mt-1 text-sm text-[#594F4C]">
                        100% Eggless Artisan Cakes
                      </p>
                    </div>
                  )}

                  {/* Official Circular Logo Seal */}
                  {!logoImgError && (
                    <div className="absolute right-3 bottom-3 rounded-full bg-white/95 p-1 shadow-md sm:right-4 sm:bottom-4">
                      <div className="h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20">
                        <img
                          src={BRAND_LOGO}
                          alt="Baker's House Cakes & Party official emblem"
                          referrerPolicy="no-referrer"
                          onError={() => setLogoImgError(true)}
                          className="h-full w-full scale-[1.06] object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Full-width Craft & Ordering Strip below Hero Split */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-y border-[#C4ECEC] py-6 sm:grid-cols-4">
              <div>
                <p className="font-display text-lg font-semibold text-[#2A2422]">
                  100% Eggless
                </p>
                <p className="mt-0.5 text-xs text-[#594F4C]">
                  Pure vegetarian home studio kitchen
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-[#2A2422]">
                  48-Hr Notice
                </p>
                <p className="mt-0.5 text-xs text-[#594F4C]">
                  Baked fresh to order, never frozen
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-[#2A2422]">
                  Cakes &amp; Party
                </p>
                <p className="mt-0.5 text-xs text-[#594F4C]">
                  Florals, birthdays &amp; festive hampers
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-[#2A2422]">
                  Nashik Delivery
                </p>
                <p className="mt-0.5 text-xs text-[#594F4C]">
                  Careful delivery or studio pickup
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 100% Eggless Menu Grid */}
        <section
          id="menu"
          aria-labelledby="menu-heading"
          className="scroll-mt-20 py-10 pb-20 sm:py-12 sm:pb-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold tracking-wider text-[#B82568]">
                  100% Eggless Menu
                </p>
                <h2
                  id="menu-heading"
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#2A2422] text-balance sm:text-4xl"
                >
                  Signature cakes, brownies &amp; festive hampers
                </h2>
              </div>

              {/* Category Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter menu by category"
                className="flex items-center gap-1 overflow-x-auto rounded-xl border border-[#C8EFEF] bg-[#E9FAFA] p-1"
              >
                {CATEGORIES.map((category) => {
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(category)}
                      className={`min-h-[40px] cursor-pointer rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E9428E] sm:text-sm ${
                        active
                          ? 'bg-[#D12E79] text-white shadow-xs'
                          : 'text-[#4D433F] hover:bg-white/75 hover:text-[#2A2422]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Responsive Product Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  isSelectedInBuilder={selectedItemId === item.id}
                  onSelectAndOrder={handleSelectAndOrder}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Smart Pre-Order & WhatsApp Builder */}
        <OrderBuilder
          selectedItemId={selectedItemId}
          selectedWeight={selectedWeight}
          selectedFlavour={selectedFlavour}
          prefillFlash={prefillFlash}
          onItemChange={setSelectedItemId}
          onWeightChange={setSelectedWeight}
          onFlavourChange={setSelectedFlavour}
        />
      </main>

      {/* 5. Footer (Fresh Mint & Berry Pink Logo Theme) */}
      <footer
        id="contact"
        className="border-t-2 border-[#E9428E]/35 bg-[#DFF7F7] text-[#2A2422]"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white shadow-xs">
                {!logoImgError ? (
                  <img
                    src={BRAND_LOGO}
                    alt="Baker's House Cakes & Party logo"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoImgError(true)}
                    className="h-full w-full scale-[1.06] object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#FFFBF2] font-display text-base font-bold text-[#D12E79]">
                    BH
                  </div>
                )}
              </div>
              <div>
                <p className="font-display text-xl font-semibold tracking-tight text-[#2A2422]">
                  Bakershouse Nasik • Nashik, Maharashtra
                </p>
                <p className="mt-1 text-sm text-[#594F4C]">
                  100% Eggless Customized Cakes, Cupcakes, Brownies &amp; Celebration Hampers
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-[#2A2422] transition-colors hover:text-[#D12E79]"
              >
                <Instagram className="h-4 w-4 text-[#D12E79]" aria-hidden="true" />
                <span className="font-semibold whitespace-nowrap">{INSTAGRAM_HANDLE}</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-[#2A2422] transition-colors hover:text-[#19874B]"
              >
                <Phone className="h-4 w-4 text-[#19874B]" aria-hidden="true" />
                <span className="font-semibold whitespace-nowrap tabular-nums">
                  {WHATSAPP_DISPLAY}
                </span>
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#BBE5E5] pt-6 text-xs text-[#594F4C] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Bakershouse Nasik. All cakes are 100% eggless and baked fresh to order.
            </p>
            <p className="inline-flex items-center gap-1.5 rounded-md border border-[#E9428E]/25 bg-white/80 px-3 py-1.5 font-medium text-[#4D433F] whitespace-nowrap self-start sm:self-auto">
              Interactive Website Preview by ArkAja Studio
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
