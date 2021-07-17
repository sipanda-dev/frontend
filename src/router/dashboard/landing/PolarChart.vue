<script>
import { PolarArea } from 'vue-chartjs'

export default {
  extends: PolarArea,
  props: {
    labels : Array,
    datas: Array
  },
  mounted() {
    this.renderChart(
      {
        labels: this.$props.labels,
        datasets: [
          {
            data: this.$props.datas,
            backgroundColor: ['#F1B44C', '#FA5353', '#556EE6', '#34C38F'],
            hoverBorderColor: '#fff',
          },
        ],
      },
      {
        maintainAspectRatio: true,
        legend: {
          display:false,
          position: 'top',
        },
      }
    )
  },
}
</script>