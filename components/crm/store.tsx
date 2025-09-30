"use client"

import * as React from "react"

export type Lead = {
  id: string
  name: string
  source: "Web" | "Email" | "Event" | "Referral" | "Other"
  status: "New" | "Contacted" | "Qualified" | "Nurturing"
  score: number
  owner: string
  createdAt: string
}

export type Account = {
  id: string
  name: string
  industry: "Fintech" | "E-commerce" | "Healthcare" | "Technology" | "Other"
  arr: number // store numeric; format per currency
  stage: "Prospect" | "Customer"
  owner: string
  createdAt: string
}

export type Contact = {
  id: string
  name: string
  title: string
  account: string
  email: string
  lastActivity: string
  createdAt: string
}

export type Task = {
  id: string
  title: string
  due: string
  owner: "You" | "Team" | string
  type: "Call" | "Email" | "Task" | "Meeting"
  done: boolean
  createdAt: string
}

export type OpportunityStage = "Demo" | "Proposal" | "Negotiation" | "Closed"
export type Opportunity = {
  id: string
  client: string
  value: number
  closeDate: string // YYYY-MM-DD
  probability: number // 0..1
  stage: OpportunityStage
  createdAt: string
}

export type Case = {
  id: string
  subject: string
  priority: "High" | "Medium" | "Low"
  status: "New" | "Open" | "Pending" | "Closed"
  account: string
  owner: string
  createdAt: string
}

export type Partner = {
  id: string
  name: string
  category: "Reseller" | "SI" | "Tech Alliance" | "Referral"
  tier: "Platinum" | "Gold" | "Silver" | "Bronze"
  accounts: number
  owner: string
  createdAt: string
}

type CRMState = {
  leads: Lead[]
  accounts: Account[]
  contacts: Contact[]
  tasks: Task[]
  opportunities: Opportunity[]
  cases: Case[]
  partners: Partner[]
}

