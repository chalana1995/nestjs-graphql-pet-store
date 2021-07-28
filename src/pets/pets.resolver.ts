import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from 'src/dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver((of) => Pet)
export class PetsResolver {

    constructor(private petService: PetsService) { }

    @Query(returns => [Pet])
    pets(): Promise<Pet[]> {
        return this.petService.findAll();
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petService.createPet(createPetInput);
    }

    @ResolveField(returns => Pet)
    owner(@Parent() pet: Pet): Promise<Owner> {
        return this.petService.getOwner(pet.ownerId)
    }

    @Query(returns => Owner)
    findOnePet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
        return this.petService.findOnePet(id)
    }

}
