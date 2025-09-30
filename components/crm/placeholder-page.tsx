import { CRMShell } from "./shell"

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <CRMShell>
      <div className="max-w-3xl">
        <h1 className="text-xl font-semibold mb-2">{title}</h1>
        <p className="text-sm text-gray-600">
          This module UI is scaffolded. Build detail views, tables, and automation flows here.
        </p>
        <ul className="list-disc pl-5 mt-4 text-sm text-gray-600">
          <li>Use cards with subtle shadows</li>
          <li>Include filters and tabs for details</li>
          <li>Follow the blue primary, teal accent palette</li>
        </ul>
      </div>
    </CRMShell>
  )
}
