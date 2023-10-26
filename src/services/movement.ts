import MovementSchema from "../models/Movement.js";
import { MovementInput } from "../interface/types";
import { addingMovement } from "./plan.js";
import { GraphQLError } from "graphql";

export const addMovement = async (id: string, movement: MovementInput) => {
  try {
    const newMovement = new MovementSchema(movement);
    const movementAdded = await newMovement.save();
    const res = await addingMovement(id, movementAdded._id);
    if (!res) {
      movementAdded.deleteOne();
      throw new Error('Error al agregar movimiento');
    }
    return movementAdded;
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

export const updateMovement = async (id: string, movement: MovementInput) => {
  try {
    const { date, amount, description, type } = movement;
    const movementUpdated = await MovementSchema.findByIdAndUpdate(id, {
      date,
      amount,
      description,
      type
    }, { new: true });
    return movementUpdated;
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

export const deleteMovement = async (id: string) => {
  try {
    return await MovementSchema.findByIdAndDelete(id);
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