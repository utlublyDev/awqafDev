using MediatR;
using awqaf.Dto;
using System.Security.Principal;

namespace awqaf.Application.Commands
{
    public class UserJwtAuthorizeCommand : IRequest<IPrincipal>
    {
        public LoginDto LoginDto { get; set; }
    }
}
