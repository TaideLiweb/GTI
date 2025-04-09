// 跳出 Line 內部瀏覽器
;(function () {
  const url = new URL(window.location.href)
  const params = url.searchParams

  if (!params.has("openExternalBrowser")) {
    // 加上參數
    params.set("openExternalBrowser", "1")

    window.location.replace(`${url.origin}${url.pathname}?${params.toString()}`)
  }
})()

window.addEventListener("load", () => {
  const hamburger = document.querySelector(".hamburger")
  const mobileMenu = document.querySelector(".mobile-menu")
  const navLinks = document.querySelectorAll("nav a")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")
  const locationMarkGroups = document.querySelectorAll(".location-mark-group")
  const closeBtn = document.querySelector(".close-btn")
  const goToTop = document.getElementById("go-to-top")

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("active")
  })

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })

  navLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(`#anchor-point-${index + 1}`)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start", // 'start' | 'center' | 'end' | 'nearest'
        })
      }
    })
  })

  mobileMenuLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      const target = document.querySelector(`#anchor-point-${index + 1}`)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start", // 'start' | 'center' | 'end' | 'nearest'
        })
      }
    })
  })

  // 顯示按鈕：當滾動超過 300px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      goToTop.classList.remove("opacity-0", "pointer-events-none")
    } else {
      goToTop.classList.add("opacity-0", "pointer-events-none")
    }
  })

  // 點擊按鈕：平滑捲回頂部
  goToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // GSAP scroll-behavior: smooth 有 bug
  gsap.registerPlugin(ScrollTrigger)

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh()
  })

  // 火箭移動動畫
  gsap.to(".rocket", {
    scrollTrigger: {
      trigger: ".rocket",
      start: "top-=200 80%",
      end: "top-=200 20%",
      scrub: 2,
      // markers: true,
    },
    x: "120%",
    y: "-100%",
    ease: "none",
    duration: 3,
  })

  // section-5 背景動畫放大
  gsap.to(".section-5-bg", {
    scrollTrigger: {
      trigger: ".section-5-bg",
      start: "center 80%",
      end: "center 20%",
      scrub: 2,
      // markers: true,
    },
    scale: 1.3,
    ease: "none",
    duration: 3,
  })

  // 地圖 mark 動畫
  locationMarkGroups.forEach((group, index) => {
    gsap.to(group, {
      scrollTrigger: {
        trigger: group,
        start: "top 50%",
        toggleActions: "play none none reverse",
        // scrub: 1,
        // markers: true,
      },
      y: "-50%",
      opacity: 1,
      ease: "ease-in-out",
      duration: 1,
    })
  })
})
