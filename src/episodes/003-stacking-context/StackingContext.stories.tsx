import type { Meta, StoryObj } from "@storybook/react-vite";
import "./stacking-context.scss";

type StackArgs = {
  parentZ: number | "auto";
  childZ: number;
  transform: boolean;
  opacity: number;
  isolate: boolean;
};

const defaults: StackArgs = {
  parentZ: "auto",
  childZ: 9999,
  transform: false,
  opacity: 1,
  isolate: false,
};

const Layers = ({
  parentZ,
  childZ,
  transform,
  opacity,
  isolate,
}: StackArgs) => {
  const hasContext = parentZ !== "auto" || transform || opacity < 1 || isolate;

  return (
    <div className="stack-demo__diagram">
      <div
        className="stack-demo__parent"
        style={{
          zIndex: parentZ,
          transform: transform ? "translateX(0)" : "none",
          opacity,
          isolation: isolate ? "isolate" : "auto",
        }}
      >
        <span>부모 A · {parentZ}</span>
        <div className="stack-demo__child" style={{ zIndex: childZ }}>
          <strong>자식 A</strong>
          <code>z: {childZ}</code>
        </div>
      </div>
      <div className="stack-demo__sibling">
        <strong>부모 B</strong>
        <code>z: 2</code>
      </div>
      <p className="stack-demo__context">
        {hasContext ? "장면 → 부모 A → 자식 A" : "장면 → 자식 A"} · 장면 → 부모
        B
      </p>
    </div>
  );
};

const Playground = (args: StackArgs) => (
  <main className="stack-demo">
    <Layers {...args} />
  </main>
);

const Comparison = ({
  before,
  after,
  change,
}: {
  before: string;
  after: string;
  change: Partial<StackArgs>;
}) => (
  <main className="stack-demo">
    <div className="stack-demo__comparison">
      <section aria-label={before}>
        <p className="stack-demo__caption">
          <code>{before}</code>
        </p>
        <Layers {...defaults} />
      </section>
      <section aria-label={after}>
        <p className="stack-demo__caption">
          <code>{after}</code>
        </p>
        <Layers {...defaults} {...change} />
      </section>
    </div>
  </main>
);

const meta = {
  title: "알고 꺼드럭대자/003. z-index: 9999도 안 되는 이유",
  id: "003-stacking-context",
  component: Playground,
  args: defaults,
  parameters: { controls: { disable: true } },
  argTypes: {
    parentZ: {
      name: "부모 A · z-index",
      control: "select",
      options: ["auto", -1, 0, 1, 2, 3, 9999],
    },
    childZ: {
      name: "자식 A · z-index",
      control: { type: "number", step: 1 },
    },
    transform: { control: "boolean" },
    opacity: { control: { type: "range", min: 0.1, max: 1, step: 0.05 } },
    isolate: { name: "isolation: isolate", control: "boolean" },
  },
} satisfies Meta<typeof Playground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicZIndex: Story = {
  name: "Basic Z-Index",
  render: () => (
    <main className="stack-demo">
      <div className="stack-demo__comparison">
        {[1, 3].map((z) => (
          <section key={z} aria-label={`A의 z-index가 ${z}일 때`}>
            <p className="stack-demo__caption">
              <code>A: {z} / B: 2</code>
            </p>
            <div className="stack-demo__diagram">
              <div className="stack-demo__first" style={{ zIndex: z }}>
                <strong>A</strong>
                <code>z: {z}</code>
              </div>
              <div className="stack-demo__sibling">
                <strong>B</strong>
                <code>z: 2</code>
              </div>
              <p className="stack-demo__context">장면 → A · 장면 → B</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  ),
};

export const StackingContextProblem: Story = { args: { parentZ: 1 } };

export const TransformAndStackingContext: Story = {
  render: () => (
    <Comparison
      before="transform: none"
      after="transform: translateX(0)"
      change={{ transform: true }}
    />
  ),
};

export const OpacityAndStackingContext: Story = {
  render: () => (
    <Comparison
      before="opacity: 1"
      after="opacity: 0.8"
      change={{ opacity: 0.8 }}
    />
  ),
};

export const Isolation: Story = {
  render: () => (
    <Comparison
      before="isolation: auto"
      after="isolation: isolate"
      change={{ isolate: true }}
    />
  ),
};

export const InteractivePlayground: Story = {
  parameters: { controls: { disable: false } },
};
