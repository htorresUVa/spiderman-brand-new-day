import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

// Binding viva: los módulos que hagan `import { lenis }` ven la reasignación
// de `initLenis()` en el momento en que la lean, sin necesidad de un getter.
export let lenis: Lenis | null = null

/** Arranca el scroll suave (una sola vez) y lo sincroniza con ScrollTrigger. */
export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis

  lenis = new Lenis({ autoRaf: false })

  // Cada frame de Lenis debe recalcular los ScrollTrigger antes de que GSAP
  // pinte: si no, el pin de Galería/Vídeos va un frame por detrás del scroll.
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  // Lenis ya aporta su propio suavizado; el lag smoothing de GSAP solo
  // introduciría un segundo suavizado encima, con saltos en frames largos.
  gsap.ticker.lagSmoothing(0)

  return lenis
}