type CRMContextType = {
  state: CRMState
  // Leads
  addLead: (l: Omit<Lead, "id" | "createdAt">) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void
  // Accounts
  addAccount: (a: Omit<Account, "id" | "createdAt">) => void
  updateAccount: (id: string, updates: Partial<Account>) => void
  deleteAccount: (id: string) => void
  // Contacts
  addContact: (c: Omit<Contact, "id" | "createdAt">) => void
  updateContact: (id: string, updates: Partial<Contact>) => void
  deleteContact: (id: string) => void
  // Tasks
  addTask: (t: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  // Opportunities
  addOpportunity: (o: Omit<Opportunity, "id" | "createdAt">) => void
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void
  deleteOpportunity: (id: string) => void
  // Cases
  addCase: (c: Omit<Case, "id" | "createdAt">) => void
  updateCase: (id: string, updates: Partial<Case>) => void
  deleteCase: (id: string) => void
  // Partners
  addPartner: (p: Omit<Partner, "id" | "createdAt">) => void
  updatePartner: (id: string, updates: Partial<Partner>) => void
  deletePartner: (id: string) => void
}

const CRMContext = React.createContext<CRMContextType | null>(null)

const STORAGE_KEY = "crm-store-v1"

function seed(): CRMState {
  return {
    leads: [
      {
        id: crypto.randomUUID(),
        name: "Acme Corp - Fiona Hill",
        source: "Web",
        status: "New",
        score: 82,
        owner: "S. Patel",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Globex - Martin Chu",
        source: "Event",
        status: "Qualified",
        score: 90,
        owner: "A. Diaz",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Umbrella - Priya Nair",
        source: "Referral",
        status: "Contacted",
        score: 70,
        owner: "J. Kim",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Wayne Tech - Tom Lee",
        source: "Email",
        status: "Nurturing",
        score: 64,
        owner: "S. Patel",
        createdAt: new Date().toISOString(),
      },
    ],
    accounts: [
      {
        id: crypto.randomUUID(),
        name: "Acme Corp",
        industry: "Fintech",
        arr: 320000,
        stage: "Customer",
        owner: "S. Patel",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Globex",
        industry: "E-commerce",
        arr: 180000,
        stage: "Prospect",
        owner: "A. Diaz",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Umbrella Group",
        industry: "Healthcare",
        arr: 240000,
        stage: "Customer",
        owner: "J. Kim",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Wayne Tech",
        industry: "Technology",
        arr: 400000,
        stage: "Prospect",
        owner: "T. Lee",
        createdAt: new Date().toISOString(),
      },
    ],
    contacts: [
      {
        id: crypto.randomUUID(),
        name: "Fiona Hill",
        title: "CTO",
        account: "Acme Corp",
        email: "fiona@acme.com",
        lastActivity: "2d ago",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Martin Chu",
        title: "VP Ops",
        account: "Globex",
        email: "mchu@globex.com",
        lastActivity: "5h ago",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Priya Nair",
        title: "CIO",
        account: "Umbrella Group",
        email: "p.nair@umbrella.com",
        lastActivity: "1w ago",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Tom Lee",
        title: "Head of IT",
        account: "Wayne Tech",
        email: "tlee@wayne.com",
        lastActivity: "Today",
        createdAt: new Date().toISOString(),
      },
    ],
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Follow up with Acme",
        due: "Today",
        owner: "You",
        type: "Call",
        done: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Send proposal to Globex",
        due: "Tomorrow",
        owner: "You",
        type: "Email",
        done: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Nurture Umbrella lead",
        due: "Oct 12",
        owner: "Team",
        type: "Task",
        done: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Prep demo for Wayne",
        due: "Oct 15",
        owner: "You",
        type: "Meeting",
        done: false,
        createdAt: new Date().toISOString(),
      },
    ],
    opportunities: [
      {
        id: crypto.randomUUID(),
        client: "Acme Corp",
        value: 25000,
        closeDate: "2025-10-15",
        probability: 0.3,
        stage: "Demo",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        client: "Globex",
        value: 42000,
        closeDate: "2025-10-22",
        probability: 0.25,
        stage: "Demo",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        client: "Umbrella",
        value: 60000,
        closeDate: "2025-11-01",
        probability: 0.45,
        stage: "Proposal",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        client: "Wayne Tech",
        value: 120000,
        closeDate: "2025-11-10",
        probability: 0.6,
        stage: "Negotiation",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        client: "Stark Industries",
        value: 180000,
        closeDate: "2025-09-18",
        probability: 1,
        stage: "Closed",
        createdAt: new Date().toISOString(),
      },
    ],
    cases: [
      {
        id: crypto.randomUUID(),
        subject: "Payment declined",
        priority: "High",
        status: "Open",
        account: "Acme Corp",
        owner: "F. Hill",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        subject: "Refund request",
        priority: "Medium",
        status: "Pending",
        account: "Globex",
        owner: "M. Chu",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        subject: "Chargeback dispute",
        priority: "High",
        status: "New",
        account: "Umbrella Group",
        owner: "P. Nair",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        subject: "API timeout",
        priority: "Low",
        status: "Closed",
        account: "Wayne Tech",
        owner: "T. Lee",
        createdAt: new Date().toISOString(),
      },
    ],
    partners: [
      {
        id: crypto.randomUUID(),
        name: "NovaPay",
        category: "Reseller",
        tier: "Gold",
        accounts: 24,
        owner: "A. Diaz",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Atlas IT",
        category: "SI",
        tier: "Silver",
        accounts: 12,
        owner: "J. Kim",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "BlueEdge",
        category: "Tech Alliance",
        tier: "Platinum",
        accounts: 8,
        owner: "S. Patel",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        name: "Quanta",
        category: "Referral",
        tier: "Bronze",
        accounts: 15,
        owner: "T. Lee",
        createdAt: new Date().toISOString(),
      },
    ],
  }
}

