<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>你說我猜</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-carousel
                  height="400"
                  hide-delimiters
                  hide-delimiter-background
                  :show-arrows="false"
                  v-model="currentQuestion"
                >
                  <v-carousel-item v-for="(question, i) in questions" :key="i">
                    <v-sheet :color="questionColors[i]" height="100%">
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <div class="display-3 shadow">{{ question }}</div>
                      </v-row>
                    </v-sheet>
                  </v-carousel-item>
                </v-carousel>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="currentQuestion--" color="primary">
                  <v-icon right dark>mdi-arrow-left-bold-box</v-icon>
                  上一題
                </v-btn>
                <v-spacer />
                <v-btn @click="currentQuestion++" color="primary">
                  下一題
                  <v-icon right dark>mdi-arrow-right-bold-box</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      colors: [
        "red",
        "pink",
        "purple",
        "deep-purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "teal",
        "light-green",
        "green",
        "lime",
        "yellow",
        "amber",
        "orange",
        "deep-orange",
        "brown",
        "blue-grey",
        "grey"
      ],
      questionColors: [],
      questions: [],
      currentQuestion: 0
    };
  },
  async mounted() {
    const allQuestions = await axios("http://localhost:3000/questions");
    this.questions = this.shuffle(allQuestions.data.questions);
    this.questions.forEach(q => {
      this.questionColors.push(this.randColor());
    });
  },
  methods: {
    randColor() {
      return (
        this.colors[Math.floor(Math.random() * this.colors.length)] +
        " lighten-3"
      );
    },
    shuffle(arr) {
      var i, j, temp;
      for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }
  }
};
</script>
<style scoped>
.shadow {
  text-shadow: 2px 2px #212121;
}
</style>
