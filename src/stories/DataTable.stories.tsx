// DataTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable"; 

type Person = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const sampleData: Person[] = [
  { id: 1, name: "Alice", age: 24, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
  { id: 4, name: "Diana", age: 35, email: "diana@example.com" },
];

const sampleColumns: Column<Person>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: true },
  { key: "email", header: "Email" },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: "Components/DataTable",
  component: DataTable<Person>,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### DataTable Component
A generic, flexible table component with:
- Column-based sorting
- Row reordering (manual up/down arrows)
- Row selection (checkboxes)
- Loading and empty states
- Type-safe column definitions

Built with TailwindCSS and React, this table is responsive and supports accessibility out of the box.
        `,
      },
    },
  },
  argTypes: {
    data: { control: false, description: "Array of row objects" },
    columns: { control: false, description: "Column definitions" },
    loading: { control: "boolean", description: "Loading state" },
    selectable: { control: "boolean", description: "Enable row selection" },
    sortable: { control: "boolean", description: "Enable column sorting" },
    rowSortable: { control: "boolean", description: "Enable manual row reordering" },
    sortKey: { control: "text", description: "Initial sort column key" },
    onRowSelect: { action: "rows selected", description: "Callback for row selection" },
  },
};
export default meta;
type Story = StoryObj<typeof DataTable<Person>>;

// --- Stories ---

export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
  },
  parameters: {
    docs: {
      description: {
        story: "Basic usage with plain data and no advanced features enabled.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: sampleColumns,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the loading state when fetching data.",
      },
    },
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: sampleColumns,
  },
  parameters: {
    docs: {
      description: {
        story: "Displays empty state message when no data is available.",
      },
    },
  },
};

export const SelectableRows: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Users can select multiple rows using checkboxes.",
      },
    },
  },
};

export const SortableColumns: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Clicking a column header sorts the data by that column.",
      },
    },
  },
};

export const RowReordering: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    rowSortable: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Users can reorder rows manually using up/down arrows.",
      },
    },
  },
};

export const FullyFeatured: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    selectable: true,
    sortable: true,
    rowSortable: true,
    sortKey: "age",
  },
  parameters: {
    docs: {
      description: {
        story: "Combines row selection, column sorting, and row reordering in one table.",
      },
    },
  },
};
