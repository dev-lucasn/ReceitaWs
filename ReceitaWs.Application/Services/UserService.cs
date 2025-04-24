using System.Security.Cryptography;
using System.Text;
using System.Linq;
using ReceitaWs.Application.DTOs;
using ReceitaWs.Application.Interfaces;
using ReceitaWs.Core.Entities;
using ReceitaWs.Core.Interfaces;

namespace ReceitaWs.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> AuthenticateAsync(string username, string password)
        {
            var passwordHash = HashPassword(password);
            return await _userRepository.GetByCredentialsAsync(username, passwordHash);
        }

        public async Task<(bool Success, string Message)> RegisterUserAsync(RegisterUserDto dto)
        {
            var existingUser = await _userRepository.GetByUsernameAsync(dto.Username);
            if (existingUser != null)
                return (false, "Usuário já existente");

            var passwordHash = HashPassword(dto.Password);

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Username = dto.Username,
                Email = dto.Email,
                Password = passwordHash,
                Role = "user"
            };

            await _userRepository.AddAsync(newUser);
            return (true, "Usuário registrado com sucesso");
        }

        public async Task<(bool Success, string Message)> UpdateUserAsync(Guid id, UpdateUserDto dto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return (false, "Usuário não encontrado");

            if (!string.IsNullOrWhiteSpace(dto.Username) && dto.Username != user.Username)
            {
                var existing = await _userRepository.GetByUsernameAsync(dto.Username);
                if (existing != null && existing.Id != id)
                    return (false, "Nome de usuário já está em uso");

                user.Username = dto.Username;
            }

            if (!string.IsNullOrWhiteSpace(dto.Email))
                user.Email = dto.Email;

            if (!string.IsNullOrWhiteSpace(dto.Password))
                user.Password = HashPassword(dto.Password);

            if (!string.IsNullOrWhiteSpace(dto.Role))
                user.Role = dto.Role;

            await _userRepository.UpdateAsync(user);
            return (true, "Usuário atualizado com sucesso");
        }

        
        public async Task<(bool Success, string Message, IEnumerable<User>)> DeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                return (false, "Usuário não encontrado.", Enumerable.Empty<User>());

            await _userRepository.DeleteAsync(id);

            return (true, "Usuário excluído com sucesso.", new[] { user });
        }
        public async Task<(bool Success, string Message, IEnumerable<User> Data)> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();

            if (users == null || !users.Any())
                return (false, "Nenhum usuário encontrado", Enumerable.Empty<User>());

            return (true, "Usuários retornados", users);
        }

        private string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}