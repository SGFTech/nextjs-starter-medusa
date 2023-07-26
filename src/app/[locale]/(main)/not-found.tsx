import Logo from "@modules/library-components/logo"
import { Metadata } from "next"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  const t = useTranslations("common")
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-gry-900">Page not found</h1>
      <p className="text-small-regular text-gray-700">
        t(""text-not-found"")
      </p>
      <Link href="/" className="mt-4 underline text-base-regular text-gray-900">
        <Logo/>
      </Link>
    </div>
  )
}
