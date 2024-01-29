import { ReactChild, ReactElement } from "react";

const sharedClasses = "";
const bodyClasses = "text-lg text-gray-200";

const renderers: Renderers = {
  h1: ({ children }) =>
    `<h1 class="mb-4 text-4xl text-white md:text-5xl lg:text-6xl  ${sharedClasses}">${children}</h1>`,
  h2: ({ children }) =>
    `<h1 class="mb-4 text-3xl text-white md:text-5xl lg:text-6xl ${sharedClasses}">${children}</h1>`,
  h3: ({ children }) =>
    `<h3 class="text-3xl ${sharedClasses}">${children}</h3>`,
  h4: ({ children }) =>
    `<h4 class="text-2xl ${sharedClasses}">${children}</h3>`,
  h5: ({ children }) => `<h5 class="text-xl ${sharedClasses}">${children}</h3>`,
  h6: ({ children }) =>
    `<h6 class="text-large ${sharedClasses}">${children}</h3>`,
  p: ({ children }) =>
    `<p class="my-4 text-lg ${bodyClasses} ${sharedClasses}">${children}</p>`,
  ul: ({ children }) =>
    `<ul class="list-disc list-inside my-4 text-lg ${bodyClasses} ${sharedClasses}">${children}</ul>`,
  ol: ({ children }) =>
    `<ol class="list-decimal list-inside my-4 text-lg ${bodyClasses} ${sharedClasses}">${children}</ol>`,
  li: ({ children }) =>
    `<li class="my-2 text-lg ${bodyClasses} ${sharedClasses}">${children}</li>`,
  code: ({ children }) =>
    `<code class="bg-gray-800 rounded-md p-2 text-sm ${sharedClasses}">${children}</code>`,
  code_block: ({ children }) =>
    `<pre class="bg-gray-800 overflow-y-scroll rounded-md p-2 text-sm ${sharedClasses}">${children}</pre>`,
};

type Renderers = {
  [key: string]: (props: { children: ReactElement }) => string;
};
