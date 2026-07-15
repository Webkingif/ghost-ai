import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-center gap-6 bg-base p-12 lg:flex">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-copy-primary">
            Ghost AI
          </h1>
          <p className="text-sm text-copy-muted">
            Collaborative system design workspace
          </p>
        </div>
        <ul className="space-y-2 text-sm text-copy-secondary">
          <li>Create and manage architecture projects</li>
          <li>Collaborate on shared canvases in real time</li>
          <li>Generate technical specs from your diagrams</li>
        </ul>
      </div>
      <div className="flex items-center justify-center bg-base px-4">
        <SignIn
          appearance={{
            variables: {
              colorBackground: "var(--bg-base)",
              colorPrimary: "var(--accent-primary)",
              colorForeground: "var(--text-primary)",
              colorPrimaryForeground: "var(--primary-foreground)",
              colorMuted: "var(--bg-subtle)",
              colorMutedForeground: "var(--text-secondary)",
              colorInput: "var(--bg-surface)",
              colorInputForeground: "var(--text-primary)",
              colorNeutral: "var(--text-muted)",
              colorBorder: "var(--border-default)",
              colorDanger: "var(--state-error)",
              colorSuccess: "var(--state-success)",
              borderRadius: "var(--radius)",
            },
          }}
        />
      </div>
    </div>
  )
}
