import Bounded from '@/components/Bounded';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import { JSXMapSerializer } from '@prismicio/react';



/**
 * Props for `RichText`.
 */
export type RichTextProps = SliceComponentProps<Content.RichTextSlice>;


// Prüfe, ob deine Komponente korrekt erstellt ist
const components: JSXMapSerializer = {
  // Hier fügst du alle Block- oder Inline-Komponenten hinzu, die du rendern möchtest
  heading2: ({ children }) => <h2>{children}</h2>,
  paragraph: ({ children }) => <p>{children}</p>,
  // etc...
};
/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="prose prose-invert prose-lg prose-slate">
      <PrismicRichText field={slice.primary.richtext} components={components} />
      </div>

    </Bounded>
  );
};

export default RichText;
