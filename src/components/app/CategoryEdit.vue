<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
              <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submitHanler">
              <div class="input-field" >
                <select ref="select" v-model="current">
                  <option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id"
                  >
                  {{cat.title}}
                  </option>
                </select>
                <label>Выберите категорию</label>
              </div>

             <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model.trim="title"
                    :class="{invalid: $v.title.$dirty && !$v.title.required}"
                >
                <label for="name">Название</label>
                <span
                    v-if="$v.title.$dirty && !$v.title.required"
                    class="helper-text invalid"
                >
                    Введите название категории
                </span>
              </div>

              <div class="input-field">
                <input
                    id="limit"
                    type="number"
                    v-model.number="limit"
                    :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                >
                <label for="limit">Лимит</label>
                <span 
                    v-if="$v.limit.$dirty && !$v.limit.minValue"
                    class="helper-text invalid"
                >
                    Введите минимальная величину не меньше {{$v.limit.$params.minValue.min}}
                </span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
              </button>
            </form>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css'
import { required, minValue} from 'vuelidate/lib/validators'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  data: () =>({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),

  validations: {
        title: {required},
        limit: {minValue: minValue(100)}
  },
  methods: {
    async submitHanler() {
      if (this.$v.$invalid) {
          this.$v.$touch()
          return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        //this.$massage('Категория была обновлена')
          console.log("Категория была обновлена")
          this.$emit('update', categoryData)
               
      } catch(e) {
        console.log("ERR => ", e)
        }

    }
  },

  watch: {
    current(catId) {
      console.log("catId", catId)
      const {title, limit} = this.categories.find(cat=> cat.id === catId)
      this.title = title
      this.limit = limit
    }
  },

  created(){
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },

  destroyed() {
    if(this.select &&  this.select.destroy) {
        this.select.destroy()
    }
  }
}
</script>