<template>
  <div class="nutrients-chart"
       style="height: 240px;">
    <vue-apex-charts type="donut"
                     :options="chartOptions"
                     :series="scores"></vue-apex-charts>

  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { reactive, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { Nutrient } from '../data/models';

const props = defineProps<{
  nutrients: Nutrient[],
}>();

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
    position: 'top',
    fontSize: '16px',
    markers: {
      width: 16,
      height: 16,
    },
    itemMargin: {
      vertical: 5
    },
  },
  dataLabels: {
    enabled: false,
    formatter: function (value: any, { seriesIndex, w }: { seriesIndex: number, w: any }) {
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
        size: '70%',
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
  responsive: [
    {
      breakpoint: 1023,
      options: {
        legend: {
          position: 'left'
        }
      }
    }
  ]
});
</script>

<style lang="sass" scoped>
</style>
