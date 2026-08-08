---
name: uilib-codegen
description: Use when building React Native screens with react-native-ui-lib. Contains component lookup via node_modules API files, layout-to-component mapping, styling conventions (modifiers, design tokens, spacing), and component intent classification. Use when creating screens, looking up component props, choosing the right component for a UI pattern, or styling with the design system.
version: 1.0.0
---

# react-native-ui-lib — React Native UI Component Library

> **When to use**: Building any React Native screen or component using react-native-ui-lib. Use when creating screens, looking up component APIs, choosing the right component for a UI pattern, styling with modifiers and design tokens, or asking how to use any `react-native-ui-lib` component.

---

## What react-native-ui-lib is

- **Package**: `react-native-ui-lib` — a comprehensive React Native UI component library with 70+ components, a design token system, spacing presets, typography modifiers, and theming support.
- **Key principle**: Always use library components instead of building custom UI from scratch. If a component exists for a UI pattern, use it.
- **Docs**: https://wix.github.io/react-native-ui-lib/
- **Figma community file**: https://www.figma.com/community/file/1379775092983284111/rnui-library

---

## How to look up any component

```bash
# Step 1 — locate the package (monorepo-aware, run once per session)
UILIB_PATH="node_modules/react-native-ui-lib"
[ ! -d "$UILIB_PATH" ] && UILIB_PATH="../../node_modules/react-native-ui-lib"

# Step 2 — batch-read ALL needed API files in ONE call (fastest approach)
cat "$UILIB_PATH/src/components/button/button.api.json" \
    "$UILIB_PATH/src/components/avatar/avatar.api.json" \
    "$UILIB_PATH/src/components/text/text.api.json" \
    "$UILIB_PATH/src/components/listItem/listItem.api.json" \
    2>/dev/null
```

**Speed rule**: Read all N API files in a **single batched `cat` call** instead of one call per component. Never look up one component at a time.

### API file path patterns

Most components follow `<dir>/<dir>.api.json`. A few use a nested `api/` or `apis/` subdirectory:

| Component | API file path |
|-----------|--------------|
| Most components | `<name>/<name>.api.json` |
| `modal` | `modal/api/modal.api.json` |
| `picker` | `picker/api/picker.api.json`, `picker/api/pickerItem.api.json` |
| `tabController` | `tabController/apis/tabController.api.json`, `tabController/apis/tabBar.api.json`, `tabController/apis/tabPage.api.json` |
| `card` | `card/card.api.json`, `card/cardSection.api.json`, `card/cardImage.api.json` |
| `dialog` | `dialog/dialog.api.json`, `dialog/dialogHeader.api.json` |
| `wizard` | `wizard/wizard.api.json`, `wizard/wizardStep.api.json` |
| `listItem` | `listItem/listItem.api.json`, `listItem/listItemPart.api.json` |

**Fallback** — when the path is unknown, find it in one command:
```bash
find "$UILIB_PATH/src/components" -name "<component>*.api.json" 2>/dev/null
```

**No `.tsx`/`.ts` in node_modules** — only `.js` and `.d.ts` are compiled into the published package.

---

## Available components

actionBar, actionSheet, animatedImage, animatedScanner, avatar, badge, baseInput, button, card, carousel, checkbox, chip, chipsInput, colorPalette, colorPicker, colorSwatch, connectionStatusBar, dash, dateTimePicker, dialog, drawer, expandableSection, fadedScrollView, fader, featureHighlight, floatingButton, gradient, gridList, gridListItem, gridView, hint, icon, image, inputs, KeyboardAwareScrollView, listItem, loaderScreen, maskedInput, modal, numberInput, overlay, pageControl, panView, picker, pieChart, progressBar, progressiveImage, radioButton, radioGroup, screenFooter, scrollBar, searchInput, sectionsWheelPicker, segmentedControl, skeletonView, slider, sortableGridList, sortableList, stackAggregator, stateScreen, stepper, svgImage, switch, tabController, text, textArea, textField, timeline, toast, touchableOpacity, view, WheelPicker, wizard

---

## Core conventions

1. **Modifiers, not StyleSheet** — Layout, spacing, colors, and typography are expressed as component props. Use `StyleSheet` only for transforms and properties without a modifier equivalent. Full reference: [styling.md](./styling.md).

2. **Design tokens, not hardcoded values** — Use semantic color tokens (`$textDefault`, `$backgroundDefault`, etc.) or palette colors (`Colors.primary`, `Colors.grey30`). Never hardcode hex values. Full reference: [styling.md](./styling.md).

3. **Import from the library** — Never import `View`, `Text`, or `Button` from `react-native`; use `react-native-ui-lib` equivalents. Use `react-native` only for primitives the library doesn't wrap (`ScrollView`, `FlatList`, `Pressable`).

4. **Read the API file before using a component** — Always batch-read `.api.json` files. Never guess props.

