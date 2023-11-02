import { GraphQLError } from "graphql";
import PlanSchema from "../models/Plan.js";
import { PlanDataInput } from "../interface/types";
import { Types } from "mongoose";

export const getPlans = async () => {
  try {
    return await PlanSchema.find();
  } catch (error: any) {
    console.log(error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {
          status: 500,
        }
      }
    });
  }
}

export const getMovementsByPlan = async (id: string) => {
  try {
    const plan = await PlanSchema.findById(id).populate('movements');
    return plan?.movements;
  } catch (error: any) {
    console.log(error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {
          status: 500,
        }
      }
    });
  }
}

export const addPlan = async (input: PlanDataInput) => {
  try {
    const newPlan = new PlanSchema({
      name: input.name,
      initPrice: input.initPrice,
      dateRange: [new Date(input.dateRange[0]), new Date(input.dateRange[1])],
    });
    newPlan.finalPrice = newPlan.initPrice;
    return await newPlan.save();
  } catch (error: any) {
    console.log(error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {
          status: 500,
        }
      }
    });
  }
}

export const updatePlan = async (id: string, plan: PlanDataInput) => {
  try {
    const { name, initPrice, dateRange } = plan;
    const planUpdated = await PlanSchema.findByIdAndUpdate(id, {
      name,
      initPrice,
      dateRange
    }, { new: true });
    return planUpdated;
  } catch (error: any) {
    console.log(error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {
          status: 500,
        }
      }
    });
  }
}

export const deletePlan = async (id: string) => {
  try {
    return await PlanSchema.findByIdAndDelete(id);
  } catch (error: any) {
    console.log(error.message);
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {
          status: 500,
        }
      }
    });
  }
}

/* Internal services */
export const addingMovement = async (id: string, movementId: Types.ObjectId) => {
  try {
    await PlanSchema.findByIdAndUpdate(id, { $push: { movements: movementId } });
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}