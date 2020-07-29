import Vue from 'vue'
import Card from './utilities/common/Card'
import Child from './utilities/common/Child'
import Checkbox from './utilities/common/Checkbox'

import FormErrors from './form/errors'

[
  Card,
  Child,
  Checkbox,
  FormErrors,
].forEach(Component => {
  Vue.component(Component.name, Component)
})
