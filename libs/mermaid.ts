import mermaid, { MermaidConfig } from "mermaid";

let isInitialized = false;

export const initMermaid = (theme: MermaidConfig["theme"]) => {
  if (isInitialized) return;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme,
  });

  isInitialized = true;
};

export default mermaid;
