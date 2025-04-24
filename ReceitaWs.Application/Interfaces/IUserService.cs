using ReceitaWs.Application.DTOs;
using ReceitaWs.Core.Entities;

namespace ReceitaWs.Application.Interfaces
{
    public interface IUserService
    {
        Task<User?> AuthenticateAsync(string username, string password);
        Task<(bool Success, string Message)> RegisterUserAsync(RegisterUserDto dto);
        Task<(bool Success, string Message)> UpdateUserAsync(Guid id, UpdateUserDto dto);
        Task<(bool Success, string Message, IEnumerable<User>)>  DeleteUserAsync(Guid id);
        Task<(bool Success, string Message, IEnumerable<User> Data)> GetAllUsersAsync();
    }
}