<template>
  <div class="root">
    <div class="w-screen h-screen overflow-hidden">
      <video id="background-video" autoplay loop muted poster="background.png">
        <source src="shgBack.mp4" type="video/mp4">
      </video>
    </div>

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
          <div class="item-content left-[100vw]" @click.self="activeProject = -1">
            <div class="projects-box">
              <div
                  class="project-info"
                  ref="projectInfo"
                  :style="{'transform' : activeProject === -1 ? 'translateY(100px)' : 'translateY(20px)'}"
              >
                <div class="grid grid-cols-2 absolute w-full z-10">
                  <img
                      src="@/static/github.svg"
                      class="github-icon"
                      @click="openTab('github')"
                      :style="{ 'transform' : (activeProject === -1 || !hasGithubLink()) ? '' : 'translateX(-53px)'}"
                  />

                  <img
                      src="@/static/telegram.svg"
                      class="telegram-icon"
                      @click="openTab('telegram')"
                      :style="{ 'transform' : (activeProject === -1 || !hasTelegramLink()) ? 'translateX(0px)' : 'translateX(54px)'}"
                  />
                </div>

                <div class="header">{{ $activeProject.title }}</div>
                <div class="project-description">{{ $activeProject.desc }}</div>
              </div>
              <div class="house">
                <div
                    @click="projectHover(project)"
                    v-for="project in projects"
                    :key="project.title"
                >
                  <project-card
                      :title="project.title"
                      :lang="project.lang"
                      :link="project.link"
                  />
                </div>
              </div>
              <div class="first-floor">
                <div class="wide-door"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="item" id="Social">
          <div class="w-full h-full flex items-center">
            <div class="social-container">
              <div
                  v-for="box in social"
                  :key="box.icon"
                  class="social-row"
              >
                <img :src="box.icon" class="icon"/>
                <span
                    @click="$copyToClipboard(box.link)"
                    :style="{ color : showCheckMark === box.link ? '#6be3a2' : 'white'}"
                >{{ box.preview }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom z-50">
      <div class="grass-container">
        <img
            v-for="grass in grassContainer"
            :key="grass.id"
            :src="'/grass/' + grass.value + '.png'"
            :style="{ marginRight : grass.margin + 'px'}"
        />
      </div>

      <img
          class="bird"
          ref="bird"
          src="@/assets/images/bird.svg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      checkpoints: ['About', 'Projects', 'Social'],
      currentPoint: 'About',
      wheelRotation: 0,
      grassContainer: [],
      activeProject: -1,
      lastActiveProject: -1,
      showProjectLinks: false,
      bubbles: [],
      checkMarkHandler: null,
      showCheckMark: false,
      bird: {
        x: 0,
        y: 0,
        directionY: -1,
        directionX: 1
      },
      social: [
        {
          icon: 'github.svg',
          preview: 'github.com/SharapaGorg',
          link: 'https://github.com/SharapaGorg'
        },
        {
          icon: 'telegram.svg',
          preview: 't.me/sharapagorg',
          link: 'https://t.me/sharapagorg'
        },
        {
          icon: 'civitai.png',
          preview: 'civitai.com/user/SharapaGorg',
          link: 'https://civitai.com/user/SharapaGorg'
        }
      ],
      projects: [
        {
          id: 0,
          title: "Ayugram",
          lang: "C++",
          desc: "Custom telegram client",
          links: {
            github: 'https://github.com/Ayugram',
            telegram: 'https://t.me/ayugram1338'
          }
        },
        {
          id: 1,
          title: 'NeoVisionBot',
          lang: "Python",
          desc: "Tg bot with OpenAI functions",
          links: {
            github: '',
            telegram: 'https://t.me/neuro_network_bot',
          }
        },
        {
          id: 2,
          title: 'web-log-manager',
          lang: "Vue, Python",
          desc: "Webpage for logging data",
          links: {
            telegram: '',
            github: "https://github.com/SharapaGorg/web-log-manager",
          }
        },
        {
          id: 3,
          title: "shg-site",
          lang: "Vue",
          desc: "My own site (you are on it)",
          links: {
            telegram: '',
            github: "https://github.com/SharapaGorg/sharapa-site",
          }
        },
        {
          id: 4,
          title: "EventsManager",
          lang: "Vue, Python",
          desc: "Webpage for managing time",
          links: {
            telegram: '',
            github: "https://github.com/SharapaGorg/EventsManager",
          }
        }
      ],
    }
  },
  computed: {
    show() {
      return show
    },
    $activeProject() {
      if (this.lastActiveProject === -1) return {}
      return this.projects[this.lastActiveProject]
    },
    $project() {
      return this.$refs.projectInfo
    }
  },
  watch: {
    bird: {
      deep: true,
      handler: function () {
        let x = `translateX(${this.bird.x}px)`
        let y = `translateY(${this.bird.y}px)`
        let transformStyle = `${x} ${y} `
        if (this.bird.directionX < 0) {
          transformStyle += 'rotateY(180deg)'
        }

        this.$refs.bird.style.transform = transformStyle

      }
    }
  },
  methods: {
    birdHandler(bird) {
      setInterval(() => {
        let rects = bird.getBoundingClientRect()
        if (this.bird.y > -400) {
          // bird taking off
          this.bird.y -= 4
          this.bird.x += 2
          return
        }

        this.bird.y += this.bird.directionY * 4
        this.bird.x += this.bird.directionX * 2

        if (this.bird.y < -600 || this.bird.y > -400) {
          this.bird.directionY = -this.bird.directionY
        }

        if (this.bird.x > document.body.clientWidth - 100 || this.bird.x < 0) {
          this.bird.directionX = -this.bird.directionX

        }

      }, 15)
    },

    $copyToClipboard(text) {
      navigator.clipboard.writeText(text);

      if (this.checkMarkHandler !== null) {
        clearTimeout(this.checkMarkHandler)
      }

      this.showCheckMark = text;
      this.checkMarkHandler = setTimeout(() => {
        this.showCheckMark = false;
      }, 1000)
    },
    $getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomInt(max) {
      let a = Math.floor(Math.random() * max);

      while (a < 50) {
        a = Math.floor(Math.random() * max);
      }
      return a;
    },
    openTab(icon) {
      try {
        window.open(this.$activeProject.links[icon])
      } catch (e) {
        return
      }
    },
    hasGithubLink() {
      try {
        return this.$activeProject.links.github.length > 0
      } catch (e) {
        return true
      }
    },
    hasTelegramLink() {
      try {
        return this.$activeProject.links.telegram.length > 0
      } catch (e) {
        return true
      }
    },
    generateBubbles() {
      // generate bubbles in the project page
      let count = Math.floor(window.innerWidth / 180)

      let numbers = []
      for (let k = 80; k < 220; k++) {
        numbers.push(k)
      }

      for (let i = 0; i <= count; i++) {
        let size = this.$getRandomItem(numbers);
        let pos = this.getRandomInt(window.innerWidth - size);

        this.bubbles.push({
          size: size,
          left: pos
        })
      }
    },
    projectHover(project) {
      this.activeProject = project.id
      this.lastActiveProject = project.id
    },
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
          alignToTop: false
        })

        switch (point) {
          case 'Projects':
            this.generateBubbles()
            break
          default:
            break;
        }
      }
    }
  },
  mounted() {
    this.selectPoint('About', true)

    setTimeout(() => {
      this.birdHandler(this.$refs.bird)
    }, 4000)

    // rotating windmill
    setInterval(() => {
      this.$refs.wheel.style.transform = `rotateZ(${this.wheelRotation}deg)`
      this.wheelRotation += 5;
    }, 50)

    // generating grass on the floor
    let floorWidth = window.innerWidth
    if (floorWidth < 500) {
      return
    }

    for (let i = 0; i < floorWidth / 250; i++) {
      let randomGrass = this.$getRandomItem([1, 2, 3, 4])
      this.grassContainer.push({
        id: i,
        value: randomGrass,
        margin: this.getRandomInt(250)
      })
    }
  },
}
</script>
