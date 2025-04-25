import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import { Company } from '../companyTypes';
import { deleteCompany } from '../services/companyService';
import { useToast } from '@chakra-ui/react';
import { formatCnpj } from '@/utils/formatCnpj';

interface Props {
  data: Company[];
  loading: boolean;
  onRefresh: () => void;
  onEdit: (company: Company) => void;
}

export const CompanyTable = ({ data, loading, onRefresh, onEdit }: Props) => {
  const toast = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteCompany(id);
      toast({
        title: 'Empresa removida com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onRefresh();
    } catch {
      toast({
        title: 'Erro ao remover empresa',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="xl" color="blue.500" />;

  return (
    <Table variant="striped" size="md">
      <Thead>
        <Tr>
          <Th>Razão Social</Th>
          <Th>Nome Fantasia</Th>
          <Th>CNPJ</Th>
          <Th>Status</Th>
          <Th>Data de Abertura</Th>
          <Th>Tipo</Th>
          <Th>Natureza Jurídica</Th>
          <Th>Atividade Principal</Th>
          <Th>Endereço</Th>
          <Th isNumeric>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((company) => (
          <Tr key={company.id}>
            <Td px={3} py={2}>{company.corporateName}</Td>
            <Td px={3} py={2}>{company.tradeName}</Td>
            <Td px={3} py={2}>{formatCnpj(company.cnpj)}</Td>
            <Td px={3} py={2}>{company.status}</Td>
            <Td px={3} py={2}>{company.openingDate}</Td>
            <Td px={3} py={2}>{company.type}</Td>
            <Td px={3} py={2}>{company.legalNature}</Td>
            <Td px={3} py={2}>{company.mainActivity}</Td>
            <Td px={3} py={2}>{company.address}</Td>
            <Td isNumeric px={3} py={2}>
              <HStack justify="end" spacing={2}>
                <Button size="sm" colorScheme="blue" onClick={() => onEdit(company)}>
                  Editar
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(company.id!)}>
                  Remover
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};