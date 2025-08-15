import { PetCreationData, UpdatePetRequest } from "../domain/dto/pet.dto.js";
import PetModel, { PetItf } from "../domain/entity/pet.entity.js";

export const findAllPetsByOwner = async (userId: string): Promise<PetItf[]> => {
  return PetModel.find({ owner: userId }).populate("owner").exec();
};

export const findPetByIdAndOwner = async (userId: string, petId: string): Promise<PetItf | null> => {
  return PetModel.findOne({ _id: petId, owner: userId }).populate("owner").exec();
};

export const findPetById = async (petId: string): Promise<PetItf | null> => {
  return PetModel.findById(petId).populate("owner").exec();
};

export const createPet = async (data: PetCreationData): Promise<PetItf> => {
  const pet = new PetModel(data);
  await pet.save();
  return pet.populate("owner");
};

export const updatePetById = async (id: string, updateData: UpdatePetRequest): Promise<PetItf | null> => {
  return PetModel.findByIdAndUpdate(id, updateData, {
    new: true,
  })
    .populate("owner")
    .exec();
};

export const deletePetById = async (id: string): Promise<PetItf | null> => {
  return PetModel.findByIdAndDelete(id).populate("owner").exec();
};
