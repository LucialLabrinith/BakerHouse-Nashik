import { useState } from 'react';
import { ArrowDownRight, CakeSlice } from 'lucide-react';
import {
  MenuItem,
  WEIGHT_OPTIONS,
  WeightOption,
  calculatePrice,
  formatINR,
} from '../data/menu';

interface MenuCardProps {
  item: MenuItem;
  isSelectedInBuilder: boolean;
  onSelectAndOrder: (item: MenuItem, weight: WeightOption) => void;
}

export function MenuCard({
  item,
  isSelectedInBuilder,
  onSelectAndOrder,
}: MenuCardProps) {
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>('0.5 kg');
  const [imgError, setImgError] = useState(false);

  const currentPrice = calculatePrice(item.basePrice, selectedWeight);
  const servingLabel = item.servingNote[selectedWeight];

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-16px_rgba(209,46,121,0.22)] ${
        isSelectedInBuilder
          ? 'border-[#E9428E] ring-1 ring-[#E9428E]/35'
          : 'border-[#CCEFEF]'
      }`}
    >
      {/* 4:3 Appetizing Photography with Zero-Broken-Image Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9FAFA]">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.imageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#E9FAFA] via-[#FFFBF2] to-[#FDEBF3] p-6 text-center text-[#594F4C]">
            <CakeSlice className="mb-2 h-8 w-8 text-[#D12E79]" aria-hidden="true" />
            <span className="font-display text-base font-semibold text-[#2A2422]">
              {item.shortName}
            </span>
          </div>
        )}

        {/* Crisp 100% Eggless dietary badge */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-[#2A2422]/10 bg-[#FFFDFB]/95 px-2.5 py-1 text-xs font-semibold text-[#2A2422] backdrop-blur-xs">
          <span
            className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border border-[#19874B]"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#19874B]" />
          </span>
          <span className="whitespace-nowrap">100% Eggless</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1.5 flex items-center gap-2 text-xs text-[#594F4C]">
          <span>{item.category}</span>
          <span aria-hidden="true">·</span>
          <span>{servingLabel}</span>
        </div>

        <h3 className="font-display text-lg leading-snug font-semibold text-[#2A2422]">
          {item.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#594F4C]">
          {item.description}
        </p>

        {/* Weight Selector */}
        <div className="mt-5 border-t border-[#E6F5F5] pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-[#594F4C]">
              Select weight
            </span>
            <span className="text-xl font-bold tracking-tight text-[#2A2422] tabular-nums">
              {formatINR(currentPrice)}
            </span>
          </div>

          <div
            className="grid grid-cols-3 gap-1.5 rounded-lg bg-[#E9FAFA] p-1"
            role="radiogroup"
            aria-label={`Select weight for ${item.name}`}
          >
            {WEIGHT_OPTIONS.map((option) => {
              const active = selectedWeight === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedWeight(option.value)}
                  className={`min-h-[38px] cursor-pointer rounded-md px-2 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E9428E] ${
                    active
                      ? 'bg-[#3D3431] text-[#FFFDFB] shadow-xs'
                      : 'text-[#4D433F] hover:bg-white/80 hover:text-[#2A2422]'
                  }`}
                >
                  {option.value}
                </button>
              );
            })}
          </div>
        </div>

        {/* Select & Order CTA */}
        <button
          type="button"
          onClick={() => onSelectAndOrder(item, selectedWeight)}
          className="mt-4 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#D12E79] px-4 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition-colors duration-150 hover:bg-[#B32265] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2422]"
        >
          <span>Select &amp; Order</span>
          <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
