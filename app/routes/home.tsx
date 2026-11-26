import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kitfud" },
    { name: "description", content: "My personal website, built as an interactive isometric 3D room." },
  ];
}

export default function Home() {
  return (
    <main>
      <h1>Kitfud</h1>
      <p>This site is currently under construction.</p>
    </main>
  );
}
