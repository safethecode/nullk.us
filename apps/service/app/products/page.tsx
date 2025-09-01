'use client';

import { AspectRatio } from '@heiglabs/design-system/aspect-ratio';
import { Badge } from '@heiglabs/design-system/badge';
import { Button } from '@heiglabs/design-system/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@heiglabs/design-system/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@heiglabs/design-system/pagination';
import { cn } from '@heiglabs/design-system/utils';
import { JetBrains_Mono } from 'next/font/google';
import { memo, useCallback, useState } from 'react';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetBrainsMono',
});

// Product data structure
type Product = {
  id: string;
  name: string;
  description: string;
  logo: string;
  role: string;
  contribution: string;
  isLaunched: boolean;
  launchDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  status: 'active' | 'archived' | 'beta' | 'planning';
};

// Sample product data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nullk.us',
    description:
      'Personal portfolio and product showcase platform built with Next.js and TypeScript.',
    logo: '/nullk-logo.svg',
    role: 'Full Stack Developer',
    contribution: 'Design, Development, Deployment',
    isLaunched: true,
    launchDate: '2024-01-15',
    githubUrl: 'https://github.com/safethecode/nullk.us',
    liveUrl: 'https://nullk.us',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Stage Engineer',
    description:
      'Interactive Q&A platform for stage engineers with real-time collaboration features.',
    logo: '/damascuse-media-logo.svg',
    role: 'Lead Developer',
    contribution: 'Architecture, Frontend, Backend',
    isLaunched: true,
    launchDate: '2024-03-20',
    githubUrl: 'https://github.com/safethecode/stage-engineer',
    liveUrl: 'https://stage.nullk.us',
    techStack: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
    status: 'active',
  },
  {
    id: '3',
    name: 'Product Launch Tracker',
    description:
      'Dashboard for tracking product launches, metrics, and user feedback.',
    logo: '/nullk-logo.svg',
    role: 'Product Manager & Developer',
    contribution: 'Product Strategy, UI/UX, Development',
    isLaunched: false,
    techStack: ['Vue.js', 'Firebase', 'Chart.js'],
    status: 'planning',
  },
  {
    id: '4',
    name: 'Code Review Assistant',
    description:
      'AI-powered code review tool that helps developers write better code.',
    logo: '/damascuse-media-logo.svg',
    role: 'ML Engineer',
    contribution: 'AI Model, API Development',
    isLaunched: true,
    launchDate: '2024-02-10',
    githubUrl: 'https://github.com/safethecode/code-review-assistant',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
    status: 'beta',
  },
  {
    id: '5',
    name: 'Design System',
    description:
      'Comprehensive design system with reusable components and documentation.',
    logo: '/nullk-logo.svg',
    role: 'Design System Lead',
    contribution: 'Component Design, Documentation',
    isLaunched: true,
    launchDate: '2024-01-01',
    githubUrl: 'https://github.com/safethecode/design-system',
    techStack: ['React', 'Storybook', 'TypeScript', 'Tailwind'],
    status: 'active',
  },
  {
    id: '6',
    name: 'API Gateway',
    description:
      'High-performance API gateway with rate limiting and authentication.',
    logo: '/damascuse-media-logo.svg',
    role: 'Backend Engineer',
    contribution: 'Architecture, Performance Optimization',
    isLaunched: true,
    launchDate: '2023-12-15',
    githubUrl: 'https://github.com/safethecode/api-gateway',
    techStack: ['Go', 'Redis', 'Kubernetes', 'gRPC'],
    status: 'active',
  },
  {
    id: '7',
    name: 'Mobile App Framework',
    description:
      'Cross-platform mobile development framework with native performance.',
    logo: '/nullk-logo.svg',
    role: 'Mobile Developer',
    contribution: 'Framework Design, Core Development',
    isLaunched: false,
    techStack: ['React Native', 'TypeScript', 'Native Modules'],
    status: 'planning',
  },
  {
    id: '8',
    name: 'Analytics Dashboard',
    description:
      'Real-time analytics dashboard with customizable widgets and reports.',
    logo: '/damascuse-media-logo.svg',
    role: 'Data Engineer',
    contribution: 'Data Pipeline, Visualization',
    isLaunched: true,
    launchDate: '2024-04-05',
    githubUrl: 'https://github.com/safethecode/analytics-dashboard',
    liveUrl: 'https://analytics.nullk.us',
    techStack: ['React', 'D3.js', 'Apache Kafka', 'ClickHouse'],
    status: 'active',
  },
];

