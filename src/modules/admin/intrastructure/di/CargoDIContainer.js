import { GetCargosUseCase } from "../../application/usecases/GetCargosUseCase";
import { GetCargoByIdUseCase } from "../../application/usecases/GetCargoByIdUseCase";
import { CreateCargoUseCase } from "../../application/usecases/CreateCargoUseCase";
import { UpdateCargoUseCase } from "../../application/usecases/UpdateCargoUseCase";
import { DeleteCargoUseCase } from "../../application/usecases/DeleteCargoUseCase";
import { CargoRepository } from "../repositories/CargoRepository";

/**
 * Contenedor de inyección de dependencias para el módulo de Cargos
 */
export class CargoDIContainer {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new CargoDIContainer();
      this.instance.registerDependencies();
    }
    return this.instance;
  }

  registerDependencies() {
    // Repositorio
    this.cargoRepository = new CargoRepository();

    // Use Cases
    this.getCargosUseCase = new GetCargosUseCase(this.cargoRepository);
    this.getCargoByIdUseCase = new GetCargoByIdUseCase(this.cargoRepository);
    this.createCargoUseCase = new CreateCargoUseCase(this.cargoRepository);
    this.updateCargoUseCase = new UpdateCargoUseCase(this.cargoRepository);
    this.deleteCargoUseCase = new DeleteCargoUseCase(this.cargoRepository);
  }

  // Getters
  getGetCargosUseCase() {
    return this.getCargosUseCase;
  }
  getGetCargoByIdUseCase() {
    return this.getCargoByIdUseCase;
  }
  getCreateCargoUseCase() {
    return this.createCargoUseCase;
  }
  getUpdateCargoUseCase() {
    return this.updateCargoUseCase;
  }
  getDeleteCargoUseCase() {
    return this.deleteCargoUseCase;
  }
}

export default CargoDIContainer;
