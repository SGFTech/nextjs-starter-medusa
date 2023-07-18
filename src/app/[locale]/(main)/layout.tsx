import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"

export default async function PageLayout({children, params: {locale}}: {
  children: React.ReactNode
  params:{locale:string}
}) {

  let messages;
  try {
    messages = (await import(`../../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
 
  return (
    <>
    <NextIntlClientProvider  locale={locale} messages={messages}>
      <Nav />
      {children}
      <Footer />
      </NextIntlClientProvider>
    </>
  )
}
