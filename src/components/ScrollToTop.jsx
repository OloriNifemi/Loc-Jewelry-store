import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const start = window.scrollY
    const duration = 500 // milliseconds, increase to scroll slower
    let startTime

    function animate(time) {
      if (!startTime) startTime = time
      const timeElapsed = time - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      window.scrollTo(0, start * (1 - progress))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [pathname])

  return null
}