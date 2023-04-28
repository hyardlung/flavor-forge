<template>
  <div class="nutrients-chart">
    <vue-apex-charts
      type="donut"
      :options="chartOptions"
      :series="scores"
    ></vue-apex-charts>

  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { reactive, computed, onBeforeMount} from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { Nutrient } from './models';

const props = defineProps<{
  nutrients: Nutrient[],
}>();

onBeforeMount(() => {
  console.log(calories.value)
})

const calories = computed(() => {
  return _.find(props.nutrients, { name: 'Calories' })
})

const basicNutrients = computed(() => {
  return props.nutrients.filter(nutrient => ['Protein', 'Carbohydrates', 'Fat'].includes(nutrient.name))
})

const scores = computed<number[]>(() => {
  return _.map(basicNutrients.value, 'amount')
})

const labels = computed<string[]>(() => {
  return _.map(basicNutrients.value, 'name')
})

const chartOptions = reactive({
  colors: ['#B8E56D', '#75A4EA', '#E0618F'],
  labels: labels.value,
  chart: {
    id: 'vuechart',
  },
  legend: {
    position: 'left',
    fontSize: '16px',
    markers: {
      width: 16,
      height: 16,
    },
    itemMargin: {
      vertical: 10
    },
  },
  dataLabels: {
    enabled: false,
    formatter: function(value: any, { seriesIndex, w }: { seriesIndex: number, w: any }) {
      return w.config.series[seriesIndex] + 'g'
    },
    style: {
      fontSize: '14px',
      colors: ['rgba(55, 61, 63, 7)']
    },
    dropShadow: {
      enabled: false
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '80%',
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            label: 'Calories',
            formatter: function (w: any) {
              return calories.value.amount
            }
          }
        }
      }
    }
  },
});
</script>

<style lang="sass" scoped>
.nutrients-chart
  background-color: #FFFEF6
  border-radius: 10px
  filter: drop-shadow(0px 3px 5px rgba(0, 30, 47, 0.1))
</style>
