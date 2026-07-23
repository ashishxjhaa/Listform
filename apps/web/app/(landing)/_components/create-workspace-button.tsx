import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

const CreateWorkspaceButton = () => {
  return (
    <Button
      nativeButton={false}
      className="sm:text-md rounded-md p-2.5 sm:p-4.5"
      render={<Link href="/register">Create workspace</Link>}
    />
  )
}

export default CreateWorkspaceButton
