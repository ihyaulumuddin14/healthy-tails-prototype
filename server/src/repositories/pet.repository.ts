import { PetCreationData } from "../domain/dto/pet.dto.js";
import PetModel, { PetItf } from "../domain/entity/pet.entity.js";

export const findAllPetsByOwner = async (userId: string): Promise<PetItf[]> => {
  return PetModel.find({ owner: userId }).exec();
};

export const findPetByIdAndOwner = async (userId: string, petId: string): Promise<PetItf | null> => {
  return PetModel.findOne({ _id: petId, owner: userId }).exec();
};

export const createPet = async (data: PetCreationData): Promise<PetItf> => {
  const pet = new PetModel(data);
  return pet.save();
};

export const updatePetById = async (id: string, updateData: Partial<PetItf>): Promise<PetItf | null> => {
  return PetModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};

export const deletePetById = async (id: string): Promise<PetItf | null> => {
  return PetModel.findByIdAndDelete(id).exec();
};
