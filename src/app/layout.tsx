export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} MenuApp</p>
        </footer>
      </body>
    </html>
  )
}