const ITEMS_PER_PAGE = 6;

const StatusBadge = memo(function StatusBadge({
  status,
}: { status: Product['status'] }) {
  const statusConfig = {
    active: {
      label: 'Active',
      className: 'bg-green-900 text-green-300 border-green-700',
    },
    beta: {
      label: 'Beta',
      className: 'bg-blue-900 text-blue-300 border-blue-700',
    },
    planning: {
      label: 'Planning',
      className: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    },
    archived: {
      label: 'Archived',
      className: 'bg-neutral-800 text-neutral-400 border-neutral-700',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
});

const ProductCard = memo(function ProductCard({
  product,
}: { product: Product }) {
  const handleExternalClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <Card className="group h-87 border-neutral-900 bg-black transition-all duration-300 hover:shadow-lg hover:shadow-neutral-800/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-lg bg-neutral-800 p-2">
              <AspectRatio ratio={1} className="h-full w-full">
                <img
                  src={product.logo}
                  alt={`${product.name} logo`}
                  className="h-full w-full object-contain"
                />
              </AspectRatio>
            </div>
            <div>
              <CardTitle
                className={`${jetBrainsMono.className} text-lg text-neutral-100`}
              >
                {product.name}
              </CardTitle>
              <StatusBadge status={product.status} />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-neutral-400">
          {product.description}
        </CardDescription>

        <div className="space-y-3">
          <div className="text-neutral-300 text-sm">
            <span className={`${jetBrainsMono.className}`}>
              <span className="font-medium">Role:</span> {product.role}
            </span>
          </div>

          <div className="text-neutral-300 text-sm">
            <span className={`${jetBrainsMono.className}`}>
              <span className="font-medium">Contribution:</span>{' '}
              {product.contribution}
            </span>
          </div>

          {product.isLaunched && product.launchDate && (
            <div className="text-neutral-300 text-sm">
              <span className={`${jetBrainsMono.className}`}>
                <span className="font-medium">Launched:</span>{' '}
                {new Date(product.launchDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {product.liveUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExternalClick(product.liveUrl as string)}
              className="flex items-center gap-1 border-neutral-900 bg-neutral-950 text-neutral-300 hover:border-neutral-800 hover:bg-neutral-900 hover:text-neutral-100"
            >
              <span className={`${jetBrainsMono.className} text-xs`}>Live</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

const ProductGrid = memo(function ProductGrid({
  products,
}: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

const PaginationComponent = memo(function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={cn(
              'cursor-pointer hover:bg-neutral-900 hover:text-white!',
              currentPage === 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            )}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={currentPage === page}
              className={cn(
                'cursor-pointer hover:bg-neutral-900 hover:text-white!',
                currentPage === page
                  ? 'border-neutral-900 bg-neutral-950 text-white!'
                  : 'border-neutral-800'
              )}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={cn(
              'cursor-pointer hover:bg-neutral-900 hover:text-white!',
              currentPage === totalPages
                ? 'pointer-events-none opacity-50'
                : 'border-neutral-800'
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = PRODUCTS.slice(startIndex, endIndex);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1
            className={`mb-4 font-bold text-4xl text-neutral-800 ${jetBrainsMono.className}`}
          >
            Product Launch
          </h1>
          <p className={`text-lg text-neutral-900 ${jetBrainsMono.className}`}>
            A collection of projects I've worked on, from concept to launch
          </p>
        </header>

        <main className="space-y-8">
          <ProductGrid products={currentProducts} />

          {totalPages > 1 && (
            <div className="flex justify-center pt-8">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </main>

        <footer className="mt-16 text-center">
          <p className={`text-neutral-500 text-sm ${jetBrainsMono.className}`}>
            Showing {startIndex + 1}-{Math.min(endIndex, PRODUCTS.length)} of{' '}
            {PRODUCTS.length} products
          </p>
        </footer>
      </div>
    </div>
  );
}
