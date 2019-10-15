<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <div class="field">
            <label class="label">Alternativas</label>
            <div class="control">
                <input-tag v-model="form.alternativas" placeholder="Escreva uma alternativa e pressione enter" />
            </div>
        </div>
<!--        <div>-->
<!--            <p>-->
<!--                Placeholder: Aqui haverá uma lista com checkbox para ativar ou desativar cada Alternativa-->
<!--            </p>-->
<!--        </div>-->
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: ['clickedNext', 'currentStep'],
    data() {
        return {
            form: {
                alternativas: []
            }
        }
    },
    computed: mapState({
        alternatives: state => state.form.alternatives
    }),
    watch: {
        form: {
            handler: function (obj) {
                this.$store.commit({ type: 'updateForm', alternatives: obj.alternativas })
                this.$emit('can-continue', {value: this.valid(obj)})
            },
            deep: true
        },
        clickedNext(val) {
            if(val === true) {
                this.$v.form.$touch();
            }
        }
    },
    methods: {
        valid(obj) {
            for (let key in obj) {
                if (!obj.hasOwnProperty(key) || obj[key].length <= 0) {
                    return false
                }
            }
            return true
        }
    }
}
</script>