function normalizeState(raw: any): CRMState {
  const base = seed()
  return {
    leads: Array.isArray(raw?.leads) ? raw.leads : base.leads,
    accounts: Array.isArray(raw?.accounts) ? raw.accounts : base.accounts,
    contacts: Array.isArray(raw?.contacts) ? raw.contacts : base.contacts,
    tasks: Array.isArray(raw?.tasks) ? raw.tasks : base.tasks,
    opportunities: Array.isArray(raw?.opportunities) ? raw.opportunities : base.opportunities,
    cases: Array.isArray(raw?.cases) ? raw.cases : base.cases,
    partners: Array.isArray(raw?.partners) ? raw.partners : base.partners,
  }
}

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CRMState>(() => {
    if (typeof window === "undefined") return seed()
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return seed()
      const parsed = JSON.parse(raw)
      const normalized = normalizeState(parsed)
      console.log("[v0] CRM store normalized", {
        leads: normalized.leads.length,
        accounts: normalized.accounts.length,
        contacts: normalized.contacts.length,
        tasks: normalized.tasks.length,
        opportunities: normalized.opportunities.length,
        cases: normalized.cases.length,
        partners: normalized.partners.length,
      })
      return normalized
    } catch (e) {
      console.log("[v0] Failed to parse CRM store, seeding fresh:", e)
      return seed()
    }
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  // Leads
  const addLead: CRMContextType["addLead"] = (l) =>
    setState((s) => ({
      ...s,
      leads: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...l }, ...s.leads],
    }))

  const updateLead: CRMContextType["updateLead"] = (id, updates) =>
    setState((s) => ({ ...s, leads: s.leads.map((x) => (x.id === id ? { ...x, ...updates } : x)) }))

  const deleteLead: CRMContextType["deleteLead"] = (id) =>
    setState((s) => ({ ...s, leads: s.leads.filter((x) => x.id !== id) }))

  // Accounts
  const addAccount: CRMContextType["addAccount"] = (a) =>
    setState((s) => ({
      ...s,
      accounts: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...a }, ...s.accounts],
    }))

  const updateAccount: CRMContextType["updateAccount"] = (id, updates) =>
    setState((s) => ({ ...s, accounts: s.accounts.map((x) => (x.id === id ? { ...x, ...updates } : x)) }))

  const deleteAccount: CRMContextType["deleteAccount"] = (id) =>
    setState((s) => ({ ...s, accounts: s.accounts.filter((x) => x.id !== id) }))

  // Contacts
  const addContact: CRMContextType["addContact"] = (c) =>
    setState((s) => ({
      ...s,
      contacts: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...c }, ...s.contacts],
    }))

  const updateContact: CRMContextType["updateContact"] = (id, updates) =>
    setState((s) => ({ ...s, contacts: s.contacts.map((x) => (x.id === id ? { ...x, ...updates } : x)) }))

  const deleteContact: CRMContextType["deleteContact"] = (id) =>
    setState((s) => ({ ...s, contacts: s.contacts.filter((x) => x.id !== id) }))

  // Tasks
  const addTask: CRMContextType["addTask"] = (t) =>
    setState((s) => ({
      ...s,
      tasks: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...t }, ...s.tasks],
    }))

  const updateTask: CRMContextType["updateTask"] = (id, updates) =>
    setState((s) => ({ ...s, tasks: s.tasks.map((x) => (x.id === id ? { ...x, ...updates } : x)) }))

  const deleteTask: CRMContextType["deleteTask"] = (id) =>
    setState((s) => ({ ...s, tasks: s.tasks.filter((x) => x.id !== id) }))

  // Opportunities
  const addOpportunity: CRMContextType["addOpportunity"] = (o) =>
    setState((s) => ({
      ...s,
      opportunities: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...o }, ...s.opportunities],
    }))

  const updateOpportunity: CRMContextType["updateOpportunity"] = (id, updates) =>
    setState((s) => ({
      ...s,
      opportunities: s.opportunities.map((x) => (x.id === id ? { ...x, ...updates } : x)),
    }))

  const deleteOpportunity: CRMContextType["deleteOpportunity"] = (id) =>
    setState((s) => ({ ...s, opportunities: s.opportunities.filter((x) => x.id !== id) }))

  // Cases
  const addCase: CRMContextType["addCase"] = (c) =>
    setState((s) => ({
      ...s,
      cases: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...c }, ...s.cases],
    }))

  const updateCase: CRMContextType["updateCase"] = (id, updates) =>
    setState((s) => ({ ...s, cases: s.cases.map((x) => (x.id === id ? { ...x, ...updates } : x)) }))

  const deleteCase: CRMContextType["deleteCase"] = (id) =>
    setState((s) => ({ ...s, cases: s.cases.filter((x) => x.id !== id) }))

  // Partners
  const addPartner: CRMContextType["addPartner"] = (p) =>
    setState((s) => ({
      ...s,
      partners: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...p }, ...s.partners],
    }))

  const updatePartner: CRMContextType["updatePartner"] = (id, updates) =>
    setState((s) => ({ ...s, partners: s.partners.map((x) => (x.id === id ? { ...x, ...updates } : x)) }))

  const deletePartner: CRMContextType["deletePartner"] = (id) =>
    setState((s) => ({ ...s, partners: s.partners.filter((x) => x.id !== id) }))

  const value: CRMContextType = {
    state,
    addLead,
    updateLead,
    deleteLead,
    addAccount,
    updateAccount,
    deleteAccount,
    addContact,
    updateContact,
    deleteContact,
    addTask,
    updateTask,
    deleteTask,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    addCase,
    updateCase,
    deleteCase,
    addPartner,
    updatePartner,
    deletePartner,
  }

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>
}

export function useCRM() {
  const ctx = React.useContext(CRMContext)
  if (!ctx) throw new Error("useCRM must be used within CRMProvider")
  return ctx
}
