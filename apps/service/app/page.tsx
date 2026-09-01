import Image from "next/image";

const PERSON_IMAGES = Array.from(
  { length: 24 },
  (_, index) =>
    `/assets/people/person_${String(index + 1).padStart(2, "0")}.png`
);

export default function Home() {
  return (
    <main data-page-footer="hidden">
      <section
        aria-label="개인 소개"
        className="relative flex min-h-[calc(100svh-4rem)] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-8 sm:py-20"
      >
        <section className="flex w-full flex-col items-center">
          <section
            aria-label="개인 키워드"
            className="mb-6 w-full max-w-[22rem] text-center font-inter-tight font-light text-[clamp(0.78rem,3.8vw,1.7rem)] text-neutral-800 leading-[1.2] tracking-[-0.055em] sm:mb-9 sm:max-w-[30rem] sm:leading-[1.16]"
          >
            <p className="whitespace-nowrap">
              Coffee<em className="italic">(#1)</em> / Frontend
              <em className="italic">(#12)</em> /
            </p>
            <p className="whitespace-nowrap">
              Products<em className="italic">(#24)</em> / Curiosity
              <em className="italic">(#∞)</em>
            </p>
          </section>

          <section
            aria-label="인물 사진 모음"
            className="grid w-[calc(100%+1rem)] max-w-[23rem] grid-cols-6 sm:w-full sm:max-w-[34rem] sm:grid-cols-8"
          >
            {PERSON_IMAGES.map((src) => (
              <div className="relative aspect-[257/366]" key={src}>
                <Image
                  alt=""
                  className="object-contain"
                  fill
                  loading="eager"
                  sizes="(max-width: 639px) 16vw, 68px"
                  src={src}
                />
              </div>
            ))}
          </section>

          <div className="mt-7 text-center sm:mt-10">
            <p className="font-jetbrains-mono text-[10px] text-neutral-400 leading-relaxed tracking-[0.06em] sm:text-[11px]">
              always curious, usually caffeinated.
              <br />
              building small things that feel alive.
            </p>
          </div>
        </section>

        <p className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap font-jetbrains-mono text-[10px] text-neutral-400 tracking-[0.08em] sm:bottom-6">
          <span aria-hidden="true" className="home-scroll-cue-arrow">
            ↓
          </span>
          scroll down
        </p>
      </section>

      <section
        aria-labelledby="service-essence-question"
        className="flex min-h-svh items-center justify-center px-5 py-20"
      >
        <div className="w-full max-w-[22rem] border border-neutral-900 border-dashed bg-white text-center font-service-mono text-neutral-900">
          <div className="border-neutral-900 border-b border-dashed px-7 py-10 sm:px-10 sm:py-12">
            <p className="mb-4 text-[9px] uppercase leading-none tracking-[0.16em]">
              One small question
            </p>
            <h2
              className="text-[15px] leading-[1.55] tracking-[-0.045em] sm:text-[16px]"
              id="service-essence-question"
            >
              What is the essence of your service?
            </h2>
          </div>

          <label
            className="flex flex-col items-center px-7 py-7 sm:px-10 sm:py-8"
            htmlFor="service-essence-answer"
          >
            <span className="mb-4 text-[9px] uppercase leading-none tracking-[0.16em]">
              Your answer
            </span>
            <input
              autoComplete="off"
              className="w-full border-0 border-neutral-900 border-b bg-transparent px-1 pb-1.5 text-center text-[12px] uppercase tracking-[0.05em] outline-none placeholder:text-neutral-300 focus:border-b-2"
              id="service-essence-answer"
              maxLength={80}
              name="serviceEssence"
              placeholder="TYPE HERE"
              type="text"
            />
          </label>
        </div>
      </section>
    </main>
  );
}
