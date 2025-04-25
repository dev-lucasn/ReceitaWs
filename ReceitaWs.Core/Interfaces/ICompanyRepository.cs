using ReceitaWs.Core.Entities;

namespace ReceitaWs.Core.Interfaces
{
    public interface ICompanyRepository
    {
        Task AddAsync(Company company);
        Task UpdateAsync(Company company);
        Task DeleteAsync(Company company);
        Task<Company?> GetByIdAsync(Guid id); 
        Task<IEnumerable<Company>> GetAllAsync();
        Task<Company?> GetByCnpjAsync(string cnpj);
    }
}