import { addMovement, deleteMovement, updateMovement } from "../services/movement.js";
import { getPlans, getMovementsByPlan, addPlan, updatePlan, deletePlan } from "../services/plan.js";

export const resolvers = {
  Query: {
    getPlans: () => getPlans(),
    getMovementsByPlan: (_, { id }) => getMovementsByPlan(id)
  },
  Mutation: {
    addPlan: (_, { input }) => addPlan(input),
    updatePlan: (_, { id, input }) => updatePlan(id, input),
    deletePlan: (_, { id }) => deletePlan(id),
    addMovement: (_, { id, input }) => addMovement(id, input),
    updateMovement: (_, { id, input }) => updateMovement(id, input),
    deleteMovement: (_, { id }) => deleteMovement(id)
  }
};