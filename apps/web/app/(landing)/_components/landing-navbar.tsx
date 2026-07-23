import Logo from "@/components/logo"
import Navigation from "./navigation"
import CreateWorkspaceButton from "./create-workspace-button"
import Link from "next/link"

const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 overflow-hidden">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between border-b bg-white/70 px-2.5 backdrop-blur-md sm:px-6">
        <Link href="/" aria-label="Listform">
          <Logo className="h-9 w-auto sm:h-10" />
        </Link>

        <Navigation />

        <CreateWorkspaceButton />
      </div>
    </header>
  )
}

export default LandingNavbar
