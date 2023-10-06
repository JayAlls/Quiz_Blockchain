import './styles/globals.scss'

export const metadata = {
  title: 'ChainQuiz',
  description: 'The Blockchain Quiz For Blockchainers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
