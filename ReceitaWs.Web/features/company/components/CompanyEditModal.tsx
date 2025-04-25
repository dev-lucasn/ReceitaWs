import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
  } from '@chakra-ui/react';
  import { Company } from '../companyTypes';
  import { updateCompany } from '../services/companyService';
  import { useEffect, useState } from 'react';
  import { formatCnpj } from '@/utils/formatCnpj';
  
  interface Props {
    isOpen: boolean;
    onClose: () => void;
    company: Company | null;
    onSuccess: () => void;
  }
  
  export const CompanyEditModal = ({ isOpen, onClose, company, onSuccess }: Props) => {
    const toast = useToast();
  
    const [form, setForm] = useState({
      tradeName: '',
      status: '',
      mainActivity: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    });
  
    useEffect(() => {
      if (company) {
        const addressParts = company.address?.split(', ') || [];
        setForm({
          tradeName: company.tradeName || '',
          status: company.status || '',
          mainActivity: company.mainActivity || '',
          street: addressParts[0] || '',
          number: addressParts[1] || '',
          complement: addressParts[2] || '',
          neighborhood: addressParts[3] || '',
          city: addressParts[4] || '',
          state: addressParts[5] || '',
          zipCode: addressParts[6] || '',
        });
      }
    }, [company]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSave = async () => {
      if (!company) return;
  
      try {
        await updateCompany(company.id, form);
        toast({
          title: 'Empresa atualizada com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        onSuccess();
      } catch (error) {
        toast({
          title: 'Erro ao atualizar empresa',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    if (!company) return null;
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Empresa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>CNPJ</FormLabel>
                <Input value={formatCnpj(company.cnpj)} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Nome Fantasia</FormLabel>
                <Input name="tradeName" value={form.tradeName} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Input name="status" value={form.status} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Atividade Principal</FormLabel>
                <Input name="mainActivity" value={form.mainActivity} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Rua</FormLabel>
                <Input name="street" value={form.street} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Número</FormLabel>
                <Input name="number" value={form.number} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Complemento</FormLabel>
                <Input name="complement" value={form.complement} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Bairro</FormLabel>
                <Input name="neighborhood" value={form.neighborhood} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Cidade</FormLabel>
                <Input name="city" value={form.city} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Input name="state" value={form.state} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>CEP</FormLabel>
                <Input name="zipCode" value={form.zipCode} onChange={handleChange} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleSave} mr={3}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };  