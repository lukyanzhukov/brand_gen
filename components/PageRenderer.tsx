'use client';
import React from 'react';
import { PageLayout, BlockCopy } from '@/lib/generate-unified';
import { ColorPalette, generatePaletteCSS } from '@/lib/palette';

import { HeroBlock } from './blocks/HeroBlock';
import { AboutBlock } from './blocks/AboutBlock';
import { TracksBlock } from './blocks/TracksBlock';
import { GeoBlock } from './blocks/GeoBlock';
import { FactsBlock } from './blocks/FactsBlock';
import { BenefitsBlock } from './blocks/BenefitsBlock';
import { CultureBlock } from './blocks/CultureBlock';
import { MediaBlock } from './blocks/MediaBlock';
import { HiringBlock } from './blocks/HiringBlock';
import { CTABlock } from './blocks/CTABlock';

interface PageRendererProps {
  layout: PageLayout;
  copy: BlockCopy;
  palette?: ColorPalette;
  logoUrl?: string;
}

export function PageRenderer({ layout, copy, palette, logoUrl }: PageRendererProps) {
  const paletteStyles = generatePaletteCSS(palette) as React.CSSProperties;

  // helpers
  const pick = <T,>(...vals: (T | undefined | null)[]) =>
    vals.find(v => v !== undefined && v !== null) as T | undefined;

  const str = (v?: any) => (typeof v === 'string' ? v.trim() : '');
  const nonEmpty = (v?: any) => (typeof v === 'string' && v.trim().length > 0 ? v.trim() : undefined);
  const arr = <T,>(v?: any): T[] => (Array.isArray(v) ? (v as T[]) : []);
  const has = (a?: any[]) => Array.isArray(a) && a.length > 0;

  const renderBlock = (block: any, index: number) => {
    try {
      const blockCopy = (copy as any)?.[block.type] || {};
      const key = `${block.type}-${index}`;

      switch (block.type) {
        case 'hero': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const subtitle = nonEmpty(pick(blockCopy.subtitle, block.props?.subtitle));
          const cta = nonEmpty(pick(blockCopy.buttonText, block.props?.buttonText));
          const directions = arr<any>(pick(blockCopy.directions, block.props?.directions));
          const slogan = nonEmpty(pick(blockCopy.slogan, block.props?.slogan));
          const teamImage = nonEmpty(pick(blockCopy.teamImage, block.props?.teamImage));
          const effectiveLogo = nonEmpty(pick(logoUrl, block.props?.logoUrl));

          // HERO допустимо рендерить даже без списков — если есть хотя бы заголовок/подзаголовок/CTA/лого
          const hasContent =
            Boolean(title || subtitle || cta || slogan || effectiveLogo || teamImage || directions.length > 0);
          if (!hasContent) return null;

          return (
            <HeroBlock
              key={key}
              title={title ?? ''}
              subtitle={subtitle ?? ''}
              cta={cta ?? ''}
              directions={directions}
              logoUrl={effectiveLogo}
              variant={block.variant}
              slogan={slogan}
              teamImage={teamImage}
            />
          );
        }

        case 'about': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const content = nonEmpty(pick(blockCopy.description, blockCopy.content, block.props?.content, block.props?.description));
          const bullets = arr<string>(pick(blockCopy.bullets, block.props?.bullets)).filter(b => str(b).length);
          const slogan = nonEmpty(pick(blockCopy.slogan, block.props?.slogan));
          const companyImage = nonEmpty(pick(blockCopy.companyImage, block.props?.companyImage));
          const socialLinks = arr<any>(pick(blockCopy.socialLinks, block.props?.socialLinks));

          // achievements могут быть строками или объектами → нормализуем и чистим
          const achRaw = arr<any>(pick(blockCopy.achievements, block.props?.achievements));
          const achievements = achRaw.map((a: any, i: number) => {
            if (typeof a === 'string') {
              const m = a.match(/^(\d+[+\-]?)/);
              const number = m ? m[1] : `${i + 1}`;
              return { number, label: a, description: a };
            }
            return a;
          }).filter((a: any) => nonEmpty(a?.number) || nonEmpty(a?.label) || nonEmpty(a?.description));

          // "контент" для about — это не заголовки, а тело/буллеты/достижения/картинки/соцссылки
          const hasContent = Boolean(content || bullets.length || achievements.length || companyImage || socialLinks.length);
          if (!hasContent) return null;

          return (
            <AboutBlock
              key={key}
              title={title ?? ''}
              content={content ?? ''}
              bullets={bullets}
              variant={block.variant}
              slogan={slogan}
              achievements={achievements}
              companyImage={companyImage}
              socialLinks={socialLinks}
            />
          );
        }

        case 'tracks': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const subtitle = nonEmpty(pick(blockCopy.subtitle, block.props?.subtitle));
          const items = arr<any>(pick(blockCopy.tracks, blockCopy.items, block.props?.items, block.props?.tracks))
            .filter((it: any) => nonEmpty(it?.title) || nonEmpty(it?.description));
          const stats = arr<any>(pick(blockCopy.stats, block.props?.stats));

          // Для контента критично наличие элементов
          if (!items.length) return null;

          return (
            <TracksBlock
              key={key}
              title={title ?? ''}
              subtitle={subtitle}
              items={items}
              variant={block.variant}
              stats={stats}
            />
          );
        }

        case 'geo': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const subtitle = nonEmpty(pick(blockCopy.subtitle, block.props?.subtitle));
          const locations = arr<any>(pick(blockCopy.locations, block.props?.locations))
            .map((loc: any) => ({
              city: nonEmpty(loc?.city ?? loc?.name) ?? '',
              country: nonEmpty(loc?.country) ?? 'Россия',
              description: nonEmpty(loc?.type ?? loc?.description),
              image: nonEmpty(loc?.image),
              type: nonEmpty(loc?.type),
            }))
            .filter(l => l.city || l.description || l.image);

          if (!locations.length) return null;

          return (
            <GeoBlock
              key={key}
              title={title ?? ''}
              subtitle={subtitle}
              locations={locations}
              variant={block.variant}
              mapImage={nonEmpty(pick(blockCopy.mapImage, block.props?.mapImage))}
            />
          );
        }

        case 'facts': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const subtitle = nonEmpty(pick(blockCopy.subtitle, block.props?.subtitle));
          const items = arr<any>(pick(blockCopy.facts, blockCopy.items, block.props?.items, block.props?.facts))
            .map((f: any) => ({
              number: nonEmpty(f?.value ?? f?.number) ?? '',
              label: nonEmpty(f?.label) ?? '',
              description: nonEmpty(f?.description),
              icon: f?.icon,
              image: f?.image,
            }))
            .filter(f => f.number || f.label || f.description);

          if (!items.length) return null;

          return (
            <FactsBlock
              key={key}
              title={title ?? ''}
              subtitle={subtitle}
              items={items}
              variant={block.variant}
            />
          );
        }

        case 'benefits': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const subtitle = nonEmpty(pick(blockCopy.subtitle, block.props?.subtitle));
          const items = arr<any>(pick(blockCopy.benefits, blockCopy.items, block.props?.items))
            .map((b: any) => ({
              title: nonEmpty(b?.title) ?? '',
              description: nonEmpty(b?.description) ?? '',
              category: (b?.category || 'career') as 'financial' | 'social' | 'career',
              icon: b?.icon,
            }))
            .filter(b => b.title || b.description);

          if (!items.length) return null;

          return (
            <BenefitsBlock
              key={key}
              title={title ?? ''}
              subtitle={subtitle}
              items={items}
              variant={block.variant}
            />
          );
        }

        case 'culture': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const subtitle = nonEmpty(pick(blockCopy.subtitle, block.props?.subtitle));
          const items = arr<any>(pick(blockCopy.items, block.props?.items))
            .filter((it: any) => nonEmpty(it?.title) || nonEmpty(it?.description) || nonEmpty(it?.image));

          if (!items.length) return null;

          return (
            <CultureBlock
              key={key}
              title={title ?? ''}
              subtitle={subtitle}
              items={items}
              variant={block.variant}
            />
          );
        }

        case 'media': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const subtitle = nonEmpty(pick(blockCopy.subtitle, block.props?.subtitle));
          const items = arr<any>(pick(blockCopy.articles, blockCopy.items, block.props?.items, block.props?.articles))
            .map((a: any) => ({
              title: nonEmpty(a?.title) ?? '',
              description: nonEmpty(a?.description) ?? '',
              url: nonEmpty(a?.url) ?? '#',
              type: nonEmpty(a?.type) ?? 'article',
              image: nonEmpty(a?.image),
            }))
            .filter(a => a.title || a.description || a.image);

          if (!items.length) return null;

          return (
            <MediaBlock
              key={key}
              title={title ?? ''}
              subtitle={subtitle}
              items={items}
              variant={block.variant}
            />
          );
        }

        case 'hiring': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const subtitle = nonEmpty(pick(blockCopy.subtitle, block.props?.subtitle));
          const items = arr<any>(pick(blockCopy.items, block.props?.items))
            .filter((it: any) => nonEmpty(it?.title) || nonEmpty(it?.description) || nonEmpty(it?.image));

          if (!items.length) return null;

          return (
            <HiringBlock
              key={key}
              title={title ?? ''}
              subtitle={subtitle}
              items={items}
              variant={block.variant}
            />
          );
        }

        case 'cta': {
          const title = nonEmpty(pick(blockCopy.title, block.props?.title));
          const description = nonEmpty(pick(blockCopy.description, blockCopy.subtitle, block.props?.subtitle));
          const buttonText = nonEmpty(pick(blockCopy.buttonText, block.props?.buttonText));
          const buttonUrl = nonEmpty(pick(blockCopy.buttonUrl, block.props?.buttonUrl));

          // CTA имеет смысл, если есть хотя бы текст или кнопка
          const hasContent = Boolean(title || description || buttonText);
          if (!hasContent) return null;

          return (
            <CTABlock
              key={key}
              title={title ?? ''}
              description={description ?? ''}
              buttonText={buttonText ?? ''}
              buttonUrl={buttonUrl ?? '#'}
              variant={block.variant}
            />
          );
        }

        default:
          console.warn(`Unknown block type: ${block.type}`);
          return null;
      }
    } catch (error) {
      console.error(`Error rendering block ${block?.type}:`, error);
      return null;
    }
  };

  return (
    <div style={{ ...paletteStyles, backgroundColor: 'var(--background)' }} className="page-root min-h-screen">
      {/* плотные вертикальные отступы и мягкие края */}
      <style jsx global>{`
        .page-root section { padding-top: 8px !important; padding-bottom: 8px !important; }
        @media (min-width: 1024px) {
          .page-root section { padding-top: 10px !important; padding-bottom: 10px !important; }
        }
        .page-root .shadow-xl { box-shadow: 0 6px 20px rgba(0,0,0,.08) !important; }
        .page-root .rounded-2xl { border-radius: 18px !important; }
      `}</style>

      {Array.isArray(layout?.blocks) && layout.blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

export default PageRenderer;
