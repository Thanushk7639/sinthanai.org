import AnimatedSection from './AnimatedSection';

interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      <AnimatedSection>
        <span
          className={`inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 ${
            light
              ? 'border border-white/25 text-white/80'
              : 'bg-brand-ink text-white'
          }`}
        >
          {tag}
        </span>
      </AnimatedSection>
      <AnimatedSection delay={0.08}>
        <h2
          className={`text-h2 ${centered ? '' : ''} ${
            light ? 'text-white' : 'text-brand-ink'
          }`}
        >
          {title}
        </h2>
      </AnimatedSection>
      {subtitle && (
        <AnimatedSection delay={0.15}>
          <p
            className={`mt-4 text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${
              light ? 'text-neutral-300' : 'text-brand-text-secondary'
            }`}
          >
            {subtitle}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
