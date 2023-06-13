<template>
  <div class="root">
    <video id="background-video" autoplay loop muted poster="background.png">
      <source src="shgBack.mp4" type="video/mp4">
    </video>

    <div class="w-screen h-screen absolute left-0 top-0">
      <div class="main-header">SHG</div>
    </div>

    <div class="content-container">
      <div class="navigator" ref="navigator">
        <div
          v-for="point in checkpoints"
          class="flex"
          :key="point"
        >
          <div class="navigator-point z-50" @click="selectPoint(point)">{{ point }}</div>

          <div class="divider" v-show="checkpoints.indexOf(point) !== checkpoints.length - 1"></div>
        </div>
      </div>


      <div class="content-slider">
        <div class="item" id="About">
          <div class="wheel-container">
            <img src="@/static/wheel.png" class="wheel" ref="wheel"/>
          </div>

          <div class="item-content">
            <div class="about-box">
              <img src="@/static/city/mainRoof.svg" class="roof"/>
              <div class="about-header">Web developer, AI fan, IT artist</div>
              <div class="about-content">
                Hello there! I'm a freelance programmer from Russia.
                My specialty is web development.
                I don't see my work without a certain role of creativity, because in my opinion, programming is an art.
              </div>
            </div>
          </div>
        </div>

        <div class="item" id="Projects">
          <div class="item-content left-[100vw]">
            <div class="projects-box">
                <div class="house">
                  <project-card
                    v-for="project in projects"
                    :key="project.title"
                    :title = "project.title"
                    :lang="project.lang"
                    :link = "project.link"
                  />
                </div>
                <div class="first-floor">
                  <div class="wide-door"></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom z-50"></div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      checkpoints: ['About', 'Projects', 'Social', 'Team'],
      currentPoint: 'About',
      wheelRotation : 0,
      projects: [
        {
          title : "Ayugram",
          lang : "C++",
          link : ''
        },
        {
          title : 'NeoVisionBot',
          lang : "Python",
          link : ''
        },
        {
          title : 'web-log-manager',
          lang : "Vue, Python",
          link : ""
        },
        {
          title : "shg-site",
          lang : "Vue",
          link : ""
        },
        {
          title : "EventsManager",
          lang : "Vue, Python",
          link : ""
        }
      ]
    }
  },
  methods: {
    selectPoint(point, isMounted) {
      let points = this.$refs.navigator.getElementsByClassName('navigator-point')
      this.currentPoint = point;

      for (let p of points) {
        if (p.innerText === point) {
          p.classList.add('text-aqua')
        } else {
          p.classList.remove('text-aqua')
        }
      }

      if (!isMounted) {
        document.getElementById(point).scrollIntoView({
          behavior: 'smooth',
          inline: "start",
          alignToTop : false
        })
      }
    }
  },
  mounted() {
    // TODO paint city and type some text in house bodies
    this.selectPoint('About', true)

    setInterval(() => {
        this.$refs.wheel.style.transform = `rotateZ(${this.wheelRotation}deg)`
        this.wheelRotation += 5;
    }, 50)
  },
}
</script>
