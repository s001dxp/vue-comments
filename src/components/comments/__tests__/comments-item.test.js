import CommentsItem from "@/components/comments/comments-item.vue";
import regExp from "@/components/comments/reg-exp.js";
import dataTest from "@/components/comments/__tests__/comments-item.data.js";
// import { mount } from "@vue/test-utils";

// Comment text
describe("CommentsItem", () => {
  let { methods, data } = CommentsItem;
  let context = {};

  for (let dataTestItem of dataTest.preparationText) {
    describe(`preparationText - ${dataTestItem.name}`, () => {
      beforeEach(() => {
        context = { ...methods, ...data() };
      });

      for (let item of dataTestItem.items) {
        let { text, maxLength, maxLine, result } = item;
        test(`maxLength: "${maxLength}", maxLine: "${maxLine}"`, () => {
          expect(context.preparationText(text, maxLength, regExp)).toEqual(result);
        });
      }
    });
  }
});
