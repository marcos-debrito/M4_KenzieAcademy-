import { Repository } from "typeorm";
import { Address } from "../entities";

type AddressRepo = Repository<Address>;

export { AddressRepo };
