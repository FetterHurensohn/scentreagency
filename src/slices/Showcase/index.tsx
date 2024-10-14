import Bounded from '@/components/Bounded';
import ButtonLink from '@/components/ButtonLink';
import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import clsx from 'clsx';
import { PiGearSixBold } from "react-icons/pi";
import { PiArrowsClockwiseFill } from "react-icons/pi";

const icons = {
  gear: <PiGearSixBold />,
  cycle: <PiArrowsClockwiseFill/>
}

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  console.log(slice.primary);
  const iconKey = slice.primary.icon?.toLowerCase();
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-purple-200/20 blur-3xl filter" />
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
              {children}
            </h2>
          ),
        }} />
      <div className="mt-16 grid items-center rounded-xl border border-purple-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:py-12 gap-8 lg:gap-0">
        <div>
          


         <div className="w-fit rounded-lg bg-purple-500/80 p-4 text-3xl"> 
          {iconKey && icons[iconKey] ? icons[iconKey] : <span>Icon not found</span>}
         </div>

          <div className="mt-6 text-2xl font-normal">
            <PrismicRichText field={slice.primary.sub_heading} />
          </div>

          <div className="prose prose-invert mt-4 max-w-xl">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ButtonLink field={slice.primary.buttonlink}
            className="mt-6">
            {slice.primary.button_text || "Learn More"}
          </ButtonLink>

        </div>

        <PrismicNextImage field={slice.primary.image} className={clsx(
          "opacity-90 shadow-xl lg:col-span-2 lg:pt-0 rounded-2xl",
          slice.variation == "reverse" ? "lg:order-1 lg:translate-x-[15%]" :
          "lg:-order-1 lg:translate-x-[-15%]")} />
      </div>
    </Bounded>
  );
};

export default Showcase;
