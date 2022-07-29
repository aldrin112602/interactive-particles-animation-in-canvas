document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas')
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  const particlesArray = []
  let hue = 0
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  const mouse = {x: undefined, y: undefined }
  ctx.fillStyle = '000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  class Particle {
    constructor() {
      this.x = mouse.x
      this.y = mouse.y
      this.speedX = Math.random() * 3 - 1.5
      this.speedY = Math.random() * 3 - 1.5
      this.size = Math.random() * 10
      this.color = `hsl(${hue}, 100%, 50%)`
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      if(this.size > 0.2) this.size -= 0.1 
    }
    draw() {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    }
  }
  canvas.addEventListener('click', e => {
    mouse.x = e.x
    mouse.y = e.x
    addParticles()
  })
  canvas.addEventListener('mousemove', e => {
    mouse.x = e.x
    mouse.y = e.y
    addParticles()
  })
  canvas.addEventListener('touchmove', e => {
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
    addParticles()
  })  
  function addParticles() {
    for (let i = 0; i < 2; i++) {
      particlesArray.push(new Particle())
    }
  }
 function handleParticles() {
   for(let i = 0; i < particlesArray.length; i++) {
     particlesArray[i].draw()
     particlesArray[i].update()
     for(let j = i; j < particlesArray.length; j++) {
       let dx = particlesArray[i].x - particlesArray[j].x
       let dy = particlesArray[i].y - particlesArray[j].y
       let distance = Math.sqrt(dx * dx + dy * dy)
       if(distance <= 100) {
         ctx.beginPath()
         ctx.strokeStyle = particlesArray[i].color
         ctx.lineWidth = particlesArray[i].size / 10
         ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
         ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
         ctx.stroke()
         ctx.closePath()
       }
     }
     
     if(particlesArray[i].size <= 0.3) {
       particlesArray.splice(i, 1)
       i--
     }
   }
 }
  function animate() {
   ctx.fillStyle = 'rgba(0,0,0,0.9)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    hue += 1
    if(hue > 360) hue = 0
    window.requestAnimationFrame(animate)
  }
  animate()
})
