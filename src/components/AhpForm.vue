<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="col-6">
                    <horizontal-stepper
                            :steps="demoSteps"
                            @completed-step="completeStep"
                            @active-step="isStepActive"
                            @stepper-finished="alert"
                    >
                    </horizontal-stepper>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import HorizontalStepper from 'vue-stepper';
    import StepOne from './StepOne.vue';
    import StepTwo from './StepTwo.vue';
    import StepThree from './StepThree.vue';

    export default {
        name: 'AhpForm',
        components: {
            HorizontalStepper
        },
        data() {
            return {
                ahpContext: {},
                ahpResults: '',
                demoSteps: [
                    {
                        icon: 'list',
                        name: 'first',
                        title: 'Categorias',
                        subtitle: 'Adicionar e Selecionar',
                        component: StepOne,
                        completed: false

                    },
                    {
                        icon: 'list',
                        name: 'second',
                        title: 'Alternativas',
                        subtitle: 'Adicionar e Selecionar',
                        component: StepTwo,
                        completed: false
                    },
                    {
                        icon: 'report_problem',
                        name: 'third',
                        title: 'Pairwise comparisons',
                        subtitle: 'Preencher',
                        component: StepThree,
                        completed: false
                    }
                ],
                activeStep: 0
            }
        },
        methods: {
            init() {
                const AHP = require('ahp');
                this.ahpContext = new AHP();

                this.ahpContext.addItems(['VendorA', 'VendorB', 'VendorC']);
                this.ahpContext.addCriteria(['price', 'functionality', 'UX']);

                //rank criteria with rank scale
                this.ahpContext.rankCriteriaItem('price', [
                    ['VendorB', 'VendorC', 1 / 2],
                    ['VendorA', 'VendorC', 1 / 2],
                    ['VendorA', 'VendorB', 1]
                ]);

                //rank criteria with rank scale
                this.ahpContext.rankCriteriaItem('functionality', [
                    ['VendorB', 'VendorC', 1],
                    ['VendorA', 'VendorC', 5],
                    ['VendorA', 'VendorB', 5]
                ]);

                //rank criteria with absolute rank scole
                this.ahpContext.setCriteriaItemRankByGivenScores('UX', [10, 10, 1]);

                this.ahpContext.rankCriteria(
                    [
                        ['price', 'functionality', 3],
                        ['price', 'UX', 3],
                        ['functionality', 'UX', 1]
                    ]
                );

                let output = this.ahpContext.run();
                this.ahpResults = JSON.stringify(output, undefined, 4);
                console.log(output);
            },
            completeStep(payload) {
                this.demoSteps.forEach((step) => {
                    if (step.name === payload.name) {
                        step.completed = true
                    }
                })
            },
            isStepActive(payload) {
                console.log('StepActive')
                console.log(payload)
                this.demoSteps.forEach((step) => {
                    if (step.name === payload.name) {
                        if (step.completed === true) {
                            step.completed = false
                        }
                    }
                })
            },
            alert(payload) {
                console.log('end')
                console.log(payload)
            }
        },
        created: function () {
            this.init();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
