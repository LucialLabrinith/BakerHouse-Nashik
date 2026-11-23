import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  Check,
  Copy,
  Info,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import {
  BRAND_LOGO,
  FLAVOUR_CHOICES,
  MENU_ITEMS,
  NASHIK_AREAS,
  WEIGHT_OPTIONS,
  WHATSAPP_NUMBER,
  WeightOption,
  calculatePrice,
  formatINR,
  formatReadableDate,
  getMinOrderDate,
  isDateAtLeastMin,
} from '../data/menu';

interface OrderBuilderProps {
  selectedItemId: string;
  selectedWeight: WeightOption;
  selectedFlavour: string;
  prefillFlash: string | null;
  onItemChange: (itemId: string) => void;
  onWeightChange: (weight: WeightOption) => void;
  onFlavourChange: (flavour: string) => void;
}

export function OrderBuilder({
  selectedItemId,
  selectedWeight,
  selectedFlavour,
  prefillFlash,
  onItemChange,
  onWeightChange,
  onFlavourChange,
}: OrderBuilderProps) {
  const minDate = useMemo(() => getMinOrderDate(2), []);
  const [fulfillment, setFulfillment] = useState<'Delivery' | 'Pickup'>('Delivery');
  const [deliveryDate, setDeliveryDate] = useState<string>(minDate);
  const [address, setAddress] = useState<string>('');
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const selectedItem = useMemo(
    () => MENU_ITEMS.find((item) => item.id === selectedItemId) ?? MENU_ITEMS[0],
    [selectedItemId]
  );

  const estimatedPrice = useMemo(
    () => calculatePrice(selectedItem.basePrice, selectedWeight),
    [selectedItem.basePrice, selectedWeight]
  );

  const isDateValid = isDateAtLeastMin(deliveryDate, minDate);

  const formattedMessage = useMemo(() => {
    const lines = [
      'Hello Bakershouse Nasik! I would like to place a 100% Eggless pre-order:',
      '',
      `• Item: ${selectedItem.name}`,
      `• Weight: ${selectedWeight} (${selectedItem.servingNote[selectedWeight]})`,
      `• Flavour Choice: ${selectedFlavour}`,
      `• ${fulfillment === 'Delivery' ? 'Delivery Date' : 'Pickup Date'}: ${formatReadableDate(deliveryDate)}`,
      `• Nashik Area / Address: ${
        address.trim()
          ? address.trim()
          : fulfillment === 'Pickup'
            ? 'Studio Pickup (Nashik)'
            : 'To be confirmed in Nashik'
      }`,
      `• Message on Cake: ${cakeMessage.trim() || 'No message'}`,
      `• Estimated Price: ${formatINR(estimatedPrice)}`,
      '',
      'Please confirm slot availability and payment details. Thank you!',
    ];
    return lines.join('\n');
  }, [
    selectedItem,
    selectedWeight,
    selectedFlavour,
    fulfillment,
    deliveryDate,
    address,
    cakeMessage,
    estimatedPrice,
  ]);

  const whatsappHref = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`,
    [formattedMessage]
  );

  const handleDateChange = (nextDate: string) => {
    setDeliveryDate(nextDate);
    if (!nextDate) {
      setValidationError('Please pick a delivery or pickup date.');
    } else if (!isDateAtLeastMin(nextDate, minDate)) {
      setValidationError(
        `Dates earlier than ${formatReadableDate(minDate)} are unavailable. Minimum 48 hours advance notice is required.`
      );
    } else {
      setValidationError(null);
    }
  };

  const handleWhatsAppClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isDateValid) {
      e.preventDefault();
      setValidationError(
        `Please select a date on or after ${formatReadableDate(minDate)} (minimum 48 hours advance notice required).`
      );
      document.getElementById('order-date')?.focus();
      return;
    }

    if (fulfillment === 'Delivery' && address.trim().length < 3) {
      e.preventDefault();
      setValidationError('Please enter your Nashik area or delivery address before sending your order.');
      document.getElementById('nashik-address')?.focus();
      return;
    }

    setValidationError(null);
  };

  const handleAreaChipClick = (area: string) => {
    setAddress((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `${area}, Nashik`;
      if (trimmed.toLowerCase().includes(area.toLowerCase())) return prev;
      return `${trimmed}, ${area}`;
    });
    if (validationError?.toLowerCase().includes('address')) {
      setValidationError(null);
    }
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        copyTimerRef.current = null;
      }, 2000);
    } catch {
      // Clipboard unavailable in restricted context
    }
  };

  return (
    <section
      id="order-builder"
      aria-labelledby="order-builder-heading"
      className="scroll-mt-20 border-t border-[#C4ECEC] bg-[#E9FAFA]/75 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#B82568]">
            Smart Pre-Order &amp; WhatsApp Builder
          </p>
          <h2
            id="order-builder-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#2A2422] text-balance sm:text-4xl"
          >
            Build your fresh order in under a minute
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#594F4C]">
            Choose your cake, weight, flavour, and date. We will prepare a clean order message ready to send straight to our kitchen on WhatsApp.
          </p>
        </div>

        {/* Live Pre-fill Confirmation Banner */}
        {prefillFlash && (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 flex items-center gap-2.5 rounded-lg border border-[#E9428E]/35 bg-white px-4 py-3 text-sm text-[#2A2422]"
          >
            <Check className="h-4 w-4 shrink-0 text-[#19874B]" aria-hidden="true" />
            <span>
              Pre-filled <strong>{prefillFlash}</strong> below — pick your flavour, date, and Nashik address to finish.
            </span>
          </div>
        )}

        {/* 2-Column Contiguous Builder & Live Summary */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Form Card */}
          <div className="rounded-2xl border border-[#C4ECEC] bg-white p-5 sm:p-8 lg:col-span-7">
            <div className="space-y-6">
              {/* 1. Selected Item & Weight */}
              <div>
                <label
                  htmlFor="selected-item"
                  className="block text-sm font-semibold text-[#2A2422]"
                >
                  Selected Item &amp; Weight
                </label>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-12">
                  <div className="sm:col-span-12">
                    <select
                      id="selected-item"
                      value={selectedItem.id}
                      onChange={(e) => {
                        const nextId = e.target.value;
                        onItemChange(nextId);
                        const found = MENU_ITEMS.find((m) => m.id === nextId);
                        if (found) {
                          onFlavourChange(found.defaultFlavour);
                        }
                      }}
                      className="min-h-[46px] w-full rounded-lg border border-[#C4E6E6] bg-[#F8FEFE] px-3.5 py-2.5 text-sm font-medium text-[#2A2422] transition-colors focus:border-[#E9428E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9428E]/25"
                    >
                      {MENU_ITEMS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} — {formatINR(calculatePrice(item.basePrice, selectedWeight))}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className="grid grid-cols-3 gap-2 sm:col-span-12"
                    role="radiogroup"
                    aria-label="Order weight"
                  >
                    {WEIGHT_OPTIONS.map((option) => {
                      const active = selectedWeight === option.value;
                      const priceForWeight = calculatePrice(selectedItem.basePrice, option.value);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => onWeightChange(option.value)}
                          className={`flex min-h-[48px] cursor-pointer flex-col items-center justify-center rounded-lg border px-3 py-2 text-center transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E9428E] ${
                            active
                              ? 'border-[#D12E79] bg-[#D12E79] text-white'
                              : 'border-[#C4E6E6] bg-[#F8FEFE] text-[#2A2422] hover:border-[#E9428E]'
                          }`}
                        >
                          <span className="text-xs font-semibold whitespace-nowrap">
                            {option.value}
                          </span>
                          <span
                            className={`text-xs tabular-nums ${
                              active ? 'text-white/90' : 'text-[#594F4C]'
                            }`}
                          >
                            {formatINR(priceForWeight)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. Flavour Choice */}
              <div>
                <label
                  htmlFor="flavour-choice"
                  className="block text-sm font-semibold text-[#2A2422]"
                >
                  Flavour Choice
                </label>
                <select
                  id="flavour-choice"
                  value={selectedFlavour}
                  onChange={(e) => onFlavourChange(e.target.value)}
                  className="mt-2 min-h-[46px] w-full rounded-lg border border-[#C4E6E6] bg-[#F8FEFE] px-3.5 py-2.5 text-sm font-medium text-[#2A2422] transition-colors focus:border-[#E9428E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9428E]/25"
                >
                  {FLAVOUR_CHOICES.map((flavour) => (
                    <option key={flavour} value={flavour}>
                      {flavour}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Delivery / Pickup Date (Blocks Today & Tomorrow) */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="order-date"
                    className="block text-sm font-semibold text-[#2A2422]"
                  >
                    Delivery / Pickup Date
                  </label>
                  <div
                    className="inline-flex rounded-lg bg-[#E9FAFA] p-0.5"
                    role="radiogroup"
                    aria-label="Fulfillment method"
                  >
                    {(['Delivery', 'Pickup'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        role="radio"
                        aria-checked={fulfillment === mode}
                        onClick={() => {
                          setFulfillment(mode);
                          if (mode === 'Pickup' && validationError?.toLowerCase().includes('address')) {
                            setValidationError(null);
                          }
                        }}
                        className={`min-h-[32px] cursor-pointer rounded-md px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                          fulfillment === mode
                            ? 'bg-white text-[#2A2422] shadow-xs'
                            : 'text-[#594F4C] hover:text-[#2A2422]'
                        }`}
                      >
                        {mode === 'Delivery' ? 'Nashik Delivery' : 'Studio Pickup'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative mt-2">
                  <input
                    id="order-date"
                    type="date"
                    min={minDate}
                    value={deliveryDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    required
                    className={`min-h-[46px] w-full rounded-lg border bg-[#F8FEFE] px-3.5 py-2.5 text-sm font-medium text-[#2A2422] tabular-nums transition-colors focus:outline-none focus-visible:ring-2 ${
                      isDateValid
                        ? 'border-[#C4E6E6] focus:border-[#E9428E] focus-visible:ring-[#E9428E]/25'
                        : 'border-red-600 focus:border-red-600 focus-visible:ring-red-600/20'
                    }`}
                  />
                </div>

                <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-[#F5C6DC] bg-[#FFF8FB] px-3.5 py-2.5 text-xs leading-relaxed text-[#594F4C]">
                  <Info
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D12E79]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-[#2A2422]">
                      All cakes are baked fresh to order; minimum 48 hours advance notice required
                    </p>
                    <p className="mt-0.5 text-[#594F4C]">
                      Today and tomorrow are automatically blocked. Earliest available date:{' '}
                      <span className="font-semibold text-[#2A2422]">
                        {formatReadableDate(minDate)}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Nashik Area / Address */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="nashik-address"
                    className="block text-sm font-semibold text-[#2A2422]"
                  >
                    Nashik Area / Address
                    {fulfillment === 'Delivery' && (
                      <span className="ml-1 font-normal text-[#D12E79]">*</span>
                    )}
                  </label>
                  <span className="text-xs text-[#594F4C]">
                    {fulfillment === 'Delivery' ? 'Required for delivery' : 'Optional for pickup'}
                  </span>
                </div>
                <textarea
                  id="nashik-address"
                  rows={2}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (validationError?.toLowerCase().includes('address')) {
                      setValidationError(null);
                    }
                  }}
                  placeholder={
                    fulfillment === 'Delivery'
                      ? 'Flat / House no., landmark, and Nashik locality (e.g., Gangapur Road, Nashik)'
                      : 'Optional note or preferred pickup time (e.g., 4:00 PM pickup)'
                  }
                  className="mt-2 w-full rounded-lg border border-[#C4E6E6] bg-[#F8FEFE] px-3.5 py-2.5 text-sm text-[#2A2422] placeholder:text-[#594F4C]/65 transition-colors focus:border-[#E9428E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9428E]/25"
                />

                {fulfillment === 'Delivery' && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 inline-flex items-center gap-1 text-xs text-[#594F4C]">
                      <MapPin className="h-3.5 w-3.5 text-[#D12E79]" aria-hidden="true" />
                      Quick select:
                    </span>
                    {NASHIK_AREAS.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handleAreaChipClick(area)}
                        className="min-h-[30px] cursor-pointer rounded-md border border-[#C4E6E6] bg-[#F8FEFE] px-2.5 py-1 text-xs font-medium text-[#594F4C] whitespace-nowrap transition-colors hover:border-[#E9428E] hover:bg-[#FFF8FB] hover:text-[#2A2422]"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Custom Message on Cake */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="cake-message"
                    className="block text-sm font-semibold text-[#2A2422]"
                  >
                    Custom Message on Cake
                  </label>
                  <span className="text-xs text-[#594F4C] tabular-nums">
                    {cakeMessage.length}/60
                  </span>
                </div>
                <input
                  id="cake-message"
                  type="text"
                  maxLength={60}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  placeholder='e.g., "Happy Birthday Aarav!" or custom theme notes'
                  className="mt-2 min-h-[46px] w-full rounded-lg border border-[#C4E6E6] bg-[#F8FEFE] px-3.5 py-2.5 text-sm text-[#2A2422] placeholder:text-[#594F4C]/65 transition-colors focus:border-[#E9428E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9428E]/25"
                />
              </div>

              {/* Inline Validation Feedback */}
              {validationError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" aria-hidden="true" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Live Estimate & WhatsApp Summary Card (Ivory + Berry Pink Ring matching Logo Center) */}
          <aside className="rounded-2xl border-2 border-[#E9428E]/35 bg-[#FFFBF2] p-5 text-[#2A2422] shadow-[0_14px_34px_-18px_rgba(42,36,34,0.16)] sm:p-7 lg:sticky lg:top-20 lg:col-span-5">
            <div className="flex items-center gap-3.5 border-b border-[#F2D5E3] pb-5">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#E9428E]/30 bg-white">
                {!logoError ? (
                  <img
                    src={BRAND_LOGO}
                    alt="Baker's House Cakes & Party logo"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoError(true)}
                    className="h-full w-full scale-[1.06] object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#E9FAFA] font-display text-sm font-bold text-[#D12E79]">
                    BH
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-wide text-[#B82568]">
                  Live Estimated Price
                </p>
                <div className="mt-0.5 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-3xl font-semibold tracking-tight text-[#2A2422] tabular-nums sm:text-4xl">
                    {formatINR(estimatedPrice)}
                  </p>
                  <span className="text-xs font-medium text-[#594F4C]">
                    {selectedWeight} · {selectedItem.servingNote[selectedWeight]}
                  </span>
                </div>
              </div>
            </div>

            {/* Structured Breakdown */}
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[#594F4C]">Item</dt>
                <dd className="text-right font-semibold text-[#2A2422]">
                  {selectedItem.shortName}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#594F4C]">Flavour</dt>
                <dd className="text-right font-medium text-[#2A2422]">
                  {selectedFlavour}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="flex items-center gap-1.5 text-[#594F4C]">
                  <CalendarDays className="h-3.5 w-3.5 text-[#D12E79]" aria-hidden="true" />
                  <span>{fulfillment} Date</span>
                </dt>
                <dd className="text-right font-medium text-[#2A2422] tabular-nums">
                  {isDateValid ? formatReadableDate(deliveryDate) : 'Select valid date'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#594F4C]">Location</dt>
                <dd className="max-w-[200px] truncate text-right font-medium text-[#2A2422]">
                  {address.trim()
                    ? address.trim()
                    : fulfillment === 'Pickup'
                      ? 'Studio Pickup, Nashik'
                      : 'Add Nashik address'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="flex items-center gap-1.5 text-[#594F4C]">
                  <Sparkles className="h-3.5 w-3.5 text-[#D12E79]" aria-hidden="true" />
                  <span>Cake Message</span>
                </dt>
                <dd className="max-w-[200px] truncate text-right font-medium text-[#2A2422]">
                  {cakeMessage.trim() || 'No message'}
                </dd>
              </div>
            </dl>

            {/* Primary WhatsApp CTA */}
            <div className="mt-7 space-y-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#19874B] px-5 py-3.5 text-sm font-semibold text-white whitespace-nowrap shadow-xs transition-colors duration-150 hover:bg-[#136E3C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2422]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Send Ready Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex min-h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E5C5D5] bg-white px-4 py-2 text-xs font-semibold text-[#4D433F] whitespace-nowrap transition-colors hover:border-[#D12E79] hover:text-[#2A2422]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#19874B]" aria-hidden="true" />
                    <span>Order Summary Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#D12E79]" aria-hidden="true" />
                    <span>Copy Formatted Order Text</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-xs leading-relaxed text-[#594F4C]">
              Final customization charges (fondant figurines or photo prints) are confirmed directly on WhatsApp before baking.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
