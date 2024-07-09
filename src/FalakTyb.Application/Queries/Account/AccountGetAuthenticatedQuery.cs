using awqaf.Domain;
using MediatR;
using awqaf.Dto;
using System.Security.Claims;

namespace awqaf.Application.Commands
{
    public class AccountGetAuthenticatedQuery : IRequest<string>
    {
        public ClaimsPrincipal User { get; set; }
    }
}
