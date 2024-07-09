using awqaf.Domain;
using MediatR;
using awqaf.Dto;

namespace awqaf.Application.Commands
{
    public class AccountCreateCommand : IRequest<User>
    {
        public ManagedUserDto ManagedUserDto { get; set; }
    }
}
