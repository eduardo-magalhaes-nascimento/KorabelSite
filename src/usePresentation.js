import { useEffect } from 'react'

// Apresentação apenas: reobserva cards que voltam após a troca de filtro.
export default function usePresentation(filter) {
  useEffect(() => {
    const header = document.querySelector('header')
    const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, {passive:true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = [...document.querySelectorAll('h1, h2, p, .product, .eyebrow, .step-number')]
    if (motion.matches || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({isIntersecting, target}) => {
        if (isIntersecting) {target.classList.add('is-visible'); observer.unobserve(target)}
      })
    }, {threshold:0.08})
    elements.forEach(el => {
      el.classList.add('reveal')
      const siblings = [...el.parentElement.children].filter(child => child.matches('h1,h2,p,.product,.eyebrow,.step-number'))
      el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 4)*0.1}s`)
      if (el.matches('.step-number')) el.style.setProperty('--reveal-delay', `${[...el.parentElement.parentElement.children].indexOf(el.parentElement)*0.1}s`)
      observer.observe(el)
    })
    const showAll = () => { if(motion.matches) {elements.forEach(el => el.classList.add('is-visible')); observer.disconnect()} }
    motion.addEventListener('change', showAll)
    return () => {observer.disconnect();motion.removeEventListener('change',showAll)}
  }, [filter])
}
