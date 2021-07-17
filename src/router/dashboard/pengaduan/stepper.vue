<script>
export default {
  props: {
    follup: Array,
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h1 class="text-center font-weight-bold mb-0">Follow Ups</h1>
      <div class="timeline">
        <div class="events">
          <ol>
            <ul>
              <li v-for="(data, idx) in follup" :key="idx">
                <a class="selected">{{data.user.TYPE == 'P' ? 'Provinsi' : data.user.TYPE == 'B' ? 'Kabupaten' : data.user.TYPE == 'C' ? 'Kecamatan' : 'Desa'}} {{ data.user.NAME }}</a>
              </li>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.timeline {
  width: 100%;
  height: 100px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.timeline .events {
  position: relative;
  background-color: #2A9086;
  height: 3px;
  width: 100%;
  border-radius: 4px;
  margin: 5em 0;
}

.timeline .events ol {
  margin: 0;
  padding: 0;
  text-align: center;
}

.timeline .events ul {
  list-style: none;
}

.timeline .events ul li {
  display: inline-block;
  width: 24.65%;
  margin: 0;
  padding: 0;
}

.timeline .events ul li a {
  font-family: "Arapey", sans-serif;
  font-style: italic;
  font-size: 1.25em;
  color: #606060;
  text-decoration: none;
  position: relative;
  top: -32px;
}

.timeline .events ul li a:after {
  content: "";
  position: absolute;
  bottom: -25px;
  left: 50%;
  right: auto;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 3px solid #606060;
  background-color: #fff;
  transition: 0.3s ease;
  transform: translateX(-50%);
}

.timeline .events ul li a:hover::after {
  background-color: #1B9ED6;
  border-color: #1B9ED6;
}

.timeline .events ul li a.selected:after {
  background-color: #1B9ED6;
  border-color: #1B9ED6;
}

.events-content {
  width: 100%;
  height: 100px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: left;
}

.events-content li {
  display: none;
  list-style: none;
}

.events-content li.selected {
  display: initial;
}

.events-content li h2 {
  font-family: "Frank Ruhl Libre", serif;
  font-weight: 500;
  color: #919191;
  font-size: 2.5em;
}
</style>
