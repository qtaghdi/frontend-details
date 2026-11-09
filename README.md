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

| 회차 | 주제      | Velog     |
| ---- | --------- | --------- |
| 001  | 포커스 링 | 게시 예정 |

게시 후 Velog 열의 ‘게시 예정’을 해당 글의 링크로 교체합니다.

### 001. 포커스 링

- **Browser Default** — 공통 버튼 디자인 위에 브라우저 기본 포커스 표시를 유지합니다. Tab과 Shift + Tab으로 관찰합니다.
- **Outline Removed** — 같은 버튼에서 outline을 지웁니다. 키보드로 포커스가 이동해도 위치를 눈으로 확인할 수 없는 의도된 실패입니다. 자동 검사 결과와 함께 직접 키보드로 확인하세요. [W3C 실패 기법 F78](https://www.w3.org/WAI/WCAG22/Techniques/failures/F78)
- **Custom Focus Ring** — 밝은 배경과 어두운 배경에서 `outline`과 `outline-offset`을 적용한 링을 관찰합니다. 키보드로 이동하며 표시가 분명하고 버튼 크기가 유지되는지 확인하세요. WCAG 적합성은 별도 평가가 필요합니다. [W3C Focus Visible 이해하기](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- **Focus vs Focus Visible** — 같은 버튼의 진한 테두리는 `:focus`를, 보라색 링은 `:focus-visible`을 나타냅니다. 후자는 포커스된 요소를 시각적으로 표시할지 브라우저가 입력 방식과 요소 종류 등을 고려해 판단할 때 일치합니다. 클릭과 Tab으로 비교하면 두 표시가 동시에 나타나는 경우도 볼 수 있습니다. [MDN :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible)

## 에피소드 추가

1. `src/episodes/`에 다음 회차 번호와 주제를 붙인 폴더를 만들고 `*.stories.tsx`를 추가합니다.
2. Story의 `title`은 `알고 꺼드럭대자/NNN. 주제` 형식으로, `id`는 폴더명으로 지정합니다. 사이드바에 표시할 순서대로 Story를 내보냅니다.
3. 실험 목적과 관찰 방법을 README에 적고 Canvas에는 캡처에 필요한 요소만 배치합니다. 스타일이 필요하면 같은 폴더에 SCSS를 두고 회차 전용 클래스 안에서 적용합니다. 여러 회차가 실제로 공유하는 코드가 생기면 `src/shared/`로 옮깁니다.
4. README 에피소드 표에 회차를 등록합니다.
