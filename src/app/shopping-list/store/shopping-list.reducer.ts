import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}
const initialState: State = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        // @ts-ignore
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      console.log(action.payload);
      // @ts-ignore
      const ingredient = state.ingredients[action.payload.index];
      //   @ts-ignore
      const updateIngredient = { ...ingredient, ...action.payload.ingredient };
      const updateIngredients = [...state.ingredients];
      //   @ts-ignore
      updateIngredients[action.payload.index] = updateIngredient;
      return {
        ...state,
        ingredients: updateIngredients,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          //   @ts-ignore
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}
