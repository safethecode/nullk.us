'use client';

import { Button } from '@heiglabs/design-system/button';
import { useEffect, useState } from 'react';

// Mock data for shorts videos
const shortsVideos = [
  {
    id: 1,
    title: 'CEO 인터뷰',
    company: '테크스타트업 A',
    thumbnail:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop',
    duration: '2:30',
  },
  {
    id: 2,
    title: '팀워크 스토리',
    company: '글로벌 기업 B',
    thumbnail:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop',
    duration: '1:45',
  },
  {
    id: 3,
    title: '혁신 프로젝트',
    company: '스타트업 C',
    thumbnail:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop',
    duration: '3:15',
  },
  {
    id: 4,
    title: '고객 만족도',
    company: '서비스 기업 D',
    thumbnail:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop',
    duration: '2:00',
  },
  {
    id: 5,
    title: '성장 스토리',
    company: '제조업체 E',
    thumbnail:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=600&fit=crop',
    duration: '2:45',
  },
  {
    id: 6,
    title: '문화 이야기',
    company: 'IT 기업 F',
    thumbnail:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=600&fit=crop',
    duration: '1:55',
  },
];

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % shortsVideos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-900"></div>

        {/* Subtle wave animation */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="wave-container">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="wave"
                style={{
                  animationDelay: `${i * 1}s`,
                  animationDuration: `${8 + i * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Shorts Videos */}
        <div className="pointer-events-none absolute inset-0">
          <div className="shorts-container">
            {shortsVideos.map((video, index) => (
              <div
                key={video.id}
                className={`shorts-video ${index === currentVideoIndex ? 'active' : ''}`}
                style={{
                  animationDelay: `${index * 0.3}s`,
                  left: `${20 + (index % 3) * 30}%`,
                  top: `${15 + (index % 2) * 35}%`,
                }}
              >
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <div className="video-overlay">
                      <div className="play-button">
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="video-duration">{video.duration}</div>
                  </div>
                  <div className="video-info">
                    <h4 className="font-medium text-sm text-white">
                      {video.title}
                    </h4>
                    <p className="text-gray-400 text-xs">{video.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <div className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-gray-300 text-sm backdrop-blur-sm">
            <span className="mr-2">🎬</span>
            기업 홍보 영상 전문 서비스
          </div>

          <h1 className="mb-8 font-bold text-5xl leading-tight md:text-7xl">
            당신의 기업을
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              영상으로 만나보세요
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-gray-300 text-xl leading-relaxed md:text-2xl">
            전문적인 인터뷰 영상 제작으로 기업의 스토리를 매력적으로 전달하고,
            브랜드 가치를 높여보세요.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-medium text-lg text-white hover:from-blue-700 hover:to-indigo-700"
            >
              무료 상담 신청
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 px-8 py-4 font-medium text-lg text-white hover:bg-white hover:text-black"
            >
              포트폴리오 보기
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-3 font-bold text-3xl text-blue-400 md:text-4xl">
                500+
              </div>
              <div className="text-gray-400 text-sm">제작 완료 영상</div>
            </div>
            <div className="text-center">
              <div className="mb-3 font-bold text-3xl text-indigo-400 md:text-4xl">
                98%
              </div>
              <div className="text-gray-400 text-sm">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="mb-3 font-bold text-3xl text-blue-300 md:text-4xl">
                24시간
              </div>
              <div className="text-gray-400 text-sm">빠른 제작</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 font-medium text-blue-700 text-sm">
              🚀 서비스 특징
            </div>
            <h2 className="mb-8 font-bold text-4xl text-gray-900 md:text-5xl">
              기업 홍보를 위한
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                완벽한 솔루션
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 text-xl">
              전문적인 영상 제작부터 효과적인 배포까지, 기업의 브랜드 가치를
              높이는 모든 과정을 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '🎬',
                title: '전문 영상 제작',
                desc: '경험 많은 영상 제작팀이 기업의 스토리를 매력적으로 담아냅니다.',
              },
              {
                icon: '📱',
                title: '쇼츠 최적화',
                desc: '모바일 환경에 최적화된 쇼츠 영상으로 더 많은 사람들에게 도달하세요.',
              },
              {
                icon: '🎯',
                title: '타겟 마케팅',
                desc: '목표 고객층을 정확히 파악하여 효과적인 마케팅 메시지를 전달합니다.',
              },
              {
                icon: '⚡',
                title: '빠른 제작',
                desc: '신속한 제작 프로세스로 빠른 시장 진입을 지원합니다.',
              },
              {
                icon: '📊',
                title: '성과 분석',
                desc: '영상의 성과를 실시간으로 분석하고 개선 방향을 제시합니다.',
              },
              {
                icon: '🤝',
                title: '지속적 파트너십',
                desc: '일회성이 아닌 장기적인 파트너십으로 지속적인 성장을 지원합니다.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-center">
                  <div className="mb-6 text-4xl transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mb-4 font-bold text-gray-900 text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-gray-300 text-sm backdrop-blur-sm">
              📞 문의하기
            </div>
            <h2 className="mb-8 font-bold text-4xl text-white md:text-5xl">
              지금 바로
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                상담을 시작하세요
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-gray-300 text-xl">
              기업 홍보 영상 제작에 대해 궁금한 점이 있으시다면 언제든
              연락주세요. 전문가가 직접 상담해드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="mb-8 font-bold text-2xl text-white">
                무료 상담 신청
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="이름"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="회사명"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="email"
                    placeholder="이메일"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="연락처"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <textarea
                  placeholder="문의 내용을 입력해주세요..."
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none"
                ></textarea>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-medium text-lg text-white hover:from-blue-700 hover:to-indigo-700"
                >
                  무료 상담 신청하기
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="mb-8 font-bold text-2xl text-white">
                  연락처 정보
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center text-gray-300">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
                      <svg
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-white">전화 상담</div>
                      <div className="text-gray-400">1588-1234</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20">
                      <svg
                        className="h-6 w-6 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-white">이메일</div>
                      <div className="text-gray-400">contact@company.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h4 className="mb-4 font-semibold text-lg text-white">
                  영업 시간
                </h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>평일</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>토요일</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>일요일</span>
                    <span>휴무</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .wave-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .wave {
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(-40deg, rgb(9, 29, 84) 0%, rgb(31, 62, 112) 23.2951%, rgb(54, 100, 224) 68.1272%, rgb(121, 158, 255) 100%);
          border-radius: 50%;
          animation: wave-float 10s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes wave-float {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg) scale(1.1);
            opacity: 0.2;
          }
        }

        .shorts-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .shorts-video {
          position: absolute;
          width: 180px;
          height: 270px;
          opacity: 0;
          transform: translateY(30px) scale(0.9);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          animation: float-video 10s ease-in-out infinite;
        }

        .shorts-video.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @keyframes float-video {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(1deg);
          }
          50% {
            transform: translateY(-8px) rotate(-0.5deg);
          }
          75% {
            transform: translateY(-12px) rotate(0.5deg);
          }
        }

        .video-card {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .video-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .video-thumbnail {
          position: relative;
          width: 100%;
          height: 70%;
          overflow: hidden;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-card:hover .video-overlay {
          opacity: 1;
        }

        .play-button {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1f2937;
          transition: all 0.3s ease;
        }

        .play-button:hover {
          background: white;
          transform: scale(1.1);
        }

        .video-duration {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }

        .video-info {
          padding: 12px;
          background: rgba(255, 255, 255, 0.02);
        }

        @media (max-width: 768px) {
          .shorts-video {
            width: 140px;
            height: 210px;
          }
          
          .wave {
            animation-duration: 8s;
          }
        }
      `}</style>
    </div>
  );
}
