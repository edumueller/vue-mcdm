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
                Placeholder: Aqui haverá uma lista com checkbox para ativar ou desativar cada Categoria
            </p>
        </div>
    </div>
</template>

<script>

export default {
    props: ['clickedNext', 'currentStep'],
    data() {
        return {
            form: {
                categorias: []
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
    }
}
</script>