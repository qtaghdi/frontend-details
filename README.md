# 알고 꺼드럭대자

Velog 기술 블로그 시리즈를 위한 프론트엔드 실험실입니다. 브라우저 동작을 작은 Story로 구현하고, 실제 입력으로 비교한 결과를 글과 이미지 또는 GIF에 활용합니다.

[배포된 Storybook 열기](https://qtaghdi.github.io/frontend-details/)

`main`에 변경이 올라가면 GitHub Actions가 Storybook을 빌드해 GitHub Pages에 배포합니다.

## 사용 기술

React, TypeScript, Vite, Storybook, SCSS, pnpm, ESLint, Prettier를 사용합니다. Storybook의 Accessibility 패널에서 자동 검사 결과를 확인할 수 있습니다.

## 설치 및 실행

Node.js 24 LTS와 pnpm 12.14.0을 사용합니다.

```sh
pnpm install --frozen-lockfile
pnpm storybook
```

[Storybook 열기](http://localhost:6006)

```sh
pnpm build
pnpm lint
pnpm format:check
pnpm build-storybook
```

`pnpm build`는 TypeScript 타입을 검사합니다. 정적 Storybook 결과물은 `storybook-static/`에 생성됩니다.

## GIF 캡처

Canvas의 **Viewport size**에서 **GIF · 640 × 360**을 선택하면 실험 화면을 640 × 360 CSS 픽셀로 맞출 수 있습니다. 아래 격리 화면은 브라우저 콘텐츠 영역을 가득 채웁니다. 같은 크기로 녹화하려면 브라우저의 뷰포트를 640 × 360으로 맞추거나 녹화 도구에서 해당 크기의 영역을 선택하세요.

1. 실험 화면의 빈 곳을 클릭하고 녹화를 시작합니다.
2. Tab으로 01 → 02 → 03을 이동하고 Shift + Tab으로 되돌아갑니다. 비교 예제에서는 01을 클릭한 뒤 Tab을 눌러 테두리와 링을 비교할 수 있습니다.
3. 녹화 도구에서 GIF로 저장합니다.

| Story                  | 캡처 링크                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Browser Default        | [열기](https://qtaghdi.github.io/frontend-details/iframe.html?id=001-focus-ring--browser-default&viewMode=story)        |
| Outline Removed        | [열기](https://qtaghdi.github.io/frontend-details/iframe.html?id=001-focus-ring--outline-removed&viewMode=story)        |
| Custom Focus Ring      | [열기](https://qtaghdi.github.io/frontend-details/iframe.html?id=001-focus-ring--custom-focus-ring&viewMode=story)      |
| Focus vs Focus Visible | [열기](https://qtaghdi.github.io/frontend-details/iframe.html?id=001-focus-ring--focus-vs-focus-visible&viewMode=story) |

종이색과 잉크색을 기본으로 쓰고, 커스텀 링은 밝은 배경에서 보라색, 어두운 배경에서 연보라색으로 표시합니다. 색상, 버튼 규격, 간격, 링 두께는 `focus-ring.scss`의 CSS 변수로 조절합니다.

## Storybook Controls

- **count**는 한 배경에 놓일 버튼 개수를 2~4개로 조절합니다.
- **size**는 키캡을 44, 56, 64px 중 하나로 바꾸고 **labels**는 숫자와 영문자를 전환합니다.
- **Disable second button**은 두 번째 버튼을 비활성화합니다. Tab과 Shift + Tab은 이 버튼을 건너뜁니다.
- **Show selector legend**는 비교 Story의 범례를 숨깁니다. 버튼 위치는 그대로 유지됩니다.

커스텀 설정으로 녹화할 때는 Controls를 조절한 뒤 Canvas 툴바에서 **Open in isolation mode**를 선택하세요. 위 표의 링크는 기본 설정으로 열립니다. 호버와 누름은 버튼 배경에, 포커스는 테두리나 바깥 링에 표시됩니다.

## 에피소드 목록

| 회차 | 주제                         | Velog     |
| ---- | ---------------------------- | --------- |
| 001  | 포커스 링                    | 게시 예정 |
| 002  | 왜 내 웹만 구릴까?           | 게시 예정 |
| 003  | z-index: 9999도 안 되는 이유 | 게시 예정 |

게시 후 Velog 열의 ‘게시 예정’을 해당 글의 링크로 교체합니다.

### 001. 포커스 링

- **Browser Default** — 공통 버튼 디자인 위에 브라우저 기본 포커스 표시를 유지합니다. Tab과 Shift + Tab으로 관찰합니다.
- **Outline Removed** — 같은 버튼에서 outline을 지웁니다. 키보드로 포커스가 이동해도 위치를 눈으로 확인할 수 없는 의도된 실패입니다. 자동 검사 결과와 함께 직접 키보드로 확인하세요. [W3C 실패 기법 F78](https://www.w3.org/WAI/WCAG22/Techniques/failures/F78)
- **Custom Focus Ring** — 밝은 배경과 어두운 배경에서 `outline`과 `outline-offset`을 적용한 링을 관찰합니다. 키보드로 이동하며 표시가 분명하고 버튼 크기가 유지되는지 확인하세요. WCAG 적합성은 별도 평가가 필요합니다. [W3C Focus Visible 이해하기](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- **Focus vs Focus Visible** — 같은 버튼의 진한 테두리는 `:focus`를, 보라색 링은 `:focus-visible`을 나타냅니다. 후자는 포커스된 요소를 시각적으로 표시할지 브라우저가 입력 방식과 요소 종류 등을 고려해 판단할 때 일치합니다. 클릭과 Tab으로 비교하면 두 표시가 동시에 나타나는 경우도 볼 수 있습니다. [MDN :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible)

### 002. 왜 내 웹만 구릴까?

모든 단계에 같은 로그인 화면을 사용합니다. 유효한 이메일 형식으로 제출하면 화면 안에서 결과를 보여줍니다. Controls의 `stage`로 같은 크기의 Canvas에서 단계를 전환할 수 있습니다.

| Story            | 바뀐 부분과 관찰할 점                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Before           | 비슷한 크기의 제목과 본문, 제각각인 여백이 어디부터 읽어야 할지에 어떤 영향을 주는지 봅니다.                                   |
| Typography       | `font-size`, `font-weight`, `line-height`, `letter-spacing`으로 제목, 입력 라벨, 안내 문구에 서로 다른 읽기 우선순위를 줍니다. |
| Spacing          | 8px 단위의 `gap`, `padding`, `margin`으로 제목과 설명을 가까이 두고 입력 그룹과 구분합니다.                                    |
| Color            | 종이색 표면과 잉크색 본문을 적용하고 버튼을 보라색으로 강조합니다. 버튼과 보조 문구가 어떻게 다르게 읽히는지 비교합니다.       |
| Visual Hierarchy | 버튼을 폼 너비에 맞추고 `border-block-end`로 보조 안내를 분리합니다. 입력 후 다음 행동이 어디인지 살펴봅니다.                  |
| After            | 앞 단계에 `border-radius`, 얕은 그림자와 버튼 호버를 더합니다.                                                                 |
| Before / After   | 두 화면에서 같은 이메일을 제출해 보면서 정보와 행동은 같은 상태에서 디자인 차이를 비교합니다.                                  |

[로컬 Before / After 캡처](http://localhost:6006/iframe.html?id=002-design-refinement--before-after&viewMode=story)

### 003. z-index: 9999도 안 되는 이유

보라색은 A 또는 A의 자식, 초록색은 B입니다. 점선은 A의 실제 부모 경계이고, 하단의 화살표는 DOM 트리에서 쌓임 맥락을 형성하는 요소만 남긴 경로입니다. 각 장면은 Storybook의 다른 요소와 섞이지 않도록 자체 쌓임 맥락을 만듭니다.

| Story                          | 관찰할 동작과 핵심 CSS                                                                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic Z-Index                  | 같은 맥락에 있는 두 `position: absolute` 요소에서 A의 `z-index`를 1에서 3으로 바꾸면 겹친 영역의 순서가 뒤집힙니다. B는 2로 고정됩니다.      |
| Stacking Context Problem       | A는 1, B는 2입니다. A의 자식에 9999를 줘도 바깥 장면에서 비교하는 단위는 부모 A와 부모 B라서 B가 위에 남습니다.                              |
| Transform and Stacking Context | A의 `transform: none`을 `translateX(0)`으로 바꿉니다. 위치가 같아도 변환이 적용된 쪽에서는 A가 별도 맥락을 만들고 B가 자식을 덮습니다.       |
| Opacity and Stacking Context   | A의 `opacity`를 1에서 0.8로 바꾸면 A와 자식이 함께 합성되며 B가 위에 올라옵니다.                                                             |
| Isolation                      | A에 `isolation: isolate`를 적용하면 위치나 투명도를 바꾸지 않고 쌓임 맥락을 만들 수 있습니다.                                                |
| Interactive Playground         | 부모 A를 `auto`로 둔 상태에서 transform, opacity, isolation을 하나씩 바꿉니다. 이어 A를 3으로 바꿔 부모 단위의 순서가 달라지는지 확인합니다. |

이 예제에서 A는 위치 지정 요소이므로 정수 `z-index`가 새 맥락을 만듭니다. 일반 흐름에서는 `z-index`가 위치 지정 요소와 flex·grid 아이템에 적용됩니다. `auto`인 A도 transform, opacity 또는 isolation 조건으로 맥락을 형성할 수 있습니다. [MDN Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context) · [MDN z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index)

[로컬 Interactive Playground 캡처](http://localhost:6006/iframe.html?id=003-stacking-context--interactive-playground&viewMode=story)

## 에피소드 추가

1. `src/episodes/`에 다음 회차 번호와 주제를 붙인 폴더를 만들고 `*.stories.tsx`를 추가합니다.
2. Story의 `title`은 `알고 꺼드럭대자/NNN. 주제` 형식으로, `id`는 폴더명으로 지정합니다. 사이드바에 표시할 순서대로 Story를 내보냅니다.
3. 실험 목적과 관찰 방법을 README에 적고 Canvas에는 캡처에 필요한 요소만 배치합니다. 스타일이 필요하면 같은 폴더에 SCSS를 두고 회차 전용 클래스 안에서 적용합니다. 여러 회차가 실제로 공유하는 코드가 생기면 `src/shared/`로 옮깁니다.
4. README 에피소드 표에 회차를 등록합니다.
