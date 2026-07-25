import Logo from "@/components/logo"
import Navigation from "./navigation"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"

const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 overflow-hidden">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between border-b px-2.5 backdrop-blur-lg sm:px-6">
        <Link href="/" aria-label="Listform">
          <Logo className="h-9 w-auto sm:h-10" />
        </Link>

        <Navigation />

        <Button
          nativeButton={false}
          className="sm:text-md rounded-md p-2.5 sm:p-4.5"
          render={<Link href="/register">Create workspace</Link>}
        />
      </div>
    </header>
  )
}

export default LandingNavbar
