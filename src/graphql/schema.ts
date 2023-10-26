export const schema = `#graphql
  type Plan {
    name: String
    initPrice: Int
    dateRange: [String]
    finalPrice: Int
  }

  type Movement {
    date: String
    amount: Int
    description: String
    type: String
  }

  input PlanInput {
    name: String!
    initPrice: Int!
    dateRange: [String!]!
  }

  input MovementInput {
    date: String!
    amount: Int!
    description: String!
    type: String!
  }

  type Query {
    getPlans: [Plan]
    getMovementsByPlan(id: String): [Movement]
  }

  type Mutation {
    # Plan
    addPlan(input: PlanInput): Plan
    updatePlan(id: String, input: PlanInput): Plan
    deletePlan(id: String): Plan

    # Movement
    addMovement(id: String, input: MovementInput): Movement
    updateMovement(id: String, input: MovementInput): Movement
    deleteMovement(id: String): Movement
  }
`;