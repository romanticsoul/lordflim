export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="text-sm">
          © {currentYear} LORDFLIM. Все права защищены.
        </div>
        <div className="text-sm">Сделано с любовью ❤️</div>
      </div>
    </footer>
  )
}
