<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <h1>
            Comparações par a par
        </h1>
        <div>
            <p>
                <template v-for="(criteriaComparisonsObj, criteria) in criteriaCombinations">
                    <h1>{{ criteria }}</h1>
                    <template v-for="(altComparison, key) in criteriaComparisonsObj">
                        <span v-if="altComparison < 0">
                            {{ `${ Math.abs(altComparison) } ` }}
                        </span>
                        <span :class="altComparison < 0 ? 'font-weight-bold' : ''">{{ key.split('-')[0] }}</span>
                        <span>{{ altComparison === 0 ? ' = ' : altComparison < 0 ? ' > ' : ' < ' }}</span>
                        <span :class="altComparison > 0 ? 'font-weight-bold' : ''">{{ key.split('-')[1] }}</span>
                        <span v-if="altComparison > 0">{{ ` ${ Math.abs(altComparison) }` }}</span>
                        <vue-slider
                                ref="slider"
                                v-model="criteriaCombinations[criteria][key]"
                                v-bind="options"
                        />
                    </template>
                </template>
            </p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: ['clickedNext', 'currentStep'],
    components: ['VueSlider'],
    data() {
        return {
            form: {
                categorias: []
            },
            criteriaComparisons: {},
            criteriaCombinations: {},
            value: 1,
            options: {
                dotSize: 14,
                width: 'auto',
                height: 4,
                contained: false,
                direction: 'ltr',
                data: null,
                min: -9,
                max: 9,
                interval: 3,
                disabled: false,
                clickable: true,
                duration: 0.5,
                adsorb: false,
                lazy: false,
                tooltip: 'focus',
                tooltipPlacement: 'top',
                tooltipFormatter: Math.abs,
                useKeyboard: false,
                enableCross: true,
                fixed: false,
                minRange: void 0,
                maxRange: void 0,
                order: true,
                marks: false,
                dotOptions: void 0,
                process: true,
                dotStyle: void 0,
                railStyle: void 0,
                processStyle: void 0,
                tooltipStyle: void 0,
                stepStyle: void 0,
                stepActiveStyle: void 0,
                labelStyle: void 0,
                labelActiveStyle: void 0,
            },
            ahpContext: {},
            ahpResults: '',
        }
    },
    computed: mapState({
        categories: state => state.form.categories,
        alternatives: state => state.form.alternatives,
        // criteriaCombinations: function () {
        //     let criteriaCombinations = {}
        //     let array = this.criteria
        //     // Since you only want pairs, there's no reason
        //     // to iterate over the last element directly
        //     for (let i = 0; i < array.length - 1; i++) {
        //         // This is where you'll capture that last value
        //         for (let j = i + 1; j < array.length; j++) {
        //           if (!criteriaCombinations.hasOwnProperty(`${array[j]}-${array[i]}`)) {
        //             this.$set(criteriaCombinations, `${array[j]}-${array[i]}`, 0)
        //           }
        //         }
        //     }
        //     return criteriaCombinations
        // },
    }),
    methods: {
        generateCombinations: function () {
            this.criteriaCombinations = {}
            let categories = this.categories
            let alternatives = this.alternatives
            if (this.alternatives.length < 2) {
                return
            }
            // Since you only want pairs, there's no reason
            // to iterate over the last element directly
            for (let criteria of categories) {
                this.$set(this.criteriaCombinations, criteria, {})
                for (let i = 0; i < alternatives.length - 1; i++) {
                    // This is where you'll capture that last value
                    for (let j = i + 1; j < alternatives.length; j++) {
                        if (!this.criteriaCombinations[criteria].hasOwnProperty(`${alternatives[j]}-${alternatives[i]}`)) {
                            this.$set(this.criteriaCombinations[criteria], `${alternatives[j]}-${alternatives[i]}`, 0)
                        }
                    }
                }
            }
        },
        calculateAhp () {
            const AHP = require('ahp');
            this.ahpContext = new AHP();

            this.ahpContext.addItems(this.categories);
            this.ahpContext.addCriteria(this.alternatives);

            //rank criteria with rank scale
            for (let criteria in this.criteriaCombinations) {
                let tArr = []
                for (let alternatives in this.criteriaCombinations[criteria]) {
                    let res = 0
                    if (this.criteriaCombinations[criteria][alternatives] > 0) {
                        res = this.criteriaCombinations[criteria][alternatives]
                    } else {
                        res = 1 / Math.abs(this.criteriaCombinations[criteria][alternatives])
                    }
                    tArr.push([
                        alternatives.split('-')[0],
                        alternatives.split('-')[1],
                        res
                    ])
                }
                console.log(`criteria rank ${ criteria }`)
                console.log(tArr)
                this.ahpContext.rankCriteriaItem(criteria, tArr)
            }

            let criteriaRankArr = []
            for (let i = 0; i < this.categories.length - 1; i++) {
                // This is where you'll capture that last value
                for (let j = i + 1; j < this.categories.length; j++) {
                    if (!this.criteriaComparisons.hasOwnProperty(`${this.categories[j]}-${this.categories[i]}`)) {
                        this.$set(this.criteriaComparisons, `${this.categories[j]}-${this.categories[i]}`, 1)
                        criteriaRankArr.push([this.categories[j], this.categories[i], 1])
                    }
                }
            }
            console.log('criteriaRankArr')
            console.log(criteriaRankArr)
            this.ahpContext.rankCriteria(
                    criteriaRankArr
            );

            let output = this.ahpContext.run();
            this.ahpResults = JSON.stringify(output, undefined, 4);
            console.log(output);
        },
    },
    watch: {
        alternatives: {
            handler: function () {
                this.generateCombinations()
            },
            deep: true
        },
        clickedNext(val) {
            let res = this.calculateAhp()
            this.$emit('can-continue', {value: true})
            this.$emit('stepper-finished', {value: true})
            window.alert('OHAE')
            // if(val === true) {
            //     this.$v.form.$touch();
            // }
        }
    },
    created() {
        this.generateCombinations()
        this.$emit('can-continue', { value: true })
    }
}
</script>
