import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Dashboard - Wave Health" },
    { name: "User Dashboard", content: "Take home assessment" },
  ];
}

export default function Home() {
  return <>test</>;
}
