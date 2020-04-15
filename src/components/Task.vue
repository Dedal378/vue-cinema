<template lang="pug">
  .content-wrapper
    section
      .container
        .task-list__header
          h1.ui-title-1 Tasks
          .buttons-list
            .button.button--round.button-default(
              @click="filter = 'active'"
            ) Active
            .button.button--round.button-default(
              @click="filter = 'completed'"
            ) Completed
            .button.button--round.button-default(
              @click="filter = 'all'"
            ) All
        .task-list
          transition-group(
            enter-to-class="animated fadeIn"
            leave-to-class="animated fadeOutDown"
          )
            .task-item(
              v-for="task in tasksFilter"
              :key="task.id"
              :class="{ completed: task.completed }"
            )
              .ui-card.ui-card--shadow
                .task-item__info
                  .task-item__main-info
                    span.ui-label.ui-label--light {{ task.whatWatch }}
                    span Total time: {{ task.time }}
                  span.button-close(
                    @click="deleteTask(task.id)"
                  )
                .task-item__content
                  .task-item__header
                    .ui-checkbox-wrapper
                      input.ui-checkbox(
                        type='checkbox'
                        v-model="task.completed"
                      )
                    span.ui-title-3 {{ task.title }}
                  .task-item__body
                    p.ui-text-regular {{ task.description }}
                  .task-item__footer
                    .tag-list
                      .ui-tag__wrapper(
                        v-for="tag in task.tags"
                        :key="tag.title"
                      )
                        .ui-tag
                          span.tag-title {{ tag.title }}
                      .button-list
                        .button.button--round.button-default(
                          @click="taskEdit(task.id, task.title, task.description, task.editing)"
                        ) Edit
                        .button.button--round.button-primary Done

    .ui-messageBox__wrapper(
      v-show="editing"
      :class="{active: editing}"
    )
      .ui-messageBox.fadeInDown
        .ui-messageBox__header
          span.messageBox-title {{ titleEditing }}
          span.button-close(@click="cancelTaskEdit")
        hr
        .ui-messageBox__content
          // p Title
          input(
            type="text"
            v-model='titleEditing'
            placeholder='Title'
          )
          // p Description
          textarea(
            type="text"
            v-model="descrEditing"
            placeholder='Description'
          )
        .ui-messageBox__footer
          .button.button-light(@click="cancelTaskEdit") Cancel
          .button.button-primary(@click="finishTaskEdit") OK
</template>

<script>
export default {
  data () {
    return {
      filter: 'active',
      editing: false,
      titleEditing: '',
      descrEditing: '',
      taskId: null
    }
  },
  methods: {
    taskEdit (id, title, description) {
      this.editing = !this.editing
      this.taskId = id
      this.titleEditing = title
      this.descrEditing = description
    },
    cancelTaskEdit () {
      this.editing = !this.editing

      // reset

      this.taskId = null
      this.titleEditing = ''
      this.descrEditing = ''
    },
    finishTaskEdit () {
      this.$store.dispatch('editTask', {
        id: this.taskId,
        title: this.titleEditing,
        description: this.descrEditing
      })
      this.editing = !this.editing
    },
    deleteTask (id) {
      this.$store.dispatch('deleteTask', id)
        .then(() => {
          this.$store.dispatch('loadTasks')
        })
    }
  },
  computed: {
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active'
    }
  }
}
</script>

<style lang="stylus" scoped>
.task-list__header
  display: flex
  justify-content space-between
  align-items center
  margin-bottom: 30px
  .button
    margin-right: 8px
.ui-title-1
  margin-bottom: 0

//
// TASK ITEM
//
.task-item
  margin-bottom: 20px
  .ui-checkbox:checked:before
    border-color: #909399
  &.completed
    .ui-title-3,
    .ui-text-regular,
    .ui-tag
      text-decoration line-through
      color: #909399
  &:last-child
    margin-bottom: 0

.ui-tag__wrapper
  margin-right: 5px
  margin-bottom: 20px

// info
.total-time
  margin-bottom: 20px

.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom: 20px
  .button-close
    width: 20px
    height: @width
  .ui-label
    margin-right: 8px

// header
.task-item__header
  display flex
  align-items center
  margin-bottom: 18px
  .ui-checkbox-wrapper
    margin-right: 8px
  .ui-title-3
    margin-bottom: 6px

// body
.task-item__body
  margin-bottom: 20px

// footer
.tag-list
  margin-bottom: 20px

.task-item__footer
  .buttons-list
    text-align: right;

// all buttons
.button-list
  display: flex
  justify-content: flex-end
  .button
    margin-right: 12px
    &:last-child
      margin-right: 0

// popup
.ui-messageBox-wrapper
  display: flex
  &.active
    display: flex
  .button-light
    margin-right: 8px

.ui-messageBox__footer
  .button
    margin-right: 10px
    border-radius: 20px
</style>
