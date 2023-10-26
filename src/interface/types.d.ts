export interface PlanDataInput {
  name: String!;
  initPrice: Number!;
  dateRange: [Date!]!;
}

export interface MovementInput {
  _id: String?;
  date: Date!;
  amount: Number!;
  description: String!;
  type: String!;
}