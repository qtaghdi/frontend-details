import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import "./design-refinement.scss";

const stages = [
  "before",
  "typography",
  "spacing",
  "color",
  "hierarchy",
  "after",
] as const;

type Stage = (typeof stages)[number];

const Login = ({ stage }: { stage: Stage }) => {
  const [submitted, setSubmitted] = useState(false);
  const styles = stages
    .slice(1, stages.indexOf(stage) + 1)
    .map((step) => `design-demo__card--${step}`)
    .join(" ");

  return (
    <article className={`design-demo__card ${styles}`}>
      <header className="design-demo__intro">
        <p className="design-demo__brand">작업실</p>
        <h2>다시 만나서 반가워요</h2>
        <p>이메일로 작업 공간에 로그인하세요.</p>
      </header>
      <form
        className="design-demo__form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <label className="design-demo__field">
          이메일 주소
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
            onChange={() => setSubmitted(false)}
          />
        </label>
        <button type="submit">로그인</button>
      </form>
      <p className="design-demo__note" role="status">
        {submitted
          ? "이메일 형식을 확인했어요."
          : "연습용 화면 · 실제 인증 없음"}
      </p>
    </article>
  );
};

const DesignStage = ({ stage }: { stage: Stage }) => (
  <main className="design-demo">
    <Login stage={stage} />
  </main>
);

const meta = {
  title: "알고 꺼드럭대자/002. 왜 내 웹만 구릴까?",
  id: "002-design-refinement",
  component: DesignStage,
  args: { stage: "before" },
  argTypes: { stage: { control: "select", options: stages } },
} satisfies Meta<typeof DesignStage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Before: Story = {};
export const Typography: Story = { args: { stage: "typography" } };
export const Spacing: Story = { args: { stage: "spacing" } };
export const Color: Story = { args: { stage: "color" } };
export const VisualHierarchy: Story = { args: { stage: "hierarchy" } };
export const After: Story = { args: { stage: "after" } };

export const BeforeAfter: Story = {
  name: "Before / After",
  parameters: { controls: { disable: true } },
  render: () => (
    <main className="design-demo">
      <div className="design-demo__comparison">
        <section aria-label="Before">
          <p className="design-demo__caption">Before</p>
          <Login stage="before" />
        </section>
        <section aria-label="After">
          <p className="design-demo__caption">After</p>
          <Login stage="after" />
        </section>
      </div>
    </main>
  ),
};
