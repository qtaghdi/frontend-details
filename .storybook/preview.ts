import type { Preview } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: {
        gif: {
          name: "GIF · 640 × 360",
          styles: { width: "640px", height: "360px" },
          type: "other",
        },
        ...MINIMAL_VIEWPORTS,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        locales: "ko",
        includeNames: false,
      },
    },
  },
};

export default preview;
