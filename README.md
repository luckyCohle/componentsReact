Perfect 👍 here’s a single README.md code block that you can copy–paste directly:

# UI Components Library

This repository contains reusable React components built with **TypeScript**, **TailwindCSS**, and **Storybook** for documentation and interactive testing.

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/luckyCohle/componentsReact.git
cd componentsReact
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Run Storybook
```bash
npm run storybook
# or
yarn storybook
```

Storybook will start at http://localhost:6006.

### 🧩 Components
🔤 InputField

Variants: outlined, filled, ghost

Sizes: sm, md, lg

Optional password toggle (show/hide password)

Handles:

Labels

Helper text

Error messages

Disabled state

Fully controlled with value and onChange.

📊 DataTable

Displays tabular data with typed Column<T> definitions.

Features:

Column sorting (click header to sort)

Row sorting (shift rows up/down with arrow buttons)

Row selection (single or multiple)

Loading state

Empty state

### 🛠️ Approach
InputField

Implemented as a controlled component for predictable state handling.

TailwindCSS utility classes manage styling across variants and sizes.

Password visibility toggle uses FaEye and FaRegEyeSlash from react-icons.

DataTable

Generic implementation with Column<T> for flexibility.

Sorting:

Column sorting via header click

Row sorting via up/down arrows for accessibility

Supports single and multiple row selection with callbacks.

Provides UX-friendly states for loading and empty scenarios.

###📖 Storybook

Each component includes stories for:

Default usage

Variants & sizes

Error and helper states

Disabled examples

Password toggle input

DataTable with sorting, row selection, loading, and empty state
