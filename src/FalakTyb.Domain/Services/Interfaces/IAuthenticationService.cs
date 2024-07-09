using System.Security.Principal;
using System.Threading.Tasks;

namespace awqaf.Domain.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<IPrincipal> Authenticate(string username, string password);
    }
}
