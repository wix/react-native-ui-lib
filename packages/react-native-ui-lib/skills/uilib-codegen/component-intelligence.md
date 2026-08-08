# Component Intelligence — Intent Heuristics

## 1. Discovery Loop (MANDATORY)

For each component, run these steps (batch all API lookups into a single shell call — see SKILL.md):

1. **Classify** as **Capturing**, **Performing**, **Displaying**, or **Reporting** — validate against Detection Signals (Section 3).
2. **Lookup** the `.api.json` from `node_modules/react-native-ui-lib/src/components/<componentName>/<componentName>.api.json`. If not found, try `find . -maxdepth 6 -name "<component>.api.json"`. If still missing, add `// ⚠️ [AI_UNVERIFIED_API]` above the component and flag in the Architect's Note.
3. **Extrapolate** all relevant props from the API file.
4. **Triage** each prop:
   - **Inject** — omitting it breaks functionality or a mandatory constraint (`testID`, keyboard handling, validation). Include in code and explain in Architect's Note.
   - **Propose** — improves UX/performance but not required. List in Architect's Note (max 5).
   - **Boundary rule:** If omitting could cause data loss, broken UX, or inaccessibility → Inject. Otherwise → Propose.

---

## 2. Intent Heuristic Guide

*Use these as a starting point. Always identify all relevant props from the discovered API file.*

| Archetype | Functional Goal | Example Props to Find |
|:---|:---|:---|
| **Capturing** | Data collection | `validate`, `validationMessage`, `enableErrors`, `keyboardType`, `onChangeText`, `onChangeValidity` |
| **Performing** | Action triggers | `onPress`, `disabled`, `loading`, `throttleTime`, `activeOpacity` |
| **Displaying** | Persistent content | Design tokens, typography modifiers, `source` (images), `label` |
| **Reporting** | Transient feedback | `visible`, `onDismiss`, `useSafeArea`, `message`, `preset` |

---

## 3. Detection Signals

| Signal in code | Classification |
|---|---|
| `TextField`, `Picker`, `searchInput`, `Checkbox`, variable starts with `set...`, contains `input`, `form`, `value`, `onChange` | Capturing |
| `Button`, `floatingButton`, `listItem` with `onPress`, function starts with `handle...`, `submit`, `navigate`, `toggle` | Performing |
| `Text`, `Avatar`, `Image`, `badge`, `Divider`, rendering static labels, titles, descriptions, formatted data | Displaying |
| `Toast`, `Dialog`, `modal`, `loaderScreen`, `skeletonView`, `progressBar`, variable starts with `is...`, `show...`, `loading`, `error` | Reporting |

---

## 4. Implementation Constraints

- **testID:** Every interactive element. Pattern: `[context].[element]` (e.g., `profileScreen.saveButton`).
- **Import hierarchy:** Always prefer the library. NEVER import `View`, `Text`, or `Button` from `react-native`; use `react-native` only for primitives the library doesn't wrap (`ScrollView`, `FlatList`, `Pressable`).
- **Keyboard handling:** When a screen contains **Capturing** components (text fields, pickers, search inputs), **INJECT a keyboard-aware wrapper** — omitting it breaks usability on mobile keyboards.
  - Preferred: `KeyboardAwareScrollView` from `react-native-ui-lib`
  - Fallback: `KeyboardAvoidingView` from `react-native` if the layout can't accommodate a scroll wrapper
  - If a wrapper cannot be applied, add `// TODO: keyboard-aware wrapper needed` to flag it.
- **Design system:** Use tokens and modifiers from [styling.md](./styling.md). Never hardcode colors, spacing, or font sizes.
- **API-first:** If you haven't read the `.api.json` for a component, you are not allowed to use it. Flag missing lookups with `⚠️ [AI_UNVERIFIED_API]`.

---

## 5. UX Pattern Alternatives

**When to trigger**: Text-prompt generation only. Skip if only one valid pattern exists.

**Steps:**
1. Identify the pattern family from the screen intent.
2. Pick the best fit using available context (API files, screen type, interaction cost).
3. Report chosen pattern + alternatives in Architect's Note Section 4.

**Seed patterns:**

| Pattern family | Default choice | Alternatives |
|:---|:---|:---|
| Multi-select list | `listItem` with `checkbox` | Avatar tap, row `onPress`, trailing icon |
| Destructive action | `Dialog` confirmation | Swipe-to-delete (`drawer`), long-press, `actionSheet` |
| Search / filter | Inline `searchInput` | Header bar, `floatingButton` → modal |
| Single selection | `radioButton` in `listItem` | Row `onPress` + checkmark, `segmentedControl` |
| Form submission | Primary `Button` (bottom) | `floatingButton`, header right action |
| Loading state | `skeletonView` | `loaderScreen`, `progressBar`, spinner overlay |
| Empty state | `stateScreen` | Inline message, illustration + CTA |
