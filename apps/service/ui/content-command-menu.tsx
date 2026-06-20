"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { PostCommandItem } from "@/lib/content/command-items";

interface ContentCommandMenuProps {
  items: PostCommandItem[];
}

export function ContentCommandMenu({ items }: ContentCommandMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((currentOpen) => !currentOpen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectItem = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        className="mb-8 flex h-12 w-full items-center gap-2.5 rounded-lg border border-neutral-100 bg-white px-4 text-left transition-colors hover:border-neutral-200 hover:bg-neutral-50"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Search className="h-4.5 w-4.5 flex-shrink-0 text-neutral-300" />
        <span className="min-w-0 flex-1 text-[16px] text-neutral-400">
          Search
        </span>
        <kbd className="hidden h-6 min-w-10 items-center justify-center gap-0.5 rounded-md bg-neutral-50 px-2 font-medium text-[12px] text-neutral-300 leading-none sm:inline-flex">
          <span className="translate-y-px">⌘</span>
          <span>K</span>
        </kbd>
      </button>

      <Command.Dialog
        className="overflow-hidden"
        contentClassName="fixed top-[18vh] left-1/2 z-50 w-[calc(100vw-2rem)] max-w-[40rem] -translate-x-1/2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl"
        label="콘텐츠 검색"
        loop
        onOpenChange={setOpen}
        open={open}
        overlayClassName="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm"
      >
        <div className="flex h-13 items-center gap-2.5 border-neutral-100 border-b px-4">
          <Search className="h-4.5 w-4.5 flex-shrink-0 text-neutral-300" />
          <Command.Input
            autoFocus
            className="min-w-0 flex-1 bg-transparent text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400"
            placeholder="Search"
          />
        </div>
        <Command.List className="max-h-[22rem] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-[13px] text-neutral-400">
            검색 결과가 없습니다.
          </Command.Empty>
          <Command.Group
            className="space-y-1"
            heading={
              <span className="px-3 py-2 font-medium text-[11px] text-neutral-300 uppercase">
                Posts
              </span>
            }
          >
            {items.map((item) => (
              <Command.Item
                className="grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg px-3 py-3 text-[14px] text-neutral-500 outline-none transition-colors data-[selected=true]:bg-neutral-50 data-[selected=true]:text-neutral-900"
                key={item.slug}
                keywords={item.keywords}
                onSelect={() => selectItem(item.href)}
                value={item.value}
              >
                <span className="truncate">{item.title}</span>
                <span className="text-[12px] text-neutral-300">
                  {item.date}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
