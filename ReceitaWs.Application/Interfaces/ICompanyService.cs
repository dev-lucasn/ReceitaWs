using ReceitaWs.Application.DTOs;
using ReceitaWs.Core.Entities;

namespace ReceitaWs.Application.Interfaces
{
    public interface ICompanyService
    {
        Task<(bool Success, string Message)> RegisterCompanyAsync(string userId, string cnpj);
        Task<(bool Success, string Message, IEnumerable<CompanyDto> Data)> GetAllCompanyAsync();
        Task<(bool Success, string Message)> UpdateCompanyAsync(Guid id, string userId, UpdateCompanyDto dto);
        Task<(bool Success, string Message)> DeleteCompanyAsync(Guid id, string userId);
    }
}