5. **Include testID** on all interactive elements. Pattern: `[context].[element]`.

6. **Discovery loop** — For each component: classify (Capturing / Performing / Displaying / Reporting), read the `.api.json`, extrapolate all relevant props, then triage each prop as Inject (functional necessity) or Propose (contextual enhancement). Full method: [component-intelligence.md](./component-intelligence.md).

7. **Keyboard handling** — Screens with text inputs must wrap in `KeyboardAwareScrollView` from `react-native-ui-lib`.

---

## Layout-to-component mapping

**BEFORE writing any layout code**, scan the screen for these patterns and use the mapped component. If the component's default appearance doesn't match the target design, read its API file to find customization props rather than building the layout manually.

| Layout pattern | Component | Trigger | Notes |
|---|---|---|---|
| Grid of items | `GridView` | N×M layouts, iterating items into rows | Use `numColumns` + `renderCustomItem`. Never build grids with `FlatList numColumns` + manual slicing. Wrap in `ScrollView` when content may exceed viewport. |
| Sectioned list | `SortableList` / `listItem` | Lists with sections, drag-to-reorder | Use `listItem` for rows with leading/trailing elements, subtitles, checkboxes |
| Search with results | `searchInput` | Search bar + filtered list | Has built-in clear button and keyboard handling |
| Bottom floating action | `floatingButton` | Fixed button at bottom of screen | Handles safe area automatically |
| Tabs / screen switcher | `tabController` | Multiple content pages, tab bar | Use with `TabController.TabBar` + `TabController.TabPage` |
| Overlay / bottom sheet | `modal` or `dialog` | Confirmation flows, sheets | `dialog` for simple confirm/cancel; `modal` for custom full content |
| Empty / error state | `stateScreen` | No results, error, offline | Has built-in image + title + CTA slots |
| Loading skeleton | `skeletonView` | Content loading placeholder | Renders shimmer by default |
| Swipeable row | `drawer` | Swipe-to-reveal actions on list items | Wraps any content, exposes action slots |
| Step / multi-page flow | `wizard` | Multi-step onboarding or forms | Manages step state and progress indicator |

---

## DO / DON'T

- **DO** always read `*.api.json` before using a component (batch multiple lookups in one shell call).
- **DO** use modifiers and design tokens from [styling.md](./styling.md) instead of StyleSheet.
- **DO** use `react-native-ui-lib` components instead of creating complex layouts from scratch.
- **DO** wrap screens that contain text inputs with `KeyboardAwareScrollView` from `react-native-ui-lib`.
- **DO** use `react-native` only for layout primitives the library doesn't wrap (`ScrollView`, `FlatList`, `Pressable`).
- **DON'T** import `View`, `Text`, or `Button` from `react-native` — always use the library equivalents.
- **DON'T** look for `.tsx`/`.ts` in node_modules — only `.js` and `.d.ts` exist.
- **DON'T** guess props — always read the API file.
- **DON'T** manually replicate a layout that the library already handles — check the layout-to-component mapping table first.
- **DON'T** use hardcoded hex colors, font sizes, or spacing values — use tokens and presets.

---

## Where to read more

- [styling.md](./styling.md) — Modifiers, spacing presets, color tokens, typography presets, border radius, shadows.
- [component-intelligence.md](./component-intelligence.md) — Intent classification, discovery loop, props triage (Inject vs. Propose), keyboard handling.
- [getting-started.md](./getting-started.md) — Installation, peer deps, ThemeManager setup, skill activation.
- [theming.md](./theming.md) — Custom colors, typography, spacings, per-component overrides.
- **Live demos**: Each `*.api.json` has an `"example"` URL pointing to the demo screen on GitHub.

---

## MANDATORY COMPLIANCE AUDIT (Architect's Note)

After generating code, output a short **Architect's Note** covering these three sections. If the audit reveals a violation, **fix the code before presenting**.

**1. Injected props** — For each unique component type: `[Component] ([Archetype]): [Props] — [why]`.

**2. Proposed enhancements** (max 5) — Props that improve UX/performance but aren't required. Number them so the user can say "Apply 1, 3" or "Apply all".

**3. Compliance checklist** — One line per item, skip if not applicable:
- **Discovery:** APIs verified for [components]. Flag any `⚠️ [AI_UNVERIFIED_API]`.
- **Standards:** 0 hex colors ✅ | `$` tokens preferred over palette ✅ | Modifiers over StyleSheet ✅
- **testIDs:** `[context].[element]` on all interactive elements.
- **Native imports:** [Justify each, e.g., "ScrollView as layout primitive"].
- **Keyboard:** [Wrapper used / Not applicable].

**4. UX alternatives** (skip if single clear pattern)
- **Chosen: [pattern]** — [why it's the best fit]
- Alternatives: [A] — [why not] / [B] — [why not]
