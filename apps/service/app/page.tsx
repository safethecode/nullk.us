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
        className="relative flex min-h-[calc(100svh-5rem)] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-8 sm:py-20"
      >
        <section className="flex w-full flex-col items-center">
          <section
            aria-label="개인 키워드"
            className="mb-6 w-full max-w-[22rem] text-center font-inter-tight font-light text-[clamp(1rem,5vw,1.7rem)] text-neutral-800 leading-[1.2] tracking-[-0.055em] sm:mb-9 sm:max-w-[30rem] sm:leading-[1.16]"
          >
            <p className="whitespace-nowrap">
              커피<em className="italic">(#1)</em> / 프론트엔드
              <em className="italic">(#12)</em>
            </p>
            <p className="whitespace-nowrap">
              <strong className="font-medium">완성도 높은 제품</strong>
              <em className="italic">(#24)</em> / 호기심
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

        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-jetbrains-mono text-[12px] text-neutral-400 sm:bottom-6">
          <span className="sr-only">아래로 스크롤</span>
          <span aria-hidden="true" className="home-scroll-cue-arrow">
            ↓
          </span>
        </p>
      </section>

      <details
        className="group fixed right-4 bottom-4 z-40 w-fit font-service-mono text-neutral-900 open:w-[min(calc(100vw-2rem),22rem)] sm:right-6 sm:bottom-6"
        open
      >
        <summary
          aria-label="Toggle question"
          className="ml-auto flex cursor-pointer list-none items-center justify-center bg-white px-4 py-2.5 text-[10px] shadow-[inset_0_0_0_1px_#171717,0_5px_18px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-180 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_#171717,0_8px_24px_rgba(0,0,0,0.12)] group-open:absolute group-open:top-3 group-open:right-3 group-open:z-10 group-open:size-5 group-open:bg-transparent group-open:p-0 group-open:text-[16px] group-open:shadow-none group-open:hover:translate-y-0"
        >
          <span className="group-open:hidden">Question</span>
          <span aria-hidden="true" className="hidden group-open:inline">
            ×
          </span>
        </summary>

        <section
          aria-labelledby="service-essence-question"
          className="hidden w-full border border-neutral-900 border-dashed bg-white text-center shadow-[0_8px_28px_rgba(0,0,0,0.08)] group-open:block"
        >
          <div className="border-neutral-900 border-b border-dashed px-7 py-8 sm:px-9 sm:py-9">
            <p className="mb-4 text-[9px] uppercase leading-none tracking-[0.02em]">
              Question
            </p>
            <h2
              className="text-[15px] leading-[1.55] tracking-[-0.015em] sm:text-[16px]"
              id="service-essence-question"
            >
              What is the essence of your service?
            </h2>
          </div>

          <div className="flex flex-col items-center px-7 py-6 sm:px-9 sm:py-7">
            <label
              className="mb-4 text-[9px] uppercase leading-none tracking-normal"
              htmlFor="service-essence-answer"
            >
              Your answer
            </label>
            <input
              autoComplete="off"
              className="service-essence-input w-full border-0 bg-transparent px-1 pb-1.5 text-center text-[12px] uppercase tracking-normal outline-none placeholder:text-neutral-300"
              id="service-essence-answer"
              maxLength={80}
              name="serviceEssence"
              placeholder="TYPE HERE"
              type="text"
            />
            <button
              className="mt-5 text-[11px] underline decoration-1 underline-offset-4 transition-[opacity,transform] duration-150 hover:opacity-55 active:translate-y-px"
              type="button"
            >
              OK
            </button>
          </div>
        </section>
      </details>
    </main>
  );
}
