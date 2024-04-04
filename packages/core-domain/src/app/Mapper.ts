export interface Mapper<Domain, DTO, Select, Insert> {
  toDTO: (domain: Domain) => DTO;
  toDomain: (raw: Select) => Domain;
  toPersistence: (domain: Domain) => Promise<Insert> | Insert;
}
