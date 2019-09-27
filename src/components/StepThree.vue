<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <div class="field">
            <label class="label">Categorias</label>
            <div class="control">
                <input-tag v-model="form.categorias" placeholder="Escreva uma categoria e pressione enter"></input-tag>
            </div>
        </div>
        <div>
            <p>
                <template v-for="combination in criteriaCombinations.items">
                    <span>{{ combination[0] }}</span>
                    <span>{{ combination[1] }}</span>
                    <vue-slider
                            ref="slider"
                            v-model="combination.value"
                            v-bind="options"
                    ></vue-slider>
                </template>

                Placeholder: Aqui haverá uma lista com checkbox para ativar ou desativar cada Alternativa
            </p>
        </div>
    </div>
</template>

<script>

export default {
    props: ['clickedNext', 'currentStep'],
    components: ['VueSlider'],
    data() {
        return {
            form: {
                categorias: []
            },
            criteria: ['price', 'functionality', 'UX'],
            items: ['VendorA', 'VendorB', 'VendorC'],
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
            }
        }
    },
    methods : {
        generateCombinations () {
            let array = this.criteria
            // Since you only want pairs, there's no reason
            // to iterate over the last element directly
            for (let i = 0; i < array.length - 1; i++) {
                // This is where you'll capture that last value
                for (let j = i + 1; j < array.length; j++) {
                  if (!this.criteriaCombinations.hasOwnProperty('items')) {
                    this.criteriaCombinations['items'] = []
                  }
                  this.criteriaCombinations['items'].push({ 0: array[j], 1: array[i], value: null })
                }
            }
        }
    },
    watch: {
        form: {
            handler: function (obj) {
                console.log('obj')
                console.log(obj)
                for (let key in obj) {
                    if (!obj.hasOwnProperty(key) || obj[key].length <= 0) {
                        this.$emit('can-continue', {value: false})
                        return
                    }
                }
                this.$emit('can-continue', {value: true})
            },
            deep: true
        },
        clickedNext(val) {
            if(val === true) {
                this.$v.form.$touch();
            }
        }
    },
    created() {
      this.generateCombinations()
    }
}
</script>
