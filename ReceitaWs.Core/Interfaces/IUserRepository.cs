using ReceitaWs.Core.Entities;

namespace ReceitaWs.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByCredentialsAsync(string username, string passwordHash);
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByIdAsync(Guid id);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<User>> GetAllAsync();
    }
}
