export interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string; 
}

export interface Company {
  id: string;
  cnpj: string;
  corporateName: string;
  tradeName: string;
  status: string;
  openingDate: string;
  type: string;
  legalNature: string;
  mainActivity: string;
  address: string; 
}
