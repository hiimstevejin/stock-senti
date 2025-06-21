import TextEffect from "./text-effect";

export function TextEffectPerLine({ children }: { children: string }) {
  return (
    <TextEffect
      className="mt-8 max-w-2xl text-pretty text-2xl"
      per="line"
      as="p"
      segmentWrapperClassName="overflow-hidden block"
      variants={{
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        },
        item: {
          hidden: {
            opacity: 0,
            y: 40,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.4,
            },
          },
        },
      }}
    >
      {children}
    </TextEffect>
  );
}
