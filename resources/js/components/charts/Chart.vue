<template>
    <div class="p-10">
        <canvas :id="identifier" height="100"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js'

    let ctx = null

    export default {
        name: 'Chart',
        props: {
            identifier: { required: true, type: String }
        },
        data: () => ({

        }),
        mounted() {
            let data = [...Array(40)].map(e=>~~(Math.random()*40))

            ctx = document.getElementById(this.identifier).getContext('2d')

            let options = {
                type: 'line',
                data: {
                    labels: ["9 April","10 April","11 April","12 April","13 April","14 April","15 April","16 April","17 April","18 April","19 April"],
                    datasets: [
                        {
                            label: '# Donations',
                            data,
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                reverse: false
                            }
                        }]
                    }
                }
            }
            new Chart(ctx, options);
        }
    }
</script>
