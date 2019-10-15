<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <div class="field">
            <label class="label">Categorias</label>
            <div class="control">
                <input-tag v-model="form.categorias" placeholder="Escreva uma categoria e pressione enter" />
            </div>
        </div>
<!--        <div>-->
<!--            <p>-->
<!--                Placeholder: Aqui haverá uma lista com checkbox para ativar ou desativar cada Categoria-->
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
                categorias: []
            }
        }
    },
    computed: mapState({
        categories: state => state.form.categories,
    }),
    methods: {
        valid(obj) {
            for (let key in obj) {
                if (!obj.hasOwnProperty(key) || obj[key].length <= 0) {
                    return false
                }
            }
            return true
        }
    },
    watch: {
        form: {
            handler: function (obj) {
                this.$store.commit({ type: 'updateForm', categories: obj.categorias })
                this.$emit('can-continue', {value: this.valid(obj)})
            },
            deep: true
        },
        clickedNext(val) {
            if(val === true) {
                this.$emit('can-continue', {value: this.valid(this.form)})
                this.$emit('another-event', {value: this.form})
            }
        }
    },
    mounted() {
        this.$emit('can-continue', {value: this.valid(this.form)})
    }
}
</script>