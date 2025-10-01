import { AnimatedActionButton } from '@/ui/animated-action-button';

export default function GreetingsPage() {
  return (
    <main className="mx-auto max-w-4xl px-8 py-12">
      <div className="mb-8 text-left">
        <h1 className="mb-4 font-bold text-4xl text-gray-900">안녕하세요 👋</h1>
        <p className="text-gray-600 text-lg">
          프론트엔드 엔지니어 손지민입니다.
          <br />
          만나서 반갑습니다.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-bold text-2xl text-gray-900">
                찾을 수 없는 곳에서 보석을 찾습니다
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                저는 복잡한 문제 속에서 단순하고 명쾌한 해결책을 찾는 것을
                좋아합니다. 사용자가 느끼는 작은 불편함도 놓치지 않고, 더 나은
                경험을 만들기 위해 고민합니다.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-2xl text-gray-900">
                협업을 통해 성장합니다
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                혼자 일하는 것보다 함께 일하는 것을 선호합니다. 다양한 관점에서
                나온 아이디어들이 모여 더 좋은 결과물을 만든다고 믿습니다.
                동료들과 함께 배우고 성장하는 과정을 즐깁니다.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-2xl text-gray-900">
                기술로 가치를 만듭니다
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                단순히 코드를 작성하는 것을 넘어, 비즈니스 가치를 창출하는 것에
                관심이 많습니다. 사용자에게 의미 있는 경험을 제공하고, 팀의 목표
                달성에 기여하는 것이 저의 목표입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white p-8">
          <div className="space-y-4">
            <h2 className="font-bold text-2xl text-gray-900">
              이런 것들에 관심이 있어요
            </h2>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                <span>사용자 중심의 인터페이스 설계와 접근성</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                <span>성능 최적화와 웹 표준</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                <span>팀 문화와 개발자 경험(DX) 개선</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                <span>디자인 시스템과 컴포넌트 아키텍처</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-gradient-to-br from-purple-50 to-white p-8">
          <div className="space-y-6">
            <h2 className="font-bold text-2xl text-gray-900">
              더 알고 싶으신가요?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              커피 한 잔 하며 이야기 나누고 싶으시다면 언제든 연락주세요.
              <br />
              서로의 경험과 인사이트를 나누는 시간이 되었으면 좋겠습니다.
            </p>
            <div className="flex items-center gap-4">
              <AnimatedActionButton href="/coffee-chat">
                커피챗 신청하기
              </AnimatedActionButton>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
