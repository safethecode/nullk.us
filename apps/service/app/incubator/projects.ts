export interface IncubatorProject {
  logo: string;
  title: string;
  url: string;
}

export const INCUBATOR_PROJECTS = [
  {
    logo: "/assets/logos/projects/wratop-icon.png",
    title: "Wratop",
    url: "https://github.com/safethecode/wratop",
  },
] as const satisfies readonly IncubatorProject[];
