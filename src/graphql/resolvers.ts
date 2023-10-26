import { addMovement, deleteMovement, updateMovement } from "../services/movement.js";
import { getPlans, getMovementsByPlan, addPlan, updatePlan, deletePlan } from "../services/plan.js";

export const resolvers = {
  Query: {
    getPlans: () => getPlans(),
    getMovementsByPlan: (_, { id }) => getMovementsByPlan(id)
  },
  Mutation: {
    addPlan: (_, { plan }) => addPlan(plan),
    updatePlan: (_, { id, plan }) => updatePlan(id, plan),
    deletePlan: (_, { id }) => deletePlan(id),
    addMovement: (_, { id, movement }) => addMovement(id, movement),
    updateMovement: (_, { id, movement }) => updateMovement(id, movement),
    deleteMovement: (_, { id }) => deleteMovement(id)
  }
